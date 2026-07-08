# Astryx UI Kit

Meta의 Astryx 디자인 시스템을 기반으로 만든 재사용 가능한 UI 시스템 레포입니다.

이 레포는 Astryx를 프로젝트마다 직접 설치하고 사용하는 대신, `@repo/ui`, `@repo/theme`, `templates` 계층을 통해 어떤 프로젝트에서도 일관된 UI 기반을 재사용할 수 있게 하는 것을 목표로 합니다.

## 왜 `@repo/ui`로 감싸는가

- 앱 코드에서 Astryx의 import path와 prop 변경 영향을 줄입니다.
- 공용 컴포넌트와 패턴의 API를 내부 기준으로 안정화합니다.
- 테마 토큰, spacing, radius, surface 스타일을 한 곳에서 관리합니다.
- Codex 같은 AI 에이전트가 Astryx prop을 추측하지 않도록 작업 규칙을 고정합니다.

## 설치

```bash
pnpm install
```

Astryx 패키지를 사용할 수 있는 registry가 설정되어 있다면 다음을 추가로 실행합니다.

```bash
pnpm add -w @astryxdesign/core @astryxdesign/theme-neutral
pnpm add -Dw @astryxdesign/cli
pnpm astryx
```

설치 후 `node_modules/@astryxdesign/core`의 exports와 타입 정의를 확인한 뒤 `packages/ui/src/index.ts`에 검증된 컴포넌트만 re-export하세요.

## 개발 서버

```bash
pnpm dev
```

기본 앱은 `http://localhost:3000`에서 실행됩니다.

## 패키지 구조

- `apps/playground-next`: Next.js 기반 playground 앱
- `packages/ui`: 안정적인 공용 컴포넌트와 실무형 pattern
- `packages/theme`: 전역 CSS, 브랜드 토큰, theme override
- `packages/templates`: 복사 가능한 페이지 템플릿
- `scripts`: Astryx 정보 출력과 UI 구조 검증 스크립트

## 신규 프로젝트 적용

1. `@repo/ui`와 `@repo/theme` 패키지를 workspace에 연결합니다.
2. Next.js root layout에서 `@repo/theme/globals.css`를 import합니다.
3. root layout에서 `AppUIProvider`로 앱을 감쌉니다.
4. 페이지 구현은 `@repo/ui`의 component와 pattern부터 사용합니다.

## 기존 프로젝트 적용

기존 앱에서는 `packages/theme`만 먼저 연결해 토큰과 CSS 변수를 적용할 수 있습니다. 이후 반복되는 page header, empty state, dashboard, table, form, chat UI를 `@repo/ui`로 점진 이전합니다.

## 테마 수정

브랜드 컬러, surface, text, radius, spacing은 `packages/theme/src/theme-soyo.css`에서 수정합니다. Astryx CSS 경로가 확인되면 `packages/theme/src/base.css`에 공식 CSS import를 추가합니다.

## 템플릿 사용

`packages/templates/*/page.tsx`를 프로젝트의 Next.js route로 복사하고, README의 목적과 커스터마이징 포인트를 확인합니다. 템플릿은 복잡한 상태 관리 없이 바로 붙여 넣을 수 있는 수준으로 유지합니다.

## Codex 작업 규칙

상세 규칙은 `AGENTS.md`에 있습니다. 핵심은 앱 코드에서 Astryx를 직접 import하지 않고, 익숙하지 않은 Astryx 컴포넌트는 CLI나 타입 정의로 먼저 확인하는 것입니다.

## 브라우저 호환성

popover, menu, tooltip, complex navigation 같은 계층형 컴포넌트는 Astryx가 최신 브라우저 API에 의존할 수 있습니다. 병원, 로컬 비즈니스 같은 공개 웹사이트에 적용하기 전 지원 브라우저를 확인하세요.

## 향후 TODO

- 실제 Astryx package exports 확인 후 `@repo/ui` re-export 확장
- Astryx theme-neutral CSS import 활성화
- eslint 구성 추가
- 각 pattern의 접근성/keyboard interaction 테스트 확장
