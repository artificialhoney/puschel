import { Args, Command, Flags } from '@oclif/core';
import chalk from 'chalk';
import { execSync, spawnSync } from 'child_process';
import path from 'path';

export default class Update extends Command {
  static override description = 'Update XX app';

  static override examples = [`$ xx update xx-app`];

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
        spawnSync('npm outdated @xx/hub --json', {
          cwd: args.path,
          shell: true,
        }).stdout.toString()
      );
      if (flags.json) {
        const json = {
          current: out['@xx/hub']?.current,
          latest: out['@xx/hub']?.latest,
        };

        if (!json.latest) {
          const pkg = require(path.join(
            path.resolve(args.path),
            'node_modules',
            '@xx',
            'hub',
            'package.json'
          ));
          json.current = json.latest = pkg.version;
        }
        this.log(JSON.stringify(json, undefined, 2));
        return;
      }
      if (out['@xx/hub']?.latest) {
        this.log(
          `New version available: ${chalk.greenBright.bold(
            out['@xx/hub'].latest
          )}`
        );
        this.log(
          `Run ${chalk.magentaBright.bold('xx update ' + args.path)} to update`
        );
      } else {
        this.log(`App already up to date`);
      }
    } else {
      execSync('npm update', { cwd: args.path, stdio: 'inherit' });
      execSync('pm2 restart xx', { cwd: args.path, stdio: 'inherit' });

      this.log(`${chalk.magentaBright.bold(args.path)} updated successfully`);
    }
  }
}
