import { Args, Command } from '@oclif/core';
import chalk from 'chalk';
import { execSync } from 'child_process';
import { runner } from 'hygen';
import * as Logger from 'hygen/dist/logger';
import { basename, join } from 'path';

export default class Create extends Command {
  static override description = 'Create puschel app';

  static override examples = [`$ puschel create puschel-app`];

  static override args = {
    path: Args.string({
      description: 'Path to app',
      required: true,
    }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Create);
    await this.create(args, flags);
  }

  private async create(args: any, flags: any) {
    await runner(['create', 'app', basename(args.path)], {
      templates: join(__dirname, '..', '..', '..', 'templates'),

      createPrompter: () => require('inquirer'),
      cwd: args.path,
      localsDefaults: { ...args, ...flags },
      logger: new Logger.default(this.log.bind(this)),
      exec: (action, body) => {
        const opts = body && body.length > 0 ? { input: body } : {};
        return require('execa').shell(action, opts);
      },
    });

    execSync('npm install', { cwd: args.path, stdio: 'inherit' });

    this.log(`${chalk.magentaBright.bold(args.path)} created successfully`);
  }
}
