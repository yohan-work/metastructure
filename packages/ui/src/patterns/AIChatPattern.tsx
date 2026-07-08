const messages = [
  ['user', '이번 주 예약 취소율이 높은 이유를 요약해줘.'],
  ['assistant', '화요일 오후 시간대에 일정 변경 요청이 집중됐습니다. 날씨 알림과 리마인더 발송 시간이 겹친 것이 주요 원인으로 보입니다.']
];

export function AIChatPattern() {
  return (
    <main className="chat-pattern">
      <section className="chat-panel">
        <header className="chat-panel__header">
          <div>
            <p className="ui-eyebrow">AI chat</p>
            <h1>운영 데이터 어시스턴트</h1>
          </div>
          <span className="ui-status">tool ready</span>
        </header>
        <div className="chat-messages" aria-live="polite">
          {messages.map(([role, message]) => (
            <article className={`chat-message chat-message--${role}`} key={message}>
              <span>{role}</span>
              <p>{message}</p>
            </article>
          ))}
          <article className="chat-tool">
            <strong>tool_call: reservation_summary</strong>
            <p>최근 7일 예약, 취소, 리마인더 로그를 조회했습니다.</p>
          </article>
        </div>
        <form className="chat-composer">
          <input className="ui-input" placeholder="질문을 입력하세요" aria-label="AI 질문" />
          <button className="ui-button" type="button">전송</button>
        </form>
      </section>
    </main>
  );
}
