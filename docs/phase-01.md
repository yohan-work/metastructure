# Codex 작업 요청: Astryx 기반 공용 디자인 시스템 레포 구축

## 0. 작업 목표

이 레포는 Meta가 공개한 오픈소스 디자인 시스템 **Astryx**를 기반으로, 어느 React/Next.js 프로젝트에서든 빠르게 가져다 쓸 수 있는 **공용 UI 시스템 레포**를 만드는 것이 목표다.

단순히 Astryx를 설치하는 데서 끝내지 말고, 아래 목적을 만족하는 구조로 구성해줘.

1. Astryx 컴포넌트를 프로젝트마다 직접 import하지 않고, 내부 `ui` 패키지를 통해 재사용할 수 있게 한다.
2. 공용 테마 패키지를 만들어 디자인 토큰, 브랜드 컬러, radius, spacing 등을 관리할 수 있게 한다.
3. Next.js 기반 playground 앱을 만들어 Astryx 컴포넌트와 커스텀 UI 패키지를 바로 테스트할 수 있게 한다.
4. Landing, Admin, Table, Detail, Form, AI Chat 같은 실무형 템플릿 구조를 추가한다.
5. Codex/AI 에이전트가 UI 작업 시 Astryx 컴포넌트 prop을 추측하지 않도록 `AGENTS.md` 작업 규칙을 만든다.
6. 최종적으로 신규 프로젝트에서 이 레포를 스타터처럼 가져다 쓰거나, 기존 프로젝트에 `ui/theme` 패키지만 연결할 수 있게 한다.

---

## 1. 기술 스택 기준

가능하면 아래 기준으로 구성한다.

* Package Manager: `pnpm`
* Monorepo: `pnpm workspace`
* Framework: `Next.js`
* Language: `TypeScript`
* UI Base: `@astryxdesign/core`
* Theme: `@astryxdesign/theme-neutral`
* CLI: `@astryxdesign/cli`
* Styling: Astryx 기본 CSS + CSS custom properties 기반 theme override
* AI Rule: `AGENTS.md`

기존 레포 상태를 먼저 확인한 뒤, 이미 설정되어 있는 내용이 있으면 덮어쓰기보다 현재 구조에 맞게 확장해줘.

---

## 2. 우선 확인해야 할 사항

작업 시작 전 아래를 확인해줘.

1. 현재 레포의 `package.json`, 디렉토리 구조, lockfile 유무 확인
2. pnpm workspace가 이미 있는지 확인
3. Next.js 앱이 이미 있는지 확인
4. Astryx 관련 패키지가 이미 설치되어 있는지 확인
5. TypeScript 설정이 있는지 확인

확인 후, 필요한 경우에만 파일을 생성하거나 수정해줘.

---

## 3. 목표 디렉토리 구조

최종적으로 아래와 유사한 구조가 되도록 만들어줘.

```txt
astryx-ui-kit/
├─ apps/
│  └─ playground-next/
│     ├─ app/
│     │  ├─ layout.tsx
│     │  ├─ page.tsx
│     │  ├─ examples/
│     │  │  ├─ landing/page.tsx
│     │  │  ├─ admin/page.tsx
│     │  │  ├─ table/page.tsx
│     │  │  ├─ detail/page.tsx
│     │  │  ├─ form/page.tsx
│     │  │  └─ chat/page.tsx
│     │  └─ globals.css
│     ├─ package.json
│     └─ next.config.ts
│
├─ packages/
│  ├─ ui/
│  │  ├─ src/
│  │  │  ├─ components/
│  │  │  │  ├─ AppShell.tsx
│  │  │  │  ├─ PageHeader.tsx
│  │  │  │  ├─ EmptyState.tsx
│  │  │  │  ├─ StatCard.tsx
│  │  │  │  └─ index.ts
│  │  │  ├─ providers/
│  │  │  │  └─ AppUIProvider.tsx
│  │  │  ├─ patterns/
│  │  │  │  ├─ LandingPattern.tsx
│  │  │  │  ├─ AdminDashboardPattern.tsx
│  │  │  │  ├─ TablePagePattern.tsx
│  │  │  │  ├─ DetailPagePattern.tsx
│  │  │  │  ├─ FormWizardPattern.tsx
│  │  │  │  ├─ AIChatPattern.tsx
│  │  │  │  └─ index.ts
│  │  │  └─ index.ts
│  │  ├─ package.json
│  │  └─ tsconfig.json
│  │
│  ├─ theme/
│  │  ├─ src/
│  │  │  ├─ base.css
│  │  │  ├─ theme-soyo.css
│  │  │  ├─ globals.css
│  │  │  └─ index.ts
│  │  ├─ package.json
│  │  └─ tsconfig.json
│  │
│  └─ templates/
│     ├─ landing/
│     │  ├─ page.tsx
│     │  └─ README.md
│     ├─ admin-dashboard/
│     │  ├─ page.tsx
│     │  └─ README.md
│     ├─ table-page/
│     │  ├─ page.tsx
│     │  └─ README.md
│     ├─ detail-page/
│     │  ├─ page.tsx
│     │  └─ README.md
│     ├─ form-wizard/
│     │  ├─ page.tsx
│     │  └─ README.md
│     └─ ai-chat/
│        ├─ page.tsx
│        └─ README.md
│
├─ scripts/
│  ├─ check-ui.mjs
│  └─ print-astryx-info.mjs
│
├─ AGENTS.md
├─ README.md
├─ package.json
├─ pnpm-workspace.yaml
└─ tsconfig.base.json
```

