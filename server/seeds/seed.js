/**
 * Database Seeder Script
 * Run with: npm run seed
 */
const { db, seedClubs, seedRegistrations } = require('../config/db');

function resetAndSeed() {
  console.log('🔄 Resetting database tables...');
  db.exec('DELETE FROM registrations;');
  db.exec('DELETE FROM clubs;');
  db.exec("DELETE FROM sqlite_sequence WHERE name IN ('clubs', 'registrations');");

  console.log('🌱 Populating fresh clubs data...');
  seedClubs();

  console.log('🌱 Populating sample student registrations...');
  seedRegistrations();

  console.log('✨ Database seeding complete! Ready for evaluation.');
}

resetAndSeed();
