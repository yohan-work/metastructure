import { PageHeader } from '../components/PageHeader';

const features = [
  '예약, 문의, 전환 흐름을 한 화면에서 설명',
  '브랜드 토큰 기반으로 업종별 색상만 교체',
  '섹션 단위 복사로 병원, 케이터링, SaaS 랜딩에 재사용'
];

export function LandingPattern() {
  return (
    <main className="pattern-page">
      <section className="landing-hero">
        <div>
          <p className="ui-eyebrow">Reusable landing system</p>
          <h1>서비스의 첫인상을 빠르게 출시하는 랜딩 패턴</h1>
          <p>
            Astryx 연결을 전제로 한 공용 UI 계층입니다. 실제 프로젝트에서는 문구와 토큰만 바꿔
            지역 비즈니스, 병원, 예약형 서비스에 바로 적용할 수 있습니다.
          </p>
          <div className="ui-action-row">
            <a className="ui-button" href="#features">기능 보기</a>
            <a className="ui-button ui-button--secondary" href="#contact">템플릿 복사</a>
          </div>
        </div>
        <div className="landing-hero__panel" aria-label="서비스 지표 예시">
          <span>Monthly leads</span>
          <strong>1,284</strong>
          <small>예약 문의 전환율 +18%</small>
        </div>
      </section>

      <section id="features" className="ui-section">
        <PageHeader
          eyebrow="Pattern blocks"
          title="랜딩 페이지 기본 블록"
          description="hero, feature grid, use case, CTA, footer 흐름을 보존합니다."
        />
        <div className="ui-grid ui-grid--3">
          {features.map((feature) => (
            <article className="ui-feature" key={feature}>
              <h2>{feature}</h2>
              <p>토큰 기반 spacing과 surface 스타일로 다른 브랜드에도 같은 구조를 유지합니다.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ui-band">
        <div>
          <p className="ui-eyebrow">Use cases</p>
          <h2>병원 홈페이지, 케이터링 소개, MVP 랜딩에 맞는 밀도</h2>
        </div>
        <p>
          복잡한 마케팅 페이지보다 반복 제작에 필요한 정보 구조를 우선합니다. 첫 화면에서
          서비스명, 핵심 이점, 행동 유도, 신뢰 지표가 바로 보이도록 설계했습니다.
        </p>
      </section>

      <section id="contact" className="ui-cta">
        <h2>새 프로젝트에는 `@repo/ui` 패턴을 먼저 가져오세요.</h2>
        <a className="ui-button" href="/">디자인 시스템 홈</a>
      </section>
    </main>
  );
}
