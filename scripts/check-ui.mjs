import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const checks = [
  ['packages/ui/src/index.ts', existsSync(join(root, 'packages/ui/src/index.ts'))],
  ['packages/theme/src/globals.css', existsSync(join(root, 'packages/theme/src/globals.css'))],
  ['AGENTS.md', existsSync(join(root, 'AGENTS.md'))],
  ['pnpm-workspace.yaml', existsSync(join(root, 'pnpm-workspace.yaml'))]
];

const layoutPath = join(root, 'apps/playground-next/app/layout.tsx');
const layoutUsesProvider =
  existsSync(layoutPath) && readFileSync(layoutPath, 'utf8').includes('AppUIProvider');
checks.push(['apps/playground-next/app/layout.tsx uses AppUIProvider', layoutUsesProvider]);

const failed = checks.filter(([, ok]) => !ok);

for (const [label, ok] of checks) {
  console.log(`${ok ? 'ok' : 'fail'} ${label}`);
}

if (failed.length > 0) {
  process.exitCode = 1;
}
