/**
 * Rate limiter for Zendesk API
 */

import { ZendeskPlan } from '@/models/zendesk';
import { RateLimiter } from '@/core/interfaces';

export class ZendeskRateLimiter implements RateLimiter {
  private rateLimits: Map<string, { remaining: number; resetTime: Date }> = new Map();
  private retryInterval = 1000; // Default 1 second

  async checkLimit(endpoint: string): Promise<boolean> {
    const limit = this.rateLimits.get(endpoint);
    if (!limit) return true;
    
    if (limit.remaining <= 0 && new Date() < limit.resetTime) {
      return false;
    }
    
    return true;
  }

  async waitForReset(endpoint: string): Promise<void> {
    const limit = this.rateLimits.get(endpoint);
    if (!limit) return;
    
    const waitTime = limit.resetTime.getTime() - Date.now();
    if (waitTime > 0) {
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  adjustRetryInterval(planType: ZendeskPlan): void {
    switch (planType) {
      case 'essential':
        this.retryInterval = 2000; // 2 seconds
        break;
      case 'team':
        this.retryInterval = 1500; // 1.5 seconds
        break;
      case 'professional':
      case 'enterprise':
        this.retryInterval = 1000; // 1 second
        break;
      default:
        this.retryInterval = 2000; // Conservative default
    }
  }

  getRemainingRequests(endpoint: string): number {
    const limit = this.rateLimits.get(endpoint);
    return limit ? limit.remaining : -1;
  }

  updateRateLimit(endpoint: string, remaining: number, resetTime: Date): void {
    this.rateLimits.set(endpoint, { remaining, resetTime });
  }
}