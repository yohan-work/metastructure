import { PageHeader } from '../components/PageHeader';

export function DetailPagePattern() {
  return (
    <main className="pattern-page">
      <PageHeader
        eyebrow="Detail view"
        title="프로젝트 상세 정보"
        description="본문, 메타 정보, 사이드 액션을 분리해 반복 업무에 맞춘 상세 페이지입니다."
        actions={<button className="ui-button">수정</button>}
      />
      <section className="ui-detail-layout">
        <article className="ui-panel">
          <h2>요약</h2>
          <p>
            예약 전환 중심의 로컬 비즈니스 웹사이트를 구축합니다. 디자인 토큰과 패턴을
            재사용해 신규 지점 페이지를 빠르게 확장할 수 있게 합니다.
          </p>
          <h2>진행 메모</h2>
          <p>콘텐츠 승인 후 form wizard와 AI chat 연결 범위를 확정합니다.</p>
        </article>
        <aside className="ui-panel">
          <h2>메타 정보</h2>
          <dl className="ui-meta">
            <div><dt>담당</dt><dd>Ops Team</dd></div>
            <div><dt>상태</dt><dd>검토 중</dd></div>
            <div><dt>마감</dt><dd>2026-07-18</dd></div>
          </dl>
          <button className="ui-button ui-button--secondary">상태 변경</button>
        </aside>
      </section>
    </main>
  );
}
