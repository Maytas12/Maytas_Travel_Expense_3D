const mysql = require('mysql2');
const { exec } = require('child_process');

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '1@34567b',
  database: 'maytas_travel_expense'
};

// Create database connection
const db = mysql.createConnection(dbConfig);

// Function to test database connection
function testDatabaseConnection() {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if (err) {
        console.error('❌ Database connection failed:', err.message);
        reject(err);
      } else {
        console.log('✅ Database connection established successfully');
        
        // Test basic query
        db.query('SELECT 1 as test', (err, results) => {
          if (err) {
            console.error('❌ Database query test failed:', err);
            reject(err);
          } else {
            console.log('✅ Database query test passed');
            resolve(results);
          }
        });
      }
    });
  });
}

// Function to run React build
function runReactBuild() {
  return new Promise((resolve, reject) => {
    console.log('🚀 Starting React build process...');
    
    const buildProcess = exec('npm run build', (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Build failed:', error);
        reject(error);
      } else {
        console.log('✅ React build completed successfully');
        if (stdout) console.log('Build output:', stdout);
        if (stderr) console.log('Build warnings:', stderr);
        resolve();
      }
    });
    
    // Log build progress
    buildProcess.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    
    buildProcess.stderr.on('data', (data) => {
      console.error(data.toString());
    });
  });
}

// Main build process
async function buildWithDatabase() {
  try {
    console.log('🔍 Starting build process with database connection...');
    
    // Test database connection
    await testDatabaseConnection();
    
    // Run React build
    await runReactBuild();
    
    console.log('🎉 Build process completed successfully with database connection!');
    
    // Close database connection
    db.end();
    
  } catch (error) {
    console.error('❌ Build process failed:', error);
    process.exit(1);
  }
}

// Execute build
buildWithDatabase();