단, 실제 Astryx 패키지의 export 경로나 컴포넌트명이 다를 수 있으므로, 반드시 설치 후 CLI/타입/패키지 내부를 확인하고 실제 동작하는 import만 사용해줘.

---

## 4. 설치 및 초기화

루트 기준으로 필요한 패키지를 설치해줘.

```bash
pnpm add -w @astryxdesign/core @astryxdesign/theme-neutral
pnpm add -Dw @astryxdesign/cli typescript
```

Next.js playground가 없다면 생성해줘.

```bash
pnpm create next-app apps/playground-next --ts --app --eslint
```

단, 명령어 실행이 어려운 환경이면 수동으로 필요한 파일을 생성해도 된다.

루트 `package.json`에는 아래 스크립트를 추가해줘.

```json
{
  "scripts": {
    "dev": "pnpm --filter playground-next dev",
    "build": "pnpm -r build",
    "typecheck": "pnpm -r typecheck",
    "astryx": "node node_modules/@astryxdesign/cli/bin/astryx.mjs",
    "astryx:components": "pnpm astryx component",
    "astryx:tokens": "pnpm astryx docs tokens",
    "astryx:templates": "pnpm astryx template --list",
    "astryx:doctor": "pnpm astryx doctor",
    "check:ui": "node scripts/check-ui.mjs"
  }
}
```

실제 CLI 경로가 다르면 `node_modules/@astryxdesign/cli` 내부를 확인해서 동작하는 경로로 수정해줘.

---

## 5. pnpm workspace 설정

`pnpm-workspace.yaml`을 생성하거나 수정해줘.

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

---

## 6. TypeScript 공통 설정

루트에 `tsconfig.base.json`을 생성해줘.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "@repo/ui": ["packages/ui/src/index.ts"],
      "@repo/ui/*": ["packages/ui/src/*"],
      "@repo/theme": ["packages/theme/src/index.ts"],
      "@repo/theme/*": ["packages/theme/src/*"]
    }
  }
}
```

각 패키지의 `tsconfig.json`은 이 설정을 extend하게 해줘.

---

## 7. theme 패키지 구성

`packages/theme` 패키지를 만들어줘.

### `packages/theme/package.json`

```json
{
  "name": "@repo/theme",
  "version": "0.1.0",
  "private": true,
  "sideEffects": ["*.css", "src/*.css"],
  "exports": {
    ".": "./src/index.ts",
    "./base.css": "./src/base.css",
    "./theme-soyo.css": "./src/theme-soyo.css",
    "./globals.css": "./src/globals.css"
  }
}
```

### `packages/theme/src/base.css`

Astryx 기본 CSS import를 모아줘.

```css
@import '@astryxdesign/core/reset.css';
@import '@astryxdesign/core/astryx.css';
@import '@astryxdesign/theme-neutral/theme.css';
```

실제 패키지 경로가 다르면 패키지 내부를 확인해서 수정해줘.

### `packages/theme/src/theme-soyo.css`

브랜드 테마 오버라이드용 CSS 파일을 만들어줘.

하드코딩 스타일을 많이 넣기보다, CSS custom properties 중심으로 구성해줘.
Astryx에서 제공하는 실제 토큰명을 CLI 또는 문서로 확인한 뒤, 가능한 실제 토큰명에 맞춰 작성해줘.

예시:

```css
:root {
  --soyo-color-brand: #111111;
  --soyo-color-surface: #ffffff;
  --soyo-color-muted: #f6f6f3;
  --soyo-color-text: #111111;
  --soyo-color-text-muted: #666666;

  --soyo-radius-sm: 6px;
  --soyo-radius-md: 10px;
  --soyo-radius-lg: 16px;

  --soyo-space-page-x: 24px;
  --soyo-space-section-y: 72px;
}

