const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  🏢 PKEstate — Database Synchronizer & Seeder');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const envPath = path.join(__dirname, '../server/.env');
if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
} else {
  require('dotenv').config();
}

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error('❌ Error: DATABASE_URL not found in server/.env or environment variables!');
  console.log('👉 Please set DATABASE_URL in server/.env (e.g. postgresql://... or file:./dev.db)\n');
  process.exit(1);
}

const isPostgres = dbUrl.startsWith('postgres://') || dbUrl.startsWith('postgresql://');
const schemaFile = isPostgres ? 'server/prisma/schema.prisma' : 'server/prisma/schema.sqlite.prisma';

console.log(`📡 Target Database: ${isPostgres ? 'PostgreSQL (Cloud / Vercel)' : 'SQLite (Local dev.db)'}`);
console.log(`📄 Using Prisma Schema: ${schemaFile}\n`);

try {
  console.log('1️⃣ Pushing latest database schema (Properties, Team, News, Feedback)...');
  execSync(`npx prisma db push --schema=${schemaFile} --accept-data-loss`, {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, DATABASE_URL: dbUrl },
  });
  console.log('✅ Schema updated successfully!\n');

  console.log('2️⃣ Seeding initial data (Properties, Pakistani Team, News with YouTube, Client Feedback, Admin)...');
  execSync(`node server/prisma/seed.js`, {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, DATABASE_URL: dbUrl },
  });
  console.log('✅ Database seeded successfully!\n');

  console.log('🎉 ALL DONE! Your database now has all new features and live data.');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
} catch (err) {
  console.error('\n❌ Database sync failed:', err.message);
  process.exit(1);
}
