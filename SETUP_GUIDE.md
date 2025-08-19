# Contact Form Setup Guide

## 🚀 Quick Start

### 1. Database Setup
```bash
# Start MySQL server
# Create database (if not exists)
mysql -u root -p
CREATE DATABASE maytas_travel_expense;
CREATE TABLE contact_info (
id INT AUTO_INCREMENT PRIMARY KEY,
icon VARCHAR(100) NOT NULL,
title VARCHAR(100) NOT NULL,
content VARCHAR(255) NOT NULL,
active TINYINT(1) DEFAULT 1,
added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO contact_info (icon, title, content, active)
VALUES
('FaMapMarkerAlt', 'Address', ' Noida, Uttar Pradesh, India', 1),
('FaPhone', 'Phone', '+91 1234567890', 1),
('FaEnvelope', 'Email', 'maytas.travel.expense.co.in', 1),
('FaClock', 'Business Hours', 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM', 1);


EXIT
```

### 2. Test Database Connection
```bash
node test-db-connection.js
```

### 3. Start Backend Server
```bash
node server.js
# Server will run on http://localhost:5000
```

### 4. Start Frontend
```bash
npm start
# React app will run on http://localhost:3000
```

## 🔧 Configuration

### Database Credentials
Update these in `server.js` if needed:
```javascript
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: '1@34567b', // Your MySQL password
  database: 'maytas_travel_expense'
});
```

## 📋 Features Added

### ✅ Contact Form
- Real-time form validation
- Proper error handling
- Success/error messages
- Loading states
- Email validation

### ✅ Database Integration
- Automatic table creation
- Data persistence
- Error handling

### ✅ API Endpoints
- `POST /api/contact` - JSON API for React frontend
- `POST /contact` - Legacy form submission support
- `GET /api/contacts` - Get all contact submissions

## 🧪 Testing

### Test API Endpoint
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'
```

### Check Database
```bash
mysql -u root -p
USE maytas_travel_expense;
SELECT * FROM contacts;
```

## 🐛 Troubleshooting

### Database Connection Issues
1. **Error: Access denied**
   - Check username/password in server.js
   - Ensure MySQL is running: `mysql -u root -p`

2. **Error: Database doesn't exist**
   - Create database: `CREATE DATABASE maytas_travel_expense;`

3. **Error: Table doesn't exist**
   - Server will auto-create table on startup

### Port Issues
- Backend: Port 5000 (configurable in server.js)
- Frontend: Port 3000 (React default)

### CORS Issues
- Already configured with `cors()` middleware

## 📊 Database Schema

```sql
CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔄 Restart Instructions

1. Stop all running servers (Ctrl+C)
2. Start backend: `node server.js`
3. Start frontend: `npm start`
4. Test form submission

## 📞 Support

If issues persist:
1. Check console logs for specific error messages
2. Verify MySQL is running: `mysql -u root -p`
3. Test database connection: `node test-db-connection.js`
4. Check server logs for detailed error messages