[data-theme='dark'] {
  --soyo-color-surface: #111111;
  --soyo-color-muted: #1c1c1c;
  --soyo-color-text: #f5f5f5;
  --soyo-color-text-muted: #aaaaaa;
}
```

### `packages/theme/src/globals.css`

```css
@import './base.css';
@import './theme-soyo.css';

html,
body {
  min-height: 100%;
}

body {
  margin: 0;
}
```

### `packages/theme/src/index.ts`

```ts
export {};
```

---

## 8. ui 패키지 구성

`packages/ui` 패키지를 만들어줘.

### `packages/ui/package.json`

```json
{
  "name": "@repo/ui",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "sideEffects": ["*.css"],
  "exports": {
    ".": "./src/index.ts"
  },
  "dependencies": {
    "@astryxdesign/core": "workspace:*",
    "@repo/theme": "workspace:*"
  },
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  }
}
```

단, `@astryxdesign/core`를 workspace dependency로 잡는 게 안 맞으면 일반 dependency 방식으로 조정해줘.

### `packages/ui/src/providers/AppUIProvider.tsx`

```tsx
import type { ReactNode } from 'react';
import '@repo/theme/globals.css';

export type AppUIProviderProps = {
  children: ReactNode;
};

export function AppUIProvider({ children }: AppUIProviderProps) {
  return <>{children}</>;
}
```

### Astryx 컴포넌트 re-export

`packages/ui/src/index.ts`에서 Astryx 컴포넌트를 re-export해줘.

단, 아래 import 경로는 예시다. 반드시 실제 설치된 Astryx export를 확인해서 동작하는 컴포넌트만 re-export해야 한다.

우선순위 컴포넌트:

* Button
* Card
* Dialog
* Table
* TextInput 또는 Input
* TextArea
* Select
* Checkbox
* Radio
* Switch
* Badge
* Avatar
* Tabs
* Toast
* Tooltip
* Navigation 관련 컴포넌트
* Layout 관련 컴포넌트
* Chat 관련 컴포넌트

예시:

```ts
export { AppUIProvider } from './providers/AppUIProvider';

export { PageHeader } from './components/PageHeader';
export { EmptyState } from './components/EmptyState';
export { StatCard } from './components/StatCard';
export { AppShell } from './components/AppShell';

export { LandingPattern } from './patterns/LandingPattern';
export { AdminDashboardPattern } from './patterns/AdminDashboardPattern';
export { TablePagePattern } from './patterns/TablePagePattern';
export { DetailPagePattern } from './patterns/DetailPagePattern';
export { FormWizardPattern } from './patterns/FormWizardPattern';
export { AIChatPattern } from './patterns/AIChatPattern';

