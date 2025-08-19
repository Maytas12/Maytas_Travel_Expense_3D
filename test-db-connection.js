const mysql = require('mysql2');

// Test database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1@34567b',
  database: 'maytas_travel_expense'
});

console.log('Testing database connection...');

db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    console.log('\n🔧 To fix this:');
    console.log('1. Make sure MySQL is running');
    console.log('2. Check if database "maytas_travel_expense" exists');
    console.log('3. Verify username and password');
    console.log('4. Run: CREATE DATABASE maytas_travel_expense;');
    process.exit(1);
  }
  
  console.log('✅ Database connected successfully!');
  
  // Test creating contacts table
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('❌ Error creating table:', err);
    } else {
      console.log('✅ Contacts table ready');
    }
    
    // Test insert
    const testQuery = 'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)';
    const testValues = ['Test User', 'test@example.com', 'Test Subject', 'This is a test message'];
    
    db.query(testQuery, testValues, (err, result) => {
      if (err) {
        console.error('❌ Test insert failed:', err);
      } else {
        console.log('✅ Test insert successful, ID:', result.insertId);
        
        // Clean up test data
        db.query('DELETE FROM contacts WHERE email = ?', ['test@example.com'], () => {
          console.log('✅ Test data cleaned up');
          db.end();
        });
      }
    });
  });
});
