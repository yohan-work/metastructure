# Detail Page Template

## 목적

상세 본문, 메타 정보, 사이드 액션을 분리한 상세 페이지입니다.

## 사용하기 좋은 프로젝트 유형

프로젝트 상세, 고객 상세, 티켓 상세, 콘텐츠 검토 화면에 적합합니다.

## 필요한 import

```tsx
import { DetailPagePattern } from '@repo/ui';
```

## 커스터마이징 포인트

요약 본문, 메타 정보, 액션 버튼, 상태 변경 흐름을 도메인에 맞게 교체합니다.

## 주의사항

상태 변경 같은 mutation은 권한 확인과 optimistic UI 실패 처리를 함께 설계하세요.
