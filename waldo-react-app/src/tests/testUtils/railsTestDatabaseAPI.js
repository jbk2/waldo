export const testDatabase = {
  // creates User fixtures in Rails test db 
  async loadUserFixtures() {
    const response = await fetch('/api/test/load_user_fixtures', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) { throw new Error('Failed to load test fixtures'); }
    return response.json();
  },
  
  // returns array of user objects, each with id and email_address
  async getUserFixtures() {
    const response = await fetch('/api/test/user_fixtures', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) { throw new Error('Failed to get user fixtures'); }
    return response.json();
  },
  
  // Resets entire Rails test db to clean state
  async cleanup() {
    const response = await fetch('/api/test/cleanup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) { throw new Error('Failed to cleanup test data'); }
    return response.json();
  },

  async generatePasswordResetToken(emailAddress) {
    const response = await fetch(`/api/test/generate_password_reset_token?email_address=${encodeURIComponent(emailAddress)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) { 
      throw new Error('Failed to generate password reset token'); 
    }
    return response.json();
  },

  async loadTestImages() {
    const response = await fetch('/api/test/load_test_images', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) { 
      throw new Error('Failed to load test images'); 
    }
    return response.json();
  }
}; 