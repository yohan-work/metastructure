export function FormWizardPattern() {
  return (
    <main className="pattern-page pattern-page--narrow">
      <ol className="ui-steps" aria-label="Form steps">
        <li aria-current="step">1. 기본 정보</li>
        <li>2. 요구사항</li>
        <li>3. 확인</li>
      </ol>
      <form className="ui-form">
        <header>
          <p className="ui-eyebrow">Form wizard</p>
          <h1>프로젝트 접수</h1>
          <p>복사 가능한 intake form 구조입니다. 실제 프로젝트에서는 schema validation을 연결합니다.</p>
        </header>
        <label>
          회사 또는 서비스명
          <input className="ui-input" placeholder="예: Soyo Clinic" />
        </label>
        <label>
          프로젝트 유형
          <select className="ui-input" defaultValue="landing">
            <option value="landing">랜딩 페이지</option>
            <option value="admin">관리자 도구</option>
            <option value="chat">AI 챗봇</option>
          </select>
        </label>
        <label>
          요청 사항
          <textarea className="ui-input" rows={5} placeholder="목표, 페이지 수, 필요한 기능을 적어주세요." />
        </label>
        <div className="ui-action-row ui-action-row--between">
          <button className="ui-button ui-button--secondary" type="button">이전</button>
          <button className="ui-button" type="button">다음</button>
        </div>
      </form>
    </main>
  );
}
