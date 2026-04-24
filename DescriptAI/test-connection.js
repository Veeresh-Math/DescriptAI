// Test database connection with the new configuration
const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function testConnection() {
  console.log('Testing database connection...');
  const startTime = Date.now();
  
  try {
    // Test simple query
    const count = await db.user.count();
    const duration = Date.now() - startTime;
    
    console.log(`✓ Database connection successful!`);
    console.log(`  Users count: ${count}`);
    console.log(`  Duration: ${duration}ms`);
    
    // Test if database is paused/waking
    if (duration > 5000) {
      console.log('⚠ Warning: Connection took >5s, database may be waking from pause');
    }
    
    return true;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`✗ Database connection failed after ${duration}ms:`);
    console.error('  Error:', error.message);
    console.error('  Code:', error.code);
    return false;
  } finally {
    await db.$disconnect();
  }
}

testConnection().then(success => {
  process.exit(success ? 0 : 1);
});