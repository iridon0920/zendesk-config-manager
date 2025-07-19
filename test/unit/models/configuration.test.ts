/**
 * Configuration model tests
 */

import { ZendeskConfiguration, TicketField } from '@/models/configuration';

describe('Configuration Models', () => {
  describe('ZendeskConfiguration', () => {
    it('should create a valid configuration object', () => {
      const config: ZendeskConfiguration = {
        ticket_fields: [
          {
            title: 'Test Field',
            type: 'text',
            required: true
          }
        ]
      };

      expect(config).toBeDefined();
      expect(config.ticket_fields).toHaveLength(1);
      expect(config.ticket_fields![0].title).toBe('Test Field');
    });
  });

  describe('TicketField', () => {
    it('should create a valid ticket field', () => {
      const field: TicketField = {
        title: 'Priority',
        type: 'dropdown',
        options: ['Low', 'Medium', 'High'],
        required: true
      };

      expect(field.title).toBe('Priority');
      expect(field.type).toBe('dropdown');
      expect(field.options).toEqual(['Low', 'Medium', 'High']);
      expect(field.required).toBe(true);
    });
  });
});