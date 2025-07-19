/**
 * YAML parsing utilities
 */

import * as YAML from 'yaml';
import { ZendeskConfiguration } from '@/models/configuration';

export class YamlParser {
  static parse(content: string): ZendeskConfiguration {
    try {
      return YAML.parse(content) as ZendeskConfiguration;
    } catch (error) {
      throw new Error(`YAML parsing error: ${error}`);
    }
  }

  static stringify(config: ZendeskConfiguration): string {
    try {
      return YAML.stringify(config, {
        indent: 2,
        lineWidth: 120,
        minContentWidth: 20
      });
    } catch (error) {
      throw new Error(`YAML stringification error: ${error}`);
    }
  }
}