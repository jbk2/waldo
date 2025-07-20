export async function testDatabase() {
  try {
    // Check server health
    const healthResponse = await fetch('http://localhost:3001/api/test/environment_check');
    if (!healthResponse.ok) {
      throw new Error('Rails server not responding');
    }

    // Load fixtures
    const loadResponse = await fetch('http://localhost:3001/api/test/load_user_fixtures', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test: {} })
    });

    if (!loadResponse.ok) {
      throw new Error('Failed to load fixtures');
    }

    const loadData = await loadResponse.json();
    console.log('✅ Test database accessible -', loadData.message);

    // Get fixture users
    const usersResponse = await fetch('http://localhost:3001/api/test/user_fixtures');
    if (!usersResponse.ok) {
      throw new Error('Failed to get fixture users');
    }

    const usersData = await usersResponse.json();
    return usersData.users;

  } catch (error) {
    console.error('❌ Test database setup failed:', error.message);
    throw error;
  }
}

export async function cleanupTestDatabase() {
  try {
    const response = await fetch('http://localhost:3001/api/test/cleanup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test: {} })
    });

    if (!response.ok) {
      throw new Error('Failed to cleanup test database');
    }

    console.log('✅ Test data cleaned up');
  } catch (error) {
    console.error('❌ Test cleanup failed:', error.message);
  }
} 