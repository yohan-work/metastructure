import { PageHeader } from '../components/PageHeader';

const rows = [
  ['S-1048', '강남 소요클리닉', '온보딩', '오늘'],
  ['S-1047', '오크 케이터링', '견적 검토', '어제'],
  ['S-1046', '하우스 스튜디오', '활성', '2일 전'],
  ['S-1045', '노스랩', '보류', '5일 전']
];

export function TablePagePattern() {
  return (
    <main className="pattern-page">
      <PageHeader
        eyebrow="Data table"
        title="고객과 상태를 빠르게 찾는 테이블"
        description="검색, 필터, 상태, 페이지네이션 placeholder를 포함한 업무형 목록 패턴입니다."
        actions={<button className="ui-button">새 항목</button>}
      />
      <section className="ui-toolbar">
        <input className="ui-input" placeholder="고객명 또는 ID 검색" aria-label="검색" />
        <select className="ui-input" aria-label="상태 필터" defaultValue="all">
          <option value="all">전체 상태</option>
          <option value="active">활성</option>
          <option value="pending">검토 중</option>
        </select>
      </section>
      <div className="ui-table-wrap">
        <table className="ui-table">
          <thead>
            <tr><th>ID</th><th>고객</th><th>상태</th><th>최근 변경</th></tr>
          </thead>
          <tbody>
            {rows.map(([id, name, status, updated]) => (
              <tr key={id}><td>{id}</td><td>{name}</td><td>{status}</td><td>{updated}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer className="ui-pagination">1-4 of 48 · 이전 · 다음</footer>
    </main>
  );
}
