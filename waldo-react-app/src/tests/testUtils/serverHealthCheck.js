// Rails test server health check utility - shoudl run before all integration tests

async function testRailsServerUp() {
  const healthResponse = await fetch('http://localhost:3001/up', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    }
  });
  
  if (!healthResponse.ok) {
    return {
      success: false,
      message: `❌ Rails server connectivity failed: ${healthResponse.status} ${healthResponse.statusText}`
    };
  }
  
  console.log('✅ Rails server is accepting connections');
  console.log(`📊 Server status: ${healthResponse.status} OK`);
  return { success: true, message: 'Connectivity OK' };
}

async function testRailsEnv() {
  const envResponse = await fetch('http://localhost:3001/api/test/environment_check', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    }
  });
  
  if (!envResponse.ok) {
    return {
      success: false,
      message: `❌ Environment check failed: ${envResponse.status} ${envResponse.statusText}`
    };
  }
  
  const envData = await envResponse.json();
  
  if (envData.environment !== 'test') {
    return {
      success: false,
      message: `❌ Rails server is not in test mode (current: ${envData.environment})`
    };
  }
  
  console.log('✅ Rails server is in test mode');
  
  return {
    success: true,
    message: 'Test environment OK',
    environment: envData.environment
  };
}

async function testDBResponse() {
  const testDataResponse = await fetch('http://localhost:3001/api/test/load_user_fixtures', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
  
  if (!testDataResponse.ok) {
    return {
      success: false,
      message: `❌ Test database not accessible: ${testDataResponse.status} ${testDataResponse.statusText}`
    };
  }
  
  const testData = await testDataResponse.json();
  console.log(`✅ Test database accessible - ${testData.user_count} users loaded`);
  return { success: true, message: 'DB ok', userCount: testData.user_count };
}

async function cleanupTestDB() {
  await fetch('http://localhost:3001/api/test/cleanup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
  
  console.log('✅ Test data cleaned up');
  
  return { success: true, message: 'Cleanup OK' };
}

export const serverHealthCheck = {
  /**
   * Check if Rails server is running and in test mode
   * @returns {Promise<{success: boolean, message: string, details?: any}>}
   */
  async checkServerHealth() {
    try {
      console.log('🔍 Checking Rails server health...');
      
      const connectivity = await testRailsServerUp();
      if (!connectivity.success) return connectivity;

      const environment = await testRailsEnv();
      if (!environment.success) return environment;

      const database = await testDBResponse();
      if (!database.success) return database;

      await cleanupTestDB();
      
      return {
        success: true,
        message: '✅✅✅✅ Rails server is healthy and ready for integration tests',
        details: {
          connectivity: 'OK',
          testMode: 'OK',
          database: 'OK',
          userCount: database.userCount,
          environment: environment.environment,
          serverStatus: 'OK'
        }
      };
    } catch (error) {
      return {
        success: false,
        message: `❌ Rails server health check failed: ${error.message}`,
        details: {
          error: error.message,
          stack: error.stack
        }
      };
    }
  },

  /**
   * Run health check and throw error if server is not ready
   * @returns {Promise<void>}
   */
  async ensureServerReady() {
    const health = await this.checkServerHealth();
    
    if (!health.success) {
      throw new Error(`Rails server health check failed: ${health.message}`);
    }
    
    console.log(health.message);
  }
}; 