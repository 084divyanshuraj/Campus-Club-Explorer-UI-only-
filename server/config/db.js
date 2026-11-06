const path = require('path');
const fs = require('fs');
const { DatabaseSync } = require('node:sqlite');
const { initialClubs, sampleRegistrations } = require('../seeds/clubsData');

// Resolve path for SQLite database file
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'campus.db');
const db = new DatabaseSync(dbPath);

// Enable WAL mode & foreign keys for high performance and durability
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

/**
 * Initialize Tables
 */
function initDatabase() {
  // 1. Clubs Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS clubs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      category TEXT NOT NULL,
      categoryClass TEXT NOT NULL,
      icon TEXT DEFAULT '🎓',
      members INTEGER DEFAULT 0,
      schedule TEXT NOT NULL,
      description TEXT NOT NULL,
      fullDescription TEXT NOT NULL,
      activities TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Registrations Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_name TEXT NOT NULL,
      student_email TEXT NOT NULL,
      reg_number TEXT NOT NULL,
      department TEXT DEFAULT 'Computer Science & Engineering',
      year TEXT DEFAULT '2nd Year',
      club_name TEXT NOT NULL,
      status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Safe migration for existing DB
  try { db.exec("ALTER TABLE registrations ADD COLUMN department TEXT DEFAULT 'Computer Science & Engineering';"); } catch(e){}
  try { db.exec("ALTER TABLE registrations ADD COLUMN year TEXT DEFAULT '2nd Year';"); } catch(e){}

  // 3. Users Table (For Student Account Registration & Login)
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      reg_number TEXT NOT NULL,
      department TEXT DEFAULT 'Computer Science & Engineering',
      year TEXT DEFAULT '2nd Year',
      role TEXT DEFAULT 'student',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed default users if empty
  const userCountRow = db.prepare('SELECT COUNT(*) as count FROM users').get();
  if (userCountRow.count === 0) {
    const insertUser = db.prepare(`
      INSERT INTO users (name, email, password, reg_number, department, year, role)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    insertUser.run('Aarav Sharma', 'aarav.sharma@campus.edu', 'student123', '2024CS1042', 'Computer Science & Engineering', '2nd Year', 'student');
    insertUser.run('Priya Nair', 'priya.nair@campus.edu', 'student123', '2024EC2105', 'Electronics & Communication', '1st Year', 'student');
    insertUser.run('Campus Administrator', 'admin@campus.edu', 'admin123', 'ADMIN01', 'Administration', 'Staff', 'admin');
  }

  // Check if clubs need seeding
  const clubCountRow = db.prepare('SELECT COUNT(*) as count FROM clubs').get();
  if (clubCountRow.count === 0) {
    console.log('🌱 Seeding initial campus clubs into SQLite database...');
    seedClubs();
  }

  // Check if sample registrations need seeding
  const regCountRow = db.prepare('SELECT COUNT(*) as count FROM registrations').get();
  if (regCountRow.count === 0) {
    console.log('🌱 Seeding demo registration applications...');
    seedRegistrations();
  }
}

function seedClubs() {
  const insertStmt = db.prepare(`
    INSERT INTO clubs (id, name, category, categoryClass, icon, members, schedule, description, fullDescription, activities)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const club of initialClubs) {
    insertStmt.run(
      club.id,
      club.name,
      club.category,
      club.categoryClass,
      club.icon,
      club.members,
      club.schedule,
      club.description,
      club.fullDescription,
      JSON.stringify(club.activities)
    );
  }
  console.log(`✅ ${initialClubs.length} clubs successfully seeded.`);
}

function seedRegistrations() {
  const insertStmt = db.prepare(`
    INSERT INTO registrations (student_name, student_email, reg_number, department, year, club_name, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const reg of sampleRegistrations) {
    insertStmt.run(
      reg.student_name,
      reg.student_email,
      reg.reg_number,
      reg.department || 'Computer Science & Engineering',
      reg.year || '2nd Year',
      reg.club_name,
      reg.status,
      reg.created_at
    );
  }
  console.log(`✅ ${sampleRegistrations.length} sample registrations seeded.`);
}

// Auto-run on module require
initDatabase();

module.exports = {
  db,
  initDatabase,
  seedClubs,
  seedRegistrations
};

