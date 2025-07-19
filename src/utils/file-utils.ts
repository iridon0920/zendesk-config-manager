/**
 * File system utility functions
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { ZendeskIacError } from '@/core/interfaces';

export class FileUtils {
  /**
   * ファイルが存在するかチェック
   */
  static async exists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * ディレクトリを再帰的に作成
   */
  static async ensureDirectory(dirPath: string): Promise<void> {
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
      throw this.createFileError('MKDIR_FAILED', `ディレクトリの作成に失敗しました: ${dirPath}`, error);
    }
  }

  /**
   * ファイルを安全に読み込み
   */
  static async readFile(filePath: string): Promise<string> {
    try {
      return await fs.readFile(filePath, 'utf-8');
    } catch (error) {
      throw this.createFileError('READ_FAILED', `ファイルの読み込みに失敗しました: ${filePath}`, error);
    }
  }

  /**
   * ファイルを安全に書き込み
   */
  static async writeFile(filePath: string, content: string): Promise<void> {
    try {
      const dir = path.dirname(filePath);
      await this.ensureDirectory(dir);
      await fs.writeFile(filePath, content, 'utf-8');
    } catch (error) {
      throw this.createFileError('WRITE_FAILED', `ファイルの書き込みに失敗しました: ${filePath}`, error);
    }
  }

  /**
   * ホームディレクトリのパスを取得
   */
  static getHomeDirectory(): string {
    return process.env.HOME || process.env.USERPROFILE || '';
  }

  /**
   * 設定ディレクトリのパスを取得
   */
  static getConfigDirectory(): string {
    return path.join(this.getHomeDirectory(), '.zendesk-iac');
  }

  private static createFileError(code: string, message: string, originalError: any): ZendeskIacError {
    return {
      code,
      message,
      details: originalError,
      timestamp: new Date()
    };
  }
}