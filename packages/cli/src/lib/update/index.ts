import { Args, Command, Flags } from '@oclif/core';
import chalk from 'chalk';
import { execSync, spawnSync } from 'child_process';
import path from 'path';

export default class Update extends Command {
  static override description = 'Update puschel app';

  static override examples = [`$ puschel update puschel-app`];

  static override args = {
    path: Args.string({
      description: 'Path to app',
      required: true,
      default: '.',
    }),
  };

  static override flags = {
    check: Flags.boolean({
      description: 'Check for updates',
      default: false,
    }),
    json: Flags.boolean({
      description: 'JSON output',
      default: false,
    }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Update);
    await this.update(args, flags);
  }

  private async update(args: any, flags: any) {
    if (flags.check) {
      const out = JSON.parse(
        spawnSync('npm outdated @puschel/hub --json', {
          cwd: args.path,
          shell: true,
        }).stdout.toString()
      );
      if (flags.json) {
        const json = {
          current: out['@puschel/hub']?.current,
          latest: out['@puschel/hub']?.latest,
        };

        if (!json.latest) {
          const pkg = require(path.join(
            path.resolve(args.path),
            'node_modules',
            '@puschel',
            'hub',
            'package.json'
          ));
          json.current = json.latest = pkg.version;
        }
        this.log(JSON.stringify(json, undefined, 2));
        return;
      }
      if (out['@puschel/hub']?.latest) {
        this.log(
          `New version available: ${chalk.greenBright.bold(
            out['@puschel/hub'].latest
          )}`
        );
        this.log(
          `Run ${chalk.magentaBright.bold(
            'puschel update ' + args.path
          )} to update`
        );
      } else {
        this.log(`App already up to date`);
      }
    } else {
      execSync('npm update', { cwd: args.path, stdio: 'inherit' });
      execSync('pm2 restart puschel', { cwd: args.path, stdio: 'inherit' });

      this.log(`${chalk.magentaBright.bold(args.path)} updated successfully`);
    }
  }
}
