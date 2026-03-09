import { Link } from 'react-router-dom';
import '../styles/hero.css';

const IMGS = {
  brand:    '/image/COREX 공식 브랜드 로고 및 슬로건 (Core Technology. Infinite Expansion.).png',
  smartfarm: '/image/스마트팜(식물공장) 재배실 및 방진복 착용 작업 전경.png',
  multiwell: '/image/인큐베이터 앞 세포 배양용 멀티웰 플레이트(Multi-well plate) 확인 작업.png',
  lab:      '/image/첨단 분석배양 장비가 세팅된 코렉스(COREX) 메인 연구실 전경.png',
  rnd:      '/image/코렉스(COREX) 대형 R&D 센터 및 양산 공장 건물 외관.png',
  cleanroom: '/image/클린룸 내부 파일럿플랜트 스케일 대형 스테인리스 성분 추출 설비(반응조).png',
};

export default function Home() {
  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-background">
          <video className="hero-video" autoPlay muted loop playsInline>
            <source src="/background.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="hero-overlay"></div>

        <div className="hero-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        <div className="hero-tech-icons">
          <div className="tech-icon">🌿</div>
          <div className="tech-icon">⚗️</div>
          <div className="tech-icon">🧬</div>
          <div className="tech-icon">💎</div>
        </div>

        <div className="hero-content">
          <h1 className="hero-brand">COREX</h1>
          <p className="hero-slogan">
            From Farm to <span className="highlight">Bio-Material</span>
          </p>
          <p className="hero-description">
            AI 정밀 농업과 바이오 추출 기술을 융합하여<br />
            의료 · 제약 · 뷰티 산업의 핵심 원료를 만듭니다
          </p>
          <div className="hero-cta">
            <Link to="/about/vision-mission" className="hero-btn hero-btn-primary">
              프로젝트 보기
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
              </svg>
            </Link>
            <Link to="/technology" className="hero-btn hero-btn-secondary">
              기술 살펴보기
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </Link>
          </div>
        </div>

        <div className="hero-scroll" onClick={scrollToAbout}>
          <span className="hero-scroll-text">Scroll</span>
          <div className="hero-scroll-arrow"></div>
        </div>
      </section>

      {/* Smart Farm Section */}
      <section id="about" className="home-split section">
        <div className="home-split-img">
          <img src={IMGS.smartfarm} alt="스마트팜 재배실 — 방진복 착용 작업 전경" />
        </div>
        <div className="home-split-text">
          <span className="home-section-badge">Smart Farm</span>
          <h2>식물공장에서 시작되는<br />정밀 바이오 소재</h2>
          <p>
            COREX는 완전 제어형 식물공장에서 병풀, 바코파, 덴드로비움 등
            기능성 작물을 AI 알고리즘으로 최적 관리합니다.
            계절·환경에 구애받지 않는 안정적 원료 수급이 가능합니다.
          </p>
          <Link to="/technology" className="home-split-link">기술 상세 보기 →</Link>
        </div>
      </section>

      {/* Lab Section */}
      <section className="home-split home-split-reverse section">
        <div className="home-split-text">
          <span className="home-section-badge">Bio Research</span>
          <h2>첨단 분석·배양 장비를 갖춘<br />메인 연구실</h2>
          <p>
            GMP 수준의 추출·농축 공정과 분석 장비를 통해
            마데카소사이드, 바코사이드, 진세노사이드 등
            고기능성 성분을 고순도로 분리·정제합니다.
          </p>
          <Link to="/technology" className="home-split-link">R&D 상세 보기 →</Link>
        </div>
        <div className="home-split-img">
          <img src={IMGS.lab} alt="코렉스 메인 연구실 — 첨단 분석배양 장비" />
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="home-gallery section">
        <div className="container">
          <div className="home-gallery-header">
            <span className="home-section-badge">Infrastructure</span>
            <h2>COREX 시설 및 연구 현장</h2>
          </div>
          <div className="home-gallery-grid">
            <div className="home-gallery-item">
              <img src={IMGS.multiwell} alt="세포 배양 — 멀티웰 플레이트 확인 작업" />
              <div className="home-gallery-caption">세포 배양 연구</div>
            </div>
            <div className="home-gallery-item">
              <img src={IMGS.rnd} alt="코렉스 R&D 센터 및 양산 공장 외관" />
              <div className="home-gallery-caption">R&D 센터 & 양산 공장</div>
            </div>
            <div className="home-gallery-item">
              <img src={IMGS.cleanroom} alt="클린룸 — 파일럿 스케일 스테인리스 추출 설비" />
              <div className="home-gallery-caption">클린룸 추출 설비</div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
