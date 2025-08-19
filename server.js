const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name
  }
});

const upload = multer({ storage: storage });

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Change this to your MySQL username
  password: '12345', // Change this to your MySQL password
  database: 'maytas_travel_expense'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Create contacts table if it doesn't exist
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
    console.error('Error creating table:', err);
  } else {
    console.log('Contacts table ready');
  }
});

// Create career_applications table if it doesn't exist
const createCareersTableQuery = `
  CREATE TABLE IF NOT EXISTS career_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    position VARCHAR(255) NOT NULL,
    experience VARCHAR(50) NOT NULL,
    education VARCHAR(255),
    resume_path VARCHAR(500),
    cover_letter TEXT,
    linkedin VARCHAR(500),
    portfolio VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

db.query(createCareersTableQuery, (err, result) => {
  if (err) {
    console.error('Error creating career_applications table:', err);
  } else {
    console.log('Career applications table ready');
  }
});

// Routes
// GET all contacts
app.get('/api/contacts', (req, res) => {
  const query = 'SELECT * FROM contacts ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching contacts:', err);
      res.status(500).json({ error: 'Failed to fetch contacts' });
    } else {
      res.json(results);
    }
  });
});

// API endpoint for contact form submission
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address' });
  }

  const query = 'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)';
  const values = [name, email, subject, message];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error saving contact:', err);
      res.status(500).json({ error: 'Failed to save contact. Please try again.' });
    } else {
      res.json({ 
        message: 'Thank you for your message! We will get back to you soon.',
        id: result.insertId 
      });
    }
  });
});

// Handle direct form submission (legacy support)
app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).send(`
      <script>
        alert('All fields are required');
        window.history.back();
      </script>
    `);
  }

  const query = 'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)';
  const values = [name, email, subject, message];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error saving contact:', err);
      res.status(500).send(`
        <script>
          alert('Failed to save contact. Please try again.');
          window.history.back();
        </script>
      `);
    } else {
      res.send(`
        <script>
          alert('Thank you for your message! We will get back to you soon.');
          window.location.href = '/';
        </script>
      `);
    }
  });
});

// API endpoint to get active contact info
app.get('/api/contact-info', (req, res) => {
  const query = 'SELECT icon, title, content FROM contact_info WHERE active = 1 ORDER BY id ASC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching contact info:', err);
      res.status(500).json({ error: 'Failed to fetch contact information' });
    } else {
      res.json(results);
    }
  });
});

// GET all career applications
app.get('/api/careers', (req, res) => {
  const query = 'SELECT * FROM career_applications ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching career applications:', err);
      res.status(500).json({ error: 'Failed to fetch career applications' });
    } else {
      res.json(results);
    }
  });
});

// API endpoint for career application submission
app.post('/api/careers', upload.single('resume'), (req, res) => {
  const { 
    fullName, 
    email, 
    phone, 
    position, 
    experience, 
    education, 
    coverLetter, 
    linkedin, 
    portfolio 
  } = req.body;

  if (!fullName || !email || !phone || !position || !experience) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address' });
  }

  const resumePath = req.file ? req.file.path : null;

  const query = `
    INSERT INTO career_applications 
    (full_name, email, phone, position, experience, education, resume_path, cover_letter, linkedin, portfolio) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    fullName, 
    email, 
    phone, 
    position, 
    experience, 
    education || null, 
    resumePath,
    coverLetter || null, 
    linkedin || null, 
    portfolio || null
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error saving career application:', err);
      res.status(500).json({ error: 'Failed to save application. Please try again.' });
    } else {
      res.json({ 
        message: 'Thank you for your application! We will review it and get back to you soon.',
        id: result.insertId 
      });
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
