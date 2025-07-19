/**
 * Simple console logger implementation
 */

import chalk from 'chalk';
import { Logger } from '@/core/interfaces';

export class ConsoleLogger implements Logger {
  private logLevel: 'debug' | 'info' | 'warn' | 'error';

  constructor(logLevel: 'debug' | 'info' | 'warn' | 'error' = 'info') {
    this.logLevel = logLevel;
  }

  info(message: string, meta?: any): void {
    if (this.shouldLog('info')) {
      console.log(chalk.blue('[INFO]'), message);
      if (meta) {
        console.log(chalk.gray(JSON.stringify(meta, null, 2)));
      }
    }
  }

  warn(message: string, meta?: any): void {
    if (this.shouldLog('warn')) {
      console.warn(chalk.yellow('[WARN]'), message);
      if (meta) {
        console.warn(chalk.gray(JSON.stringify(meta, null, 2)));
      }
    }
  }

  error(message: string, error?: Error, meta?: any): void {
    if (this.shouldLog('error')) {
      console.error(chalk.red('[ERROR]'), message);
      if (error) {
        console.error(chalk.red(error.stack || error.message));
      }
      if (meta) {
        console.error(chalk.gray(JSON.stringify(meta, null, 2)));
      }
    }
  }

  debug(message: string, meta?: any): void {
    if (this.shouldLog('debug')) {
      console.log(chalk.gray('[DEBUG]'), message);
      if (meta) {
        console.log(chalk.gray(JSON.stringify(meta, null, 2)));
      }
    }
  }

  private shouldLog(level: 'debug' | 'info' | 'warn' | 'error'): boolean {
    const levels = ['debug', 'info', 'warn', 'error'];
    const currentLevelIndex = levels.indexOf(this.logLevel);
    const messageLevelIndex = levels.indexOf(level);
    
    return messageLevelIndex >= currentLevelIndex;
  }
}