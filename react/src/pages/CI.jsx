import { useEffect, useRef } from 'react';
import SubPageHero from '../components/SubPageHero';
import '../styles/ci.css';

const aboutSubNav = [
  { label: 'Vision & Mission', path: '/about/vision-mission' },
  { label: 'CI', path: '/about/ci' },
  { label: 'History', path: '/about/history' },
  { label: 'Organization', path: '/about/organization' },
];

const colorsData = [
  {
    className: 'color-green',
    label: 'Green',
    name: 'Green (Primary)',
    hex: '#2C7A2C',
    rgb: 'RGB(44, 122, 44)',
    description: '자연과 생명, 스마트팜의 정밀 재배를 상징하는 메인 컬러',
  },
  {
    className: 'color-blue',
    label: 'Blue',
    name: 'Blue (Secondary)',
    hex: '#0F4C75',
    rgb: 'RGB(15, 76, 117)',
    description: '기술과 신뢰, 바이오 사이언스의 정밀함을 나타내는 보조 컬러',
  },
];

const fontsData = [
  {
    name: 'Primary Font - Pretendard',
    family: "'Pretendard', sans-serif",
    large: '바이오 소재의 미래',
    medium: '스마트팜에서 시작하는 고기능성 천연 원료',
    small: 'COREX는 AI 정밀 농업과 바이오 추출 기술을 융합하여 의료·제약·화장품 분야의 핵심 원료를 개발합니다.',
  },
  {
    name: 'Secondary Font - Inter',
    family: "'Inter', sans-serif",
    large: 'From Farm to Bio-Material',
    medium: 'Smart Farm × Bio Extraction Technology',
    small: 'We cultivate functional crops through AI-driven precision farming and supply high-purity bio-materials to the medical, pharmaceutical, and cosmetic industries.',
  },
];

export default function CI() {
  const animRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    animRef.current.forEach((el) => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !animRef.current.includes(el)) {
      animRef.current.push(el);
    }
  };

  return (
    <>
      <SubPageHero
        category="about"
        title="About"
        currentPage="CI"
        breadcrumbParent={{ label: 'About', path: '/about/vision-mission' }}
        subNavItems={aboutSubNav}
      />

      {/* Brand Story + Symbol Mark */}
      <section className="ci-section section">
        <div className="container">
          <div className="brand-story" ref={addRef}>
            <h2 className="section-title">브랜드 스토리</h2>
            <p>
              COREX의 브랜드 아이덴티티는 <strong>스마트팜 정밀 농업</strong>과
              <strong> 바이오 추출 기술</strong>의 융합을 표현합니다.
            </p>
            <p>
              자연의 생명력을 상징하는 그린 컬러와 바이오 사이언스의 정밀함을 나타내는 블루 컬러가
              우리의 핵심 가치를 시각적으로 전달합니다.
            </p>
          </div>

          <h2>심볼 마크</h2>
          <div className="symbol-mark-display" ref={addRef}>
            <div className="logo-box logo-light">
              <div className="ci-logo-text">COREX</div>
            </div>
            <div className="logo-box logo-dark">
              <div className="ci-logo-text">COREX</div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Slogan */}
      <section className="ci-section">
        <div className="container">
          <div className="slogan-section" ref={addRef}>
            <div className="slogan-main">
              From Farm<br />to Bio-Material
            </div>
            <div className="slogan-sub">
              스마트팜에서 시작해, 바이오 소재의 미래를 만듭니다
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="ci-section section">
        <div className="container">
          <h2>메인 컬러</h2>
          <div className="color-grid">
            {colorsData.map((color, i) => (
              <div key={i} className="color-item" ref={addRef}>
                <div className={`color-sample ${color.className}`}>{color.label}</div>
                <div className="color-info">
                  <p><strong>컬러명:</strong> {color.name}</p>
                  <p><strong>HEX:</strong> {color.hex}</p>
                  <p><strong>RGB:</strong> {color.rgb}</p>
                  <p><strong>설명:</strong> {color.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="ci-section section">
        <div className="container">
          <h2 className="section-title">타이포그래피</h2>
          <div className="typography-section">
            {fontsData.map((font, i) => (
              <div key={i} className="font-showcase" ref={addRef}>
                <div className="font-display">
                  <div className="font-name">{font.name}</div>
                  <div className="font-sample-large" style={{ fontFamily: font.family }}>
                    {font.large}
                  </div>
                  <div className="font-sample-medium" style={{ fontFamily: font.family }}>
                    {font.medium}
                  </div>
                  <div className="font-sample-small" style={{ fontFamily: font.family }}>
                    {font.small}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
