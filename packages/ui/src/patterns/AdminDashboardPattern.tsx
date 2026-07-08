import { AppShell } from '../components/AppShell';
import { PageHeader } from '../components/PageHeader';
import { StatCard } from '../components/StatCard';

const activities = ['신규 예약 12건 접수', '상담 대기 4건 SLA 초과 위험', '결제 실패 2건 재시도 필요'];

export function AdminDashboardPattern() {
  return (
    <AppShell
      title="Operations"
      sidebar={
        <nav className="ui-nav" aria-label="Admin sections">
          <a href="/examples/admin">Dashboard</a>
          <a href="/examples/table">Customers</a>
          <a href="/examples/form">Intake</a>
          <a href="/examples/chat">AI Desk</a>
        </nav>
      }
    >
      <PageHeader
        eyebrow="Admin dashboard"
        title="오늘 처리해야 할 운영 흐름"
        description="지표, 활동, 빠른 액션을 한 화면에서 스캔하는 내부 관리자 패턴입니다."
        actions={<button className="ui-button">리포트 내보내기</button>}
      />
      <div className="ui-grid ui-grid--4">
        <StatCard label="예약" value="128" trend="+12%" description="지난 7일 대비" />
        <StatCard label="매출" value="₩42.8M" trend="+8%" description="확정 결제 기준" />
        <StatCard label="대기" value="17" trend="-5" description="담당자 배정 필요" />
        <StatCard label="만족도" value="4.8" trend="+0.2" description="최근 리뷰 평균" />
      </div>
      <section className="ui-two-column">
        <article className="ui-panel">
          <h2>최근 활동</h2>
          <ul className="ui-list">
            {activities.map((activity) => <li key={activity}>{activity}</li>)}
          </ul>
        </article>
        <article className="ui-panel">
          <h2>빠른 액션</h2>
          <div className="ui-stack">
            <button className="ui-button">예약 생성</button>
            <button className="ui-button ui-button--secondary">고객 세그먼트 보기</button>
            <button className="ui-button ui-button--secondary">AI 응답 검토</button>
          </div>
        </article>
      </section>
    </AppShell>
  );
}
