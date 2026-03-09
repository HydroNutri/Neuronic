import { useEffect, useRef } from 'react';
import SubPageHero from '../components/SubPageHero';
import '../styles/project.css';
import '../styles/technology.css';

const techSubNav = [
  { label: 'Technology', path: '/technology' },
  { label: 'Roadmap', path: '/technology/roadmap' },
];

const IconLeaf = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);

const IconFlask = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3h6M9 3v7L4 17a2 2 0 0 0 1.84 2.97h12.32A2 2 0 0 0 20 17L15 10V3"/>
    <path d="M6.5 17.5h11"/>
  </svg>
);

const IconChart = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="12" width="4" height="9"/>
    <rect x="10" y="7" width="4" height="14"/>
    <rect x="17" y="3" width="4" height="18"/>
    <path d="M3 21h18"/>
  </svg>
);

const IconAtom = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1"/>
    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z"/>
    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z"/>
  </svg>
);

const IconGear = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const IconClipboard = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1"/>
    <path d="m9 14 2 2 4-4"/>
  </svg>
);

const IconShield = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const coreTech = [
  {
    icon: <IconLeaf />,
    title: 'AI 정밀 재배',
    subtitle: 'Smart Farm',
    desc: '작물별 최적 생육 조건을 자동으로 학습하고 제어하는 AI 알고리즘으로, 기능성 성분 함량을 극대화합니다.',
    tags: ['생육 데이터 분석', 'Auto-Learning', '환경 제어', '성분 최적화'],
  },
  {
    icon: <IconFlask />,
    title: '바이오 추출·정제',
    subtitle: 'Bio Extraction',
    desc: '산업용 추출 농축 장비를 활용하여 천연물에서 고순도 기능성 성분을 분리·정제합니다.',
    tags: ['추출 농축', '성분 분석', 'GMP 공정', '품질 관리'],
  },
  {
    icon: <IconChart />,
    title: '데이터 플랫폼',
    subtitle: 'Data Platform',
    desc: '재배부터 추출까지 전 과정의 데이터를 수집·분석하여 생산 품질과 수율을 지속적으로 개선합니다.',
    tags: ['실시간 모니터링', '데이터 파이프라인', '품질 추적', '예측 모델'],
  },
];

const systemLayers = [
  { title: 'AI / Analytics', items: ['생육 예측 모델', '성분 함량 최적화', '이상 탐지'] },
  { title: 'IoT / Control', items: ['센서 네트워크', '자동 환경 제어', '데이터 수집'] },
  { title: 'Farm / Bio', items: ['기능성 작물 재배', '추출·농축 장비', '품질 분석'] },
];

const targetMaterials = [
  { crop: '병풀', material: '마데카소사이드', use: '상처 치료 · 피부 재생', color: '#16a34a' },
  { crop: '바코파', material: '바코사이드', use: '인지기능 개선 · 뇌 건강', color: '#8b5cf6' },
  { crop: '특수인삼', material: '진세노사이드', use: '면역력 · 활력 증진', color: '#dc2626' },
  { crop: '덴드로비움', material: '항노화 성분', use: '미백 · 항노화', color: '#ec4899' },
  { crop: '스테비아', material: '천연 감미료', use: '식품 · 건기식', color: '#f59e0b' },
  { crop: '워터렌틸', material: '식물성 단백질', use: '비건 식품 · 대체 단백', color: '#0ea5e9' },
];

const ipStrategy = [
  { icon: <IconAtom />, title: 'AI 생육 알고리즘', desc: '작물별 최적 환경 자동학습 기술 특허' },
  { icon: <IconGear />, title: '추출 공정 기술', desc: 'GMP 수준 천연물 추출·농축 공정 노하우' },
  { icon: <IconClipboard />, title: '개별인정형 원료', desc: '건강기능식품 원료 등재 및 인증' },
  { icon: <IconShield />, title: 'IP 디딤돌', desc: '원천 기술 기반 특허 포트폴리오 구축' },
];

export default function Technology() {
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
        category="technology"
        title="Technology"
        currentPage="Technology"
        breadcrumbParent={{ label: 'Technology', path: '/technology' }}
        subNavItems={techSubNav}
      />

      {/* Hero Statement */}
      <section className="tech-statement section">
        <div className="container">
          <p className="tech-label" ref={addRef}>OUR TECHNOLOGY</p>
          <h2 className="tech-headline" ref={addRef}>
            재배부터 추출까지,<br />
            <span className="tech-highlight">기술이 연결</span>합니다.
          </h2>
          <p className="tech-subtext" ref={addRef}>
            AI 정밀 농업으로 기능성 작물을 재배하고, 바이오 추출 기술로 고순도 원료를 생산합니다.
          </p>
        </div>
      </section>

      {/* Core Technologies */}
      <section className="tech-core section">
        <div className="container">
          <div className="tech-core-layout">
            <div className="tech-core-featured" ref={addRef}>
              <div className="tech-featured-left">
                <div className="tech-core-icon">{coreTech[0].icon}</div>
                <p className="tech-core-subtitle">{coreTech[0].subtitle}</p>
                <h3 className="tech-core-title">{coreTech[0].title}</h3>
                <p className="tech-core-desc">{coreTech[0].desc}</p>
              </div>
              <div className="tech-featured-right">
                <div className="tech-core-tags">
                  {coreTech[0].tags.map((tag, j) => (
                    <span key={j} className="tech-core-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="tech-core-secondary">
              {coreTech.slice(1).map((tech, i) => (
                <div key={i} className="tech-core-card" ref={addRef}>
                  <div className="tech-core-icon">{tech.icon}</div>
                  <p className="tech-core-subtitle">{tech.subtitle}</p>
                  <h3 className="tech-core-title">{tech.title}</h3>
                  <p className="tech-core-desc">{tech.desc}</p>
                  <div className="tech-core-tags">
                    {tech.tags.map((tag, j) => (
                      <span key={j} className="tech-core-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* System Architecture */}
      <section className="tech-architecture section">
        <div className="container">
          <h2 className="section-title">시스템 아키텍처</h2>
          <div className="system-diagram" ref={addRef}>
            <div className="diagram-content">
              {systemLayers.map((layer, i) => (
                <div key={i} className="diagram-layer">
                  <div className="layer-title">{layer.title}</div>
                  <div className="layer-items">
                    {layer.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Target Materials */}
      <section className="tech-materials section">
        <div className="container">
          <h2 className="section-title">타겟 작물 & 추출 성분</h2>
          <div className="materials-grid">
            {targetMaterials.map((item, i) => (
              <div key={i} className="material-card" ref={addRef} style={{ '--mat-color': item.color }}>
                <div className="material-crop">{item.crop}</div>
                <div className="material-name">{item.material}</div>
                <div className="material-use">{item.use}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IP & R&D Strategy */}
      <section className="tech-ip section">
        <div className="container">
          <h2 className="section-title">R&D & IP 전략</h2>
          <div className="ip-list" ref={addRef}>
            {ipStrategy.map((item, i) => (
              <div key={i} className="ip-row">
                <span className="ip-row-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="ip-row-icon">{item.icon}</span>
                <div className="ip-row-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
