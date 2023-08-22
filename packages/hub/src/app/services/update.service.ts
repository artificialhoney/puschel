import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Logger } from '@oclif/core/lib/errors';
import { execSync, spawnSync } from 'child_process';

@Injectable()
export class UpdateService {
  private logger = new Logger(UpdateService.name);

  @Cron(CronExpression.EVERY_DAY_AT_4AM, {
    disabled: process.env.NODE_ENV !== 'production',
  })
  async checkAndUpdate() {
    this.logger.log('Checking for update');
    try {
      const version = JSON.parse(
        execSync('xx update --check --json', {
          stdio: 'inherit',
        }).toString()
      );
      this.logger.log(
        `Installed: v${version.current}, Latest: v${version.latest}`
      );

      if (version.current === version.latest) {
        this.logger.log('App already up to date, skipping');
        return;
      }

      this.logger.log(`Updating app to: v${version.latest}`);
      const spawn = spawnSync('xx update', { shell: true });

      if (spawn.stderr) {
        throw new Error(spawn.stderr.toString());
      }
    } catch (e) {
      this.logger.log('Error while updating app');
      this.logger.log(e);
    }
  }
}
