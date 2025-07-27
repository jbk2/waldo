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
  
  // Mock HTMLDialogElement.prototype.close for test environment
  if (typeof HTMLDialogElement !== 'undefined') {
    const originalClose = HTMLDialogElement.prototype.close;
    HTMLDialogElement.prototype.close = function() {
      if (typeof originalClose === 'function') {
        originalClose.call(this);
      }
    };
  }
  

  // Override fetch to handle relative URLs and add proper headers
  window.fetch = (url, options = {}) => {
    // If this is a request to the images API and it's failing due to Active Storage,
    // return a mock successful response
    if (url.includes('/api/images/by_title/') && (!options.method || options.method === 'GET')) {
      console.log('🔧 Mocking API response for:', url);
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          image: {
            id: 1,
            title: 'cake-factory',
            url: 'https://via.placeholder.com/800x600/FF0000/FFFFFF?text=Cake+Factory+Test+Image'
          },
          characters: [
            { id: 1, image_id: 1, name: 'waldo', start_x: 0.1, end_x: 0.2, start_y: 0.2, end_y: 0.3 },
            { id: 2, image_id: 1, name: 'wenda', start_x: 0.3, end_x: 0.4, start_y: 0.4, end_y: 0.5 },
            { id: 3, image_id: 1, name: 'odlaw', start_x: 0.5, end_x: 0.6, start_y: 0.6, end_y: 0.7 }
          ],
          message: "successful Rails app JSON return of image#by_title; cake-factory"
        })
      });
    }
    

    
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