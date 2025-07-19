/**
 * Core interfaces for the Zendesk IaC Manager
 */

import { Profile, ProfileValidationResult } from '@/models/profile';
import { ZendeskConfiguration, ConfigurationValidationResult } from '@/models/configuration';
import { ZendeskPlan, RateLimitInfo } from '@/models/zendesk';

/**
 * Base Error Interface
 */
export interface ZendeskIacError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

/**
 * Logger Interface
 */
export interface Logger {
  info(message: string, meta?: any): void;
  warn(message: string, meta?: any): void;
  error(message: string, error?: Error, meta?: any): void;
  debug(message: string, meta?: any): void;
}

/**
 * CLI Command Interface
 */
export interface CLICommand {
  name: string;
  description: string;
  execute(args: CommandArgs): Promise<CommandResult>;
  validate(args: CommandArgs): ValidationResult;
}

export interface CommandArgs {
  profile?: string;
  output?: string;
  config?: string;
  [key: string]: any;
}

export interface CommandResult {
  success: boolean;
  message: string;
  data?: any;
  errors?: string[];
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Configuration Manager Interface
 */
export interface ConfigurationManager {
  loadConfiguration(filePath: string): Promise<ZendeskConfiguration>;
  validateConfiguration(config: ZendeskConfiguration): ConfigurationValidationResult;
  saveConfiguration(config: ZendeskConfiguration, filePath: string): Promise<void>;
  mergeConfigurations(base: ZendeskConfiguration, override: ZendeskConfiguration): ZendeskConfiguration;
}

/**
 * Authentication Manager Interface
 */
export interface AuthenticationManager {
  loadProfile(profileName: string): Promise<Profile>;
  validateCredentials(profile: Profile): Promise<ProfileValidationResult>;
  listProfiles(): Promise<string[]>;
  saveProfile(profile: Profile): Promise<void>;
  deleteProfile(profileName: string): Promise<void>;
}

/**
 * Zendesk API Client Interface
 */
export interface ZendeskApiClient {
  authenticate(profile: Profile): Promise<boolean>;
  get<T>(endpoint: string): Promise<T>;
  post<T>(endpoint: string, data: any): Promise<T>;
  put<T>(endpoint: string, data: any): Promise<T>;
  delete(endpoint: string): Promise<void>;
  getRateLimitInfo(): RateLimitInfo | null;
  detectPlan(): Promise<ZendeskPlan>;
}

/**
 * Rate Limiter Interface
 */
export interface RateLimiter {
  checkLimit(endpoint: string): Promise<boolean>;
  waitForReset(endpoint: string): Promise<void>;
  adjustRetryInterval(planType: ZendeskPlan): void;
  getRemainingRequests(endpoint: string): number;
}

/**
 * Plan Engine Interface
 */
export interface PlanEngine {
  generatePlan(currentConfig: ZendeskConfiguration, desiredConfig: ZendeskConfiguration): Promise<ExecutionPlan>;
  validatePlan(plan: ExecutionPlan): Promise<PlanValidationResult>;
  displayPlan(plan: ExecutionPlan): string;
}

export interface ExecutionPlan {
  additions: PlanItem[];
  modifications: PlanItem[];
  deletions: PlanItem[];
  summary: PlanSummary;
}

export interface PlanItem {
  type: string;
  name: string;
  action: 'add' | 'modify' | 'delete';
  current?: any;
  desired?: any;
  changes?: Record<string, { from: any; to: any }>;
}

export interface PlanSummary {
  totalChanges: number;
  additions: number;
  modifications: number;
  deletions: number;
  hasDestructiveChanges: boolean;
}

export interface PlanValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Apply Engine Interface
 */
export interface ApplyEngine {
  applyPlan(plan: ExecutionPlan, profile: Profile): Promise<ApplyResult>;
  confirmDestructiveChanges(plan: ExecutionPlan): Promise<boolean>;
  rollback(applyResult: ApplyResult): Promise<void>;
}

export interface ApplyResult {
  success: boolean;
  appliedChanges: AppliedChange[];
  failedChanges: FailedChange[];
  rollbackInfo?: RollbackInfo;
}

export interface AppliedChange {
  type: string;
  name: string;
  action: 'add' | 'modify' | 'delete';
  id?: string | number;
}

export interface FailedChange {
  type: string;
  name: string;
  action: 'add' | 'modify' | 'delete';
  error: string;
}

export interface RollbackInfo {
  changes: AppliedChange[];
  timestamp: Date;
}

/**
 * Export Engine Interface
 */
export interface ExportEngine {
  exportConfiguration(profile: Profile, outputPath: string): Promise<ExportResult>;
  exportSpecificTypes(profile: Profile, types: string[], outputPath: string): Promise<ExportResult>;
}

export interface ExportResult {
  success: boolean;
  exportedFiles: string[];
  errors: string[];
  summary: ExportSummary;
}

export interface ExportSummary {
  totalItems: number;
  itemsByType: Record<string, number>;
  exportPath: string;
}