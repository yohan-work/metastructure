# AI Chat Template

## 목적

메시지 리스트, composer, tool call 상태를 포함한 AI 챗봇 UI입니다.

## 사용하기 좋은 프로젝트 유형

운영 데이터 assistant, 고객 응대 챗봇, 내부 지식 검색 UI에 적합합니다.

## 필요한 import

```tsx
import { AIChatPattern } from '@repo/ui';
```

## 커스터마이징 포인트

메시지 모델, streaming 상태, tool call UI, composer action을 실제 AI API에 맞게 교체합니다.

## 주의사항

사용자 입력과 tool 결과를 렌더링할 때 XSS 방지와 민감정보 노출 정책을 확인하세요.