// Astryx re-export는 실제 export 확인 후 추가
// export { Button } from '@astryxdesign/core/Button';
// export { Card } from '@astryxdesign/core/Card';
```

중요:
컴포넌트 prop을 임의로 추측하지 말고, `pnpm astryx component <ComponentName>` 또는 패키지 타입 정의를 확인한 뒤 사용해줘.

---

## 9. 커스텀 공용 컴포넌트

Astryx 원본 컴포넌트를 조합해서 아래 공용 컴포넌트를 만들어줘.

### 9-1. PageHeader

목적: 페이지 제목, 설명, 액션 버튼 영역.

Props:

```ts
type PageHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: React.ReactNode;
};
```

### 9-2. EmptyState

목적: 데이터가 없을 때 표시.

Props:

```ts
type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};
```

### 9-3. StatCard

목적: 관리자 대시보드 지표 카드.

Props:

```ts
type StatCardProps = {
  label: string;
  value: string;
  description?: string;
  trend?: string;
};
```

### 9-4. AppShell

목적: 사이드바/상단바/본문 레이아웃.

Props:

```ts
type AppShellProps = {
  title?: string;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
};
```

Astryx Layout 컴포넌트가 있으면 우선 사용하고, 없으면 semantic HTML과 CSS className으로 안전하게 구현해줘.

---

## 10. patterns 구성

`packages/ui/src/patterns`에 실무형 패턴 컴포넌트를 만들어줘.

### 10-1. LandingPattern

구성:

* Hero
* Feature Grid
* Use Case Section
* CTA Section
* Footer

용도:

* 병원 홈페이지
* 케이터링 홈페이지
* 서비스 소개 페이지
* MVP 랜딩 페이지

### 10-2. AdminDashboardPattern

구성:

* AppShell
* PageHeader
* StatCard 3~4개
* 최근 활동 리스트
* 빠른 액션 영역

### 10-3. TablePagePattern

구성:

* PageHeader
* 검색 input
* 필터 영역
* table
* pagination placeholder

### 10-4. DetailPagePattern

구성:

* PageHeader
* 메타 정보 카드
* 본문 영역
* 사이드 액션 영역

### 10-5. FormWizardPattern

구성:

* 단계 표시
* 입력 폼
* 이전/다음 버튼
* 완료 CTA

### 10-6. AIChatPattern

구성:

* 채팅 레이아웃
* 메시지 리스트
* 입력 composer
* 도구 호출/상태 표시 placeholder

Astryx에 Chat 관련 컴포넌트가 실제로 있으면 사용하고, 없으면 fallback UI로 구현해줘.

---

## 11. playground-next 앱 구성

`apps/playground-next`에서 `@repo/ui`를 실제로 사용하도록 연결해줘.

### layout

`app/layout.tsx`에서 `AppUIProvider`를 적용해줘.

```tsx
import type { ReactNode } from 'react';
import { AppUIProvider } from '@repo/ui';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <AppUIProvider>{children}</AppUIProvider>
      </body>
    </html>
  );
}
```

### 메인 페이지

`app/page.tsx`는 디자인 시스템 인덱스 페이지로 구성해줘.

포함 내용:

* Astryx UI Kit 소개
* 주요 링크

  * `/examples/landing`
  * `/examples/admin`
  * `/examples/table`
  * `/examples/detail`
  * `/examples/form`
  * `/examples/chat`
* 현재 레포 사용 방식 안내
* “신규 프로젝트에 적용하는 방법” 요약

### 예제 페이지

아래 경로를 만들어 각각 pattern을 렌더링해줘.

```txt
/examples/landing
/examples/admin
/examples/table
/examples/detail
/examples/form
/examples/chat
```

---

## 12. templates 패키지 구성

`packages/templates`에는 복사 가능한 페이지 템플릿을 둔다.

각 폴더마다 다음을 포함해줘.

```txt
page.tsx
README.md
```

각 README에는 아래 내용을 포함한다.

* 템플릿 목적
* 사용하기 좋은 프로젝트 유형
* 필요한 import
* 커스터마이징 포인트
* 주의사항

우선 아래 템플릿을 만든다.

1. `landing`
2. `admin-dashboard`
3. `table-page`
4. `detail-page`
5. `form-wizard`
6. `ai-chat`

템플릿은 너무 복잡하게 만들지 말고, 바로 복사해서 프로젝트 페이지로 사용할 수 있는 수준으로 구성해줘.

---

## 13. AGENTS.md 작성

루트에 `AGENTS.md`를 만들어줘.

목적은 Codex 같은 AI 코딩 도구가 이 레포에서 UI 작업을 할 때 Astryx의 실제 컴포넌트/prop을 확인하고 작업하도록 강제하는 것이다.

포함할 내용:

````md
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
````

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

````

---

## 14. scripts 구성

### `scripts/print-astryx-info.mjs`

Astryx CLI 또는 package metadata를 확인하는 스크립트를 만들어줘.

역할:

- 설치된 `@astryxdesign/core` 버전 출력
- 설치된 `@astryxdesign/cli` 버전 출력
- 사용할 수 있는 주요 명령어 안내

### `scripts/check-ui.mjs`

간단한 doctor 스크립트.

확인 항목:

- `packages/ui/src/index.ts` 존재 여부
- `packages/theme/src/globals.css` 존재 여부
- `apps/playground-next/app/layout.tsx`에서 `AppUIProvider` 사용 여부
- `AGENTS.md` 존재 여부
- `pnpm-workspace.yaml` 존재 여부

문제가 있으면 process exit code 1을 반환해줘.

---

## 15. README.md 작성

루트 README를 한국어로 작성해줘.

포함할 내용:

1. 프로젝트 소개
2. 왜 Astryx를 직접 쓰지 않고 `@repo/ui`로 감싸는지
3. 설치 방법
4. 개발 서버 실행
5. 패키지 구조
6. 신규 프로젝트 적용 방법
7. 기존 프로젝트 적용 방법
8. 테마 수정 방법
9. 템플릿 사용 방법
10. Codex 작업 규칙
11. 브라우저 호환성 주의사항
12. 향후 TODO

README 예시 방향:

```md
# Astryx UI Kit

Meta의 Astryx 디자인 시스템을 기반으로 만든 재사용 가능한 UI 시스템 레포입니다.

이 레포는 Astryx를 프로젝트마다 직접 설치하고 사용하는 대신, `@repo/ui`, `@repo/theme`, `templates` 계층을 통해 어떤 프로젝트에서도 일관된 UI 기반을 재사용할 수 있게 하는 것을 목표로 합니다.
````

---

## 16. 구현 시 중요한 원칙

### 16-1. Astryx API를 추측하지 말 것

Astryx는 아직 Beta일 수 있으므로 import path, component prop, template 명령어가 변경될 수 있다.

따라서 아래 순서로 확인해줘.

1. `node_modules/@astryxdesign/core` 내부 export 확인
2. `pnpm astryx component` 실행 가능 여부 확인
3. 타입 정의 확인
4. 실제 build 통과 여부 확인

확실하지 않은 컴포넌트는 무리하게 re-export하지 말고 주석으로 TODO 처리해줘.

### 16-2. 너무 많은 wrapper를 만들지 말 것

모든 Astryx 컴포넌트를 감싸지 말고, 우선 아래 수준만 안정화한다.

* Provider
* PageHeader
* EmptyState
* StatCard
* AppShell
* 6개 Pattern
* 주요 Astryx 컴포넌트 re-export

### 16-3. 실무형 사용성을 우선할 것

이 레포는 예쁜 데모보다 실무 재사용성이 중요하다.

따라서 예제 페이지는 다음 프로젝트에 바로 응용 가능해야 한다.

* 홈페이지 제작
* 병원/로컬 비즈니스 홈페이지
* 케이터링/서비스 소개 페이지
* 내부 관리자 페이지
* 데이터 테이블 페이지
* AI 챗봇 UI
* MVP 랜딩 페이지

### 16-4. App code에서는 Astryx 직접 import 금지

앱에서는 `@repo/ui`를 통해 가져오도록 구성한다.

좋은 예:

```tsx
import { PageHeader, StatCard } from '@repo/ui';
```

나쁜 예:

```tsx
import { Button } from '@astryxdesign/core/Button';
```

단, `packages/ui` 내부에서는 Astryx 직접 import 허용.

---

## 17. 완료 기준

작업 완료 후 아래 상태가 되어야 한다.

1. `pnpm install`이 정상 동작한다.
2. `pnpm dev`로 playground-next가 실행된다.
3. `/` 페이지에서 디자인 시스템 소개가 보인다.
4. `/examples/landing` 페이지가 보인다.
5. `/examples/admin` 페이지가 보인다.
6. `/examples/table` 페이지가 보인다.
7. `/examples/detail` 페이지가 보인다.
8. `/examples/form` 페이지가 보인다.
9. `/examples/chat` 페이지가 보인다.
10. `packages/ui`에서 공용 컴포넌트를 export한다.
11. `packages/theme`에서 Astryx 기본 CSS와 커스텀 테마 CSS를 관리한다.
12. `AGENTS.md`가 생성되어 AI 작업 규칙이 정리되어 있다.
13. `README.md`에 사용법이 한국어로 정리되어 있다.
14. `pnpm typecheck`가 통과한다.
15. `pnpm build`가 통과한다.
16. `pnpm check:ui`가 통과한다.

---

## 18. 작업 결과 보고 형식

작업이 끝나면 아래 형식으로 요약해줘.

````md
## 작업 완료 요약

### 생성/수정한 주요 파일

- ...
- ...

### 구현된 기능

- ...
- ...

### 실행 방법

```bash
pnpm install
pnpm dev
````

### 확인할 페이지

* http://localhost:3000
* http://localhost:3000/examples/landing
* http://localhost:3000/examples/admin
* http://localhost:3000/examples/table
* http://localhost:3000/examples/detail
* http://localhost:3000/examples/form
* http://localhost:3000/examples/chat

### 주의사항

* ...

```

---

## 19. 우선순위

시간이 부족하거나 Astryx API 확인이 어려운 경우 아래 우선순위로 진행해줘.

1. pnpm workspace 구성
2. Next.js playground 실행 가능 상태
3. `packages/theme` 구성
4. `packages/ui` Provider와 기본 컴포넌트 구성
5. 예제 페이지 6개 구성
6. `AGENTS.md` 작성
7. `README.md` 작성
8. Astryx 실제 컴포넌트 re-export 확장
9. CLI helper scripts 추가

완벽한 컴포넌트 래핑보다, 우선 **실행 가능한 구조와 재사용 가능한 기반**을 만드는 것이 더 중요하다.
```
