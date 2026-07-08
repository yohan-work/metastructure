# Admin Dashboard Template

## 목적

지표, 최근 활동, 빠른 액션을 한 화면에서 확인하는 내부 운영 대시보드입니다.

## 사용하기 좋은 프로젝트 유형

예약 관리, CRM, 결제 운영, 내부 업무 콘솔에 적합합니다.

## 필요한 import

```tsx
import { AdminDashboardPattern } from '@repo/ui';
```

## 커스터마이징 포인트

StatCard 데이터, sidebar 링크, 최근 활동 목록, 빠른 액션 버튼을 실제 업무 흐름에 맞게 교체합니다.

## 주의사항

실제 데이터 연결 시 서버 컴포넌트에서 병렬 fetch를 우선 고려하세요.
