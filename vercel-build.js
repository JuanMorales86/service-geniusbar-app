// vercel-build.js
console.log("Running custom build script");
const { execSync } = require('child_process');
try {
  console.log("Running astro check...");
  execSync('pnpm astro check', { stdio: 'inherit' });
  console.log("Running astro build with remote flag...");
  execSync('pnpm astro build --remote', { stdio: 'inherit' });
  console.log("Build completed successfully");
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}