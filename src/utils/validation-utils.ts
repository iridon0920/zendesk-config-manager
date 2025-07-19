/**
 * Validation utility functions
 */

import { ValidationResult } from '@/core/interfaces';

export class ValidationUtils {
  /**
   * 必須フィールドの検証
   */
  static validateRequired(value: any, fieldName: string): string[] {
    const errors: string[] = [];
    
    if (value === undefined || value === null || value === '') {
      errors.push(`${fieldName}は必須です`);
    }
    
    return errors;
  }

  /**
   * URLの検証
   */
  static validateUrl(url: string, fieldName: string): string[] {
    const errors: string[] = [];
    
    if (!url) {
      errors.push(`${fieldName}は必須です`);
      return errors;
    }
    
    try {
      new URL(url);
    } catch {
      errors.push(`${fieldName}は有効なURLである必要があります`);
    }
    
    return errors;
  }

  /**
   * Zendeskサブドメインの検証
   */
  static validateZendeskSubdomain(subdomain: string): string[] {
    const errors: string[] = [];
    
    if (!subdomain) {
      errors.push('サブドメインは必須です');
      return errors;
    }
    
    // 英数字とハイフンのみ許可
    const subdomainRegex = /^[a-zA-Z0-9-]+$/;
    if (!subdomainRegex.test(subdomain)) {
      errors.push('サブドメインは英数字とハイフンのみ使用できます');
    }
    
    // 長さの制限
    if (subdomain.length < 2 || subdomain.length > 63) {
      errors.push('サブドメインは2文字以上63文字以下である必要があります');
    }
    
    return errors;
  }

  /**
   * 複数の検証結果をマージ
   */
  static mergeValidationResults(...results: ValidationResult[]): ValidationResult {
    const allErrors = results.flatMap(result => result.errors);
    
    return {
      isValid: allErrors.length === 0,
      errors: allErrors
    };
  }

  /**
   * エラー配列から検証結果を作成
   */
  static createValidationResult(errors: string[]): ValidationResult {
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}