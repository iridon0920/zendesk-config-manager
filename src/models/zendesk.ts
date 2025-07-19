/**
 * Zendesk API response models and types
 */

export interface ZendeskApiResponse<T> {
  data?: T;
  count?: number;
  next_page?: string | null;
  previous_page?: string | null;
}

export interface ZendeskError {
  error: string;
  description: string;
  details?: Record<string, any>;
}

export interface ZendeskApiError {
  message: string;
  status: number;
  details?: ZendeskError;
}

/**
 * Zendesk plan types for rate limiting
 */
export enum ZendeskPlan {
  ESSENTIAL = 'essential',
  TEAM = 'team',
  PROFESSIONAL = 'professional',
  ENTERPRISE = 'enterprise',
  ENTERPRISE_PLUS = 'enterprise_plus'
}

/**
 * Rate limit information
 */
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * API endpoint configuration
 */
export interface ApiEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  rateLimit?: {
    requests: number;
    window: number; // in seconds
  };
}