/**
 * Error handling utility functions
 */

import { ZendeskIacError } from '@/core/interfaces';

export class ErrorUtils {
  /**
   * 標準的なZendeskIacErrorを作成
   */
  static createError(code: string, message: string, details?: any): ZendeskIacError {
    return {
      code,
      message,
      details,
      timestamp: new Date()
    };
  }

  /**
   * APIエラーを作成
   */
  static createApiError(message: string, statusCode?: number, response?: any): ZendeskIacError {
    return this.createError('API_ERROR', message, {
      statusCode,
      response
    });
  }

  /**
   * 設定エラーを作成
   */
  static createConfigError(message: string, filePath?: string): ZendeskIacError {
    return this.createError('CONFIG_ERROR', message, { filePath });
  }

  /**
   * 認証エラーを作成
   */
  static createAuthError(message: string, profile?: string): ZendeskIacError {
    return this.createError('AUTH_ERROR', message, { profile });
  }

  /**
   * 検証エラーを作成
   */
  static createValidationError(message: string, errors: string[]): ZendeskIacError {
    return this.createError('VALIDATION_ERROR', message, { errors });
  }

  /**
   * エラーメッセージをユーザーフレンドリーな形式に変換
   */
  static formatErrorMessage(error: ZendeskIacError): string {
    let message = `[${error.code}] ${error.message}`;
    
    if (error.details) {
      if (error.details.errors && Array.isArray(error.details.errors)) {
        message += '\n詳細:\n' + error.details.errors.map((err: string) => `  - ${err}`).join('\n');
      } else if (error.details.statusCode) {
        message += ` (HTTP ${error.details.statusCode})`;
      }
    }
    
    return message;
  }

  /**
   * エラーがリトライ可能かどうかを判定
   */
  static isRetryableError(error: ZendeskIacError): boolean {
    if (error.code === 'API_ERROR' && error.details?.statusCode) {
      const statusCode = error.details.statusCode;
      // 5xx系エラーまたは429 (Rate Limit)はリトライ可能
      return statusCode >= 500 || statusCode === 429;
    }
    
    return false;
  }
}