const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize database
require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger for development
app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next();
});

// API Routes
app.use('/api/clubs', require('./routes/clubRoutes'));
app.use('/api/registrations', require('./routes/registrationRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'CampusConnect Backend API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Serve frontend static files
const frontendDir = path.join(__dirname, '..');
app.use(express.static(frontendDir));

// Fallback to index.html for root or SPA navigation
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

// Global 404 handler for API routes
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API route '${req.originalUrl}' not found.`
  });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start Express server
const server = app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 CampusConnect Backend Server is LIVE!`);
  console.log(`🌐 Local URL:  http://localhost:${PORT}`);
  console.log(`📡 API Clubs:  http://localhost:${PORT}/api/clubs`);
  console.log(`📋 API Regs:   http://localhost:${PORT}/api/registrations`);
  console.log(`📊 API Stats:  http://localhost:${PORT}/api/stats`);
  console.log(`==================================================\n`);
});

module.exports = app;

