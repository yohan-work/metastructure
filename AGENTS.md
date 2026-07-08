# AGENTS.md

## Project Goal

This repository is a reusable UI system built on top of Astryx.
Use `@repo/ui` and `@repo/theme` instead of importing Astryx directly from application code.

## UI Rules

- Prefer components exported from `@repo/ui`.
- Do not guess Astryx component props.
- Before using an unfamiliar Astryx component, inspect it using:
  - `pnpm astryx component`
  - `pnpm astryx component <ComponentName>`
  - package type definitions
- Do not create raw UI from scratch if an Astryx component or existing pattern exists.
- Do not hardcode colors, spacing, radius, or typography unless it is part of a local example.
- Prefer CSS custom properties and theme tokens.
- Keep components composable and accessible.
- Avoid inline styles.
- Do not over-wrap every Astryx component. Only wrap when we need a stable internal API.

## Import Rules

Application code should import from:

```ts
import { Button, PageHeader, AppUIProvider } from '@repo/ui';
```

Avoid this in app code:

```ts
import { Button } from '@astryxdesign/core/Button';
```

Direct Astryx imports are allowed only inside `packages/ui`.

## Workflow Before UI Work

1. Check existing patterns in `packages/ui/src/patterns`.
2. Check available Astryx components with CLI.
3. Use or extend `@repo/ui`.
4. Add playground example if a new reusable pattern is created.
5. Update README if usage changes.

## Browser Compatibility

Astryx may depend on modern browser APIs.
For public websites, especially local business or hospital websites, verify browser support before using layered components such as popover, menu, tooltip, or complex navigation.

## Testing

Before finishing work, run:

```bash
pnpm typecheck
pnpm build
pnpm check:ui
```
