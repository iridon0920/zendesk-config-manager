/**
 * Profile model for managing Zendesk authentication credentials
 */
export interface Profile {
  name: string;
  subdomain: string;
  email: string;
  api_token: string;
}

/**
 * Profile configuration file structure
 */
export interface ProfileConfig {
  profiles: Record<string, Omit<Profile, 'name'>>;
}

/**
 * Profile validation result
 */
export interface ProfileValidationResult {
  isValid: boolean;
  errors: string[];
}