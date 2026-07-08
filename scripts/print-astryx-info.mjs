import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

function readPackage(name) {
  const packagePath = join(process.cwd(), 'node_modules', ...name.split('/'), 'package.json');
  if (!existsSync(packagePath)) return null;
  return JSON.parse(readFileSync(packagePath, 'utf8'));
}

const core = readPackage('@astryxdesign/core');
const cli = readPackage('@astryxdesign/cli');
const theme = readPackage('@astryxdesign/theme-neutral');

console.log('Astryx package status');
console.log(`- @astryxdesign/core: ${core?.version ?? 'not installed'}`);
console.log(`- @astryxdesign/theme-neutral: ${theme?.version ?? 'not installed'}`);
console.log(`- @astryxdesign/cli: ${cli?.version ?? 'not installed'}`);

if (cli?.bin) {
  console.log('- CLI bin:');
  console.log(cli.bin);
} else {
  console.log('- CLI bin: not available; inspect node_modules/@astryxdesign/cli after install');
}

console.log('\nRecommended verification flow:');
console.log('1. pnpm add -w @astryxdesign/core @astryxdesign/theme-neutral');
console.log('2. pnpm add -Dw @astryxdesign/cli');
console.log('3. inspect node_modules/@astryxdesign/core/package.json exports');
console.log('4. only then add verified re-exports in packages/ui/src/index.ts');
