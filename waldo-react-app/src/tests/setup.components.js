import { expect, afterEach, vi, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

// Mock fetch globally to prevent real API calls
beforeAll(() => {
  window.fetch = vi.fn().mockImplementation((url) => {
    console.log(`🔧 Mocking fetch for: ${url}`);
    
    if (url.includes('/api/images')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          images: [
            { id: 1, title: 'cake-factory', url: 'test-image.jpg' }
          ]
        })
      });
    }
    
    if (url.includes('/api/games')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          games: []
        })
      });
    }
    
    // Default response
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({})
    });
  });
});

afterEach(() => {
  cleanup();
}); 