import { useEffect, useRef } from 'react';
import SubPageHero from '../components/SubPageHero';
import '../styles/project.css';
import '../styles/technology.css';

const techSubNav = [
  { label: 'Technology', path: '/technology' },
  { label: 'Roadmap', path: '/technology/roadmap' },
];

const coreTech = [
  {
    icon: '🌿',
    title: 'AI 정밀 재배',
    subtitle: 'Smart Farm',
    desc: '작물별 최적 생육 조건을 자동으로 학습하고 제어하는 AI 알고리즘으로, 기능성 성분 함량을 극대화합니다.',
    tags: ['생육 데이터 분석', 'Auto-Learning', '환경 제어', '성분 최적화'],
  },
  {
    icon: '⚗️',
    title: '바이오 추출·정제',
    subtitle: 'Bio Extraction',
    desc: '산업용 추출 농축 장비를 활용하여 천연물에서 고순도 기능성 성분을 분리·정제합니다.',
    tags: ['추출 농축', '성분 분석', 'GMP 공정', '품질 관리'],
  },
  {
    icon: '📊',
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
  { icon: '🔬', title: 'AI 생육 알고리즘', desc: '작물별 최적 환경 자동학습 기술 특허' },
  { icon: '⚙️', title: '추출 공정 기술', desc: 'GMP 수준 천연물 추출·농축 공정 노하우' },
  { icon: '📋', title: '개별인정형 원료', desc: '건강기능식품 원료 등재 및 인증' },
  { icon: '🛡️', title: 'IP 디딤돌', desc: '원천 기술 기반 특허 포트폴리오 구축' },
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
          <div className="tech-core-grid">
            {coreTech.map((tech, i) => (
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
          <div className="ip-grid">
            {ipStrategy.map((item, i) => (
              <div key={i} className="ip-card" ref={addRef}>
                <div className="ip-icon">{item.icon}</div>
                <h3 className="ip-title">{item.title}</h3>
                <p className="ip-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
