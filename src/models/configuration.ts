/**
 * Core Zendesk configuration schema interfaces
 */

export interface ZendeskConfiguration {
  ticket_fields?: TicketField[];
  user_fields?: UserField[];
  organizations?: Organization[];
  groups?: Group[];
  macros?: Macro[];
  triggers?: Trigger[];
  automations?: Automation[];
}

export interface TicketField {
  title: string;
  type: 'text' | 'textarea' | 'dropdown' | 'checkbox' | 'date' | 'integer' | 'decimal' | 'regexp';
  description?: string;
  required?: boolean;
  options?: string[];
  regexp_for_validation?: string;
  position?: number;
  active?: boolean;
}

export interface UserField {
  title: string;
  type: 'text' | 'textarea' | 'dropdown' | 'checkbox' | 'date' | 'integer' | 'decimal' | 'regexp';
  description?: string;
  required?: boolean;
  options?: string[];
  regexp_for_validation?: string;
  position?: number;
  active?: boolean;
}

export interface Organization {
  name: string;
  details?: string;
  notes?: string;
  group_id?: number;
  shared_tickets?: boolean;
  shared_comments?: boolean;
  external_id?: string;
  tags?: string[];
  domain_names?: string[];
}

export interface Group {
  name: string;
  description?: string;
  default?: boolean;
}

export interface Macro {
  title: string;
  description?: string;
  actions: MacroAction[];
  active?: boolean;
  restriction?: {
    type: 'Group' | 'User';
    id?: number;
    ids?: number[];
  };
}

export interface MacroAction {
  field: string;
  value: string | number | boolean;
}

export interface Trigger {
  title: string;
  description?: string;
  conditions: Condition[];
  actions: Action[];
  active?: boolean;
  position?: number;
  category_id?: string;
}

export interface Automation {
  title: string;
  description?: string;
  conditions: Condition[];
  actions: Action[];
  active?: boolean;
  position?: number;
}

export interface Condition {
  field: string;
  operator: string;
  value: string | number | boolean;
}

export interface Action {
  field: string;
  value: string | number | boolean;
}

/**
 * Configuration validation result
 */
export interface ConfigurationValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  path: string;
  message: string;
  line?: number;
  column?: number;
}