require('dotenv').config();
const { execSync } = require('child_process');
const fs = require('fs');

const standardPath = 'C:\\Program Files\\k6\\k6.exe';
const k6Bin = fs.existsSync(standardPath) ? `"${standardPath}"` : 'k6';
const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
const token = process.env.TEST_USER_TOKEN || '';

try {
  execSync(`${k6Bin} run -e BASE_URL="${baseUrl}" -e TEST_USER_TOKEN="${token}" tests/performance/k6-bid-concurrency.js`, { stdio: 'inherit' });
} catch (error) {
  process.exit(error.status || 0);
}
