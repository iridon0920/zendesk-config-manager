/**
 * Configuration schema validation
 */

import { ZendeskConfiguration, ConfigurationValidationResult, ValidationError } from '@/models/configuration';

export class SchemaValidator {
  static validate(config: ZendeskConfiguration): ConfigurationValidationResult {
    const errors: ValidationError[] = [];

    // TODO: Implement comprehensive schema validation
    // This is a placeholder implementation

    if (config.ticket_fields) {
      config.ticket_fields.forEach((field, index) => {
        if (!field.title) {
          errors.push({
            path: `ticket_fields[${index}].title`,
            message: 'Title is required for ticket fields'
          });
        }
        if (!field.type) {
          errors.push({
            path: `ticket_fields[${index}].type`,
            message: 'Type is required for ticket fields'
          });
        }
      });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}