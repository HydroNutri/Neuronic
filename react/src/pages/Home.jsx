import { Link } from 'react-router-dom';
import '../styles/hero.css';

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

      {/* CTA Section */}
      <section id="about" className="team-cta section">
        <div className="container">
          <div className="cta-content">
            <h2>함께 미래를 만들어가세요</h2>
            <p>스마트팜에서 바이오 소재까지, COREX와 함께 새로운 가능성을 탐구해보세요</p>
            <div className="cta-buttons">
              <Link to="/faq/contact" className="btn btn-primary">Contact</Link>
              <Link to="/about/vision-mission" className="btn btn-outline">프로젝트 보기</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
