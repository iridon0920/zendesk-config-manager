#!/usr/bin/env node

/**
 * CLI Entry point for Zendesk IaC Manager
 */

import { Command } from 'commander';
import { PlanCommand } from './commands/plan';
import { ApplyCommand } from './commands/apply';
import { ExportCommand } from './commands/export';
import { ValidateCommand } from './commands/validate';

const program = new Command();

program
  .name('zendesk-iac')
  .description('Infrastructure as Code manager for Zendesk configurations')
  .version('1.0.0');

// Register commands
const planCommand = new PlanCommand();
const applyCommand = new ApplyCommand();
const exportCommand = new ExportCommand();
const validateCommand = new ValidateCommand();

program
  .command('plan')
  .description('Show what changes would be applied')
  .option('-p, --profile <profile>', 'Zendesk profile to use')
  .option('-c, --config <config>', 'Configuration file path', 'zendesk-config.yml')
  .action(async (options) => {
    try {
      const result = await planCommand.execute(options);
      if (!result.success) {
        console.error(result.message);
        process.exit(1);
      }
      console.log(result.message);
    } catch (error) {
      console.error('Error executing plan command:', error);
      process.exit(1);
    }
  });

program
  .command('apply')
  .description('Apply configuration changes to Zendesk')
  .option('-p, --profile <profile>', 'Zendesk profile to use')
  .option('-c, --config <config>', 'Configuration file path', 'zendesk-config.yml')
  .action(async (options) => {
    try {
      const result = await applyCommand.execute(options);
      if (!result.success) {
        console.error(result.message);
        process.exit(1);
      }
      console.log(result.message);
    } catch (error) {
      console.error('Error executing apply command:', error);
      process.exit(1);
    }
  });

program
  .command('export')
  .description('Export current Zendesk configuration to YAML files')
  .option('-p, --profile <profile>', 'Zendesk profile to use')
  .option('-o, --output <output>', 'Output directory', './zendesk-config')
  .action(async (options) => {
    try {
      const result = await exportCommand.execute(options);
      if (!result.success) {
        console.error(result.message);
        process.exit(1);
      }
      console.log(result.message);
    } catch (error) {
      console.error('Error executing export command:', error);
      process.exit(1);
    }
  });

program
  .command('validate')
  .description('Validate configuration files')
  .option('-c, --config <config>', 'Configuration file path', 'zendesk-config.yml')
  .action(async (options) => {
    try {
      const result = await validateCommand.execute(options);
      if (!result.success) {
        console.error(result.message);
        process.exit(1);
      }
      console.log(result.message);
    } catch (error) {
      console.error('Error executing validate command:', error);
      process.exit(1);
    }
  });

program.parse();