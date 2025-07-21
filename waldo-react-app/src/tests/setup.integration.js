import { expect, beforeAll, afterAll } from 'vitest';
import * as matchers from "@testing-library/jest-dom/matchers";
import { railsServerHealthCheck } from './testUtils/railsServerHealthCheck.js';

expect.extend(matchers);

const originalFetch = window.fetch;

// Override fetch to handle relative URLs and add proper headers
beforeAll(async () => {
  // Health check before running integration tests
  try {
    await railsServerHealthCheck.ensureServerReady();
  } catch (error) {
    console.error('🚨 Rails server health check failed!');
    console.error('Make sure Rails server is running with: RAILS_ENV=test bin/rails server -p 3001');
    throw error;
  }
  
  window.fetch = (url, options = {}) => {
    if (url.startsWith('http')) {
      return originalFetch(url, options);
    }
    
    const baseUrl = 'http://localhost:3001';
    const fullUrl = `${baseUrl}${url}`;
    
    // Add proper headers for tests calling Rails API
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Origin': 'http://localhost:5173',
      ...options.headers
    };
    
    return originalFetch(fullUrl, {
      ...options,
      headers
    });
  };
});

afterAll(() => {
  window.fetch = originalFetch;
}); 