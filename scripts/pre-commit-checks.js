#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function getStagedFiles() {
  try {
    const output = execSync('git diff --cached --name-only --diff-filter=ACM', {
      encoding: 'utf8',
    });
    return output.trim().split('\n').filter(Boolean);
  } catch (error) {
    log('Error getting staged files', 'red');
    process.exit(1);
  }
}

function checkEmptyFiles(files) {
  const emptyFiles = [];

  for (const file of files) {
    if (!fs.existsSync(file)) continue;

    const stats = fs.statSync(file);
    if (stats.isFile()) {
      const content = fs.readFileSync(file, 'utf8');
      const trimmedContent = content.trim();
      if (trimmedContent === '') {
        emptyFiles.push(file);
      }
    }
  }

  return emptyFiles;
}

function checkEmptyFolders(files) {
  const emptyFolders = [];
  const checkedFolders = new Set();

  for (const file of files) {
    const dir = path.dirname(file);
    if (checkedFolders.has(dir)) continue;
    checkedFolders.add(dir);

    if (fs.existsSync(dir)) {
      const items = fs.readdirSync(dir);
      if (items.length === 0) {
        emptyFolders.push(dir);
      }
    }
  }

  return emptyFolders;
}

function main() {
  log('🔍 Running pre-commit checks...', 'yellow');

  const stagedFiles = getStagedFiles();

  if (stagedFiles.length === 0) {
    log('✅ No files staged for commit', 'green');
    return;
  }

  log(`📁 Checking ${stagedFiles.length} staged files...`, 'yellow');

  // Check for empty files
  const emptyFiles = checkEmptyFiles(stagedFiles);
  if (emptyFiles.length > 0) {
    log('❌ Empty files found:', 'red');
    emptyFiles.forEach((file) => log(`   ${file}`, 'red'));
    log('\n💡 Please remove empty files or add content before committing.', 'yellow');
    process.exit(1);
  }

  // Check for empty folders
  const emptyFolders = checkEmptyFolders(stagedFiles);
  if (emptyFolders.length > 0) {
    log('❌ Empty folders found:', 'red');
    emptyFolders.forEach((folder) => log(`   ${folder}`, 'red'));
    log('\n💡 Please remove empty folders or add files before committing.', 'yellow');
    process.exit(1);
  }

  log('✅ All pre-commit checks passed!', 'green');
}

if (require.main === module) {
  main();
}
