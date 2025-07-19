/**
 * プロファイル管理機能の実装
 */

import { AuthenticationManager } from '@/core/interfaces';
import { Profile, ProfileValidationResult } from '@/models/profile';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';

export class DefaultAuthenticationManager implements AuthenticationManager {
  private readonly configPath: string;

  constructor() {
    this.configPath = path.join(os.homedir(), '.zendesk-iac', 'config');
  }

  async loadProfile(profileName: string): Promise<Profile> {
    // TODO: プロファイル読み込みロジックの実装
    throw new Error('Not implemented');
  }

  async validateCredentials(profile: Profile): Promise<ProfileValidationResult> {
    const errors: string[] = [];

    if (!profile.subdomain) {
      errors.push('サブドメインが必要です');
    }

    if (!profile.email) {
      errors.push('メールアドレスが必要です');
    }

    if (!profile.api_token) {
      errors.push('APIトークンが必要です');
    }

    // TODO: 実際のAPI認証テストを実装

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  async listProfiles(): Promise<string[]> {
    // TODO: プロファイル一覧取得の実装
    return [];
  }

  async saveProfile(profile: Profile): Promise<void> {
    // TODO: プロファイル保存の実装
    throw new Error('Not implemented');
  }

  async deleteProfile(profileName: string): Promise<void> {
    // TODO: プロファイル削除の実装
    throw new Error('Not implemented');
  }
}