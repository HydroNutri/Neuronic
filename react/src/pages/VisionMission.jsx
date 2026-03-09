import { useEffect, useRef } from 'react';
import SubPageHero from '../components/SubPageHero';
import '../styles/about.css';
import '../styles/team.css';
import '../styles/project.css';

const aboutSubNav = [
  { label: 'Vision & Mission', path: '/about/vision-mission' },
  { label: 'CI', path: '/about/ci' },
  { label: 'History', path: '/about/history' },
  { label: 'Organization', path: '/about/organization' },
];

const IconCrop = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);

const IconFlaskSm = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3h6M9 3v7L4 17a2 2 0 0 0 1.84 2.97h12.32A2 2 0 0 0 20 17L15 10V3"/>
    <path d="M6.5 17.5h11"/>
  </svg>
);

const IconSupply = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9h18M3 15h18M8 3v18M16 3v18"/>
    <rect x="3" y="3" width="18" height="18" rx="2"/>
  </svg>
);

const IconMedical = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <path d="M12 8v8M8 12h8"/>
  </svg>
);

const IconPharma = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="m10.5 20.5-7-7a5 5 0 1 1 7-7l7 7a5 5 0 1 1-7 7"/>
    <path d="m8.5 8.5 7 7"/>
  </svg>
);

const IconBeauty = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c0 0-7 7.5-7 12a7 7 0 0 0 14 0c0-4.5-7-12-7-12z"/>
  </svg>
);

const IconFood = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22V12"/>
    <path d="M12 12C12 7 17 4.5 20 4c0 4-2.5 8-8 8z"/>
    <path d="M12 12C12 7 7 4.5 4 4c0 4 2.5 8 8 8z"/>
  </svg>
);

const pipelineSteps = [
  { step: '01', icon: <IconCrop />, title: 'Smart Farm', subtitle: '정밀 재배', desc: 'AI 알고리즘 기반 기능성 작물 재배', items: ['병풀', '바코파', '특수인삼', '덴드로비움'] },
  { step: '02', icon: <IconFlaskSm />, title: 'Bio Extract', subtitle: '추출 · 정제', desc: 'GMP 수준 산업용 추출 농축 공정', items: ['마데카소사이드', '바코사이드', '진세노사이드'] },
  { step: '03', icon: <IconSupply />, title: 'B2B Supply', subtitle: '원료 공급', desc: '의료·뷰티·식품 산업 핵심 원료 납품', items: ['제약', '화장품', '의료기기', '건기식'] },
];

const applicationAreas = [
  { icon: <IconMedical />, title: '의료기기', desc: '하이드로겔, 스텐트 코팅, 바이오잉크, 임플란트 소재', color: '#ef4444' },
  { icon: <IconPharma />, title: '제약 · 건기식', desc: '인지기능 개선제, 면역 강화, 개별인정형 원료', color: '#8b5cf6' },
  { icon: <IconBeauty />, title: '화장품 · 뷰티', desc: '미백, 항노화, 피부 재생 천연 기능성 원료', color: '#ec4899' },
  { icon: <IconFood />, title: '푸드테크', desc: '식물성 단백질, 천연 감미료, 비건 식품 원료', color: '#f59e0b' },
];

const goalsPhases = [
  { number: '01', title: '스마트팜 구축 & 작물 재배', desc: '기능성 작물 정밀 재배 시스템 확립, AI 생육 알고리즘 개발', status: 'current', statusLabel: '진행 중' },
  { number: '02', title: '추출·정제 & 원료 개발', desc: '산업용 추출 농축 기술 확보, 개별인정형 원료 등재 및 특허 출원', status: 'upcoming', statusLabel: '예정' },
  { number: '03', title: 'B2B 원료 공급 & 사업 확장', desc: '제약·화장품·의료기기 기업 원료 납품 체계 구축, 글로벌 진출', status: 'future', statusLabel: '목표' },
];

const problemItems = [
  '천연물 원료의 품질 편차와 불안정한 공급망',
  '합성 소재 중심 의료·뷰티 산업의 안전성 우려',
  '고부가가치 바이오 소재의 높은 수입 의존도',
  '기능성 원료 R&D와 재배 기술 간의 단절',
];

const solutionItems = [
  { bold: '스마트팜 정밀 재배', text: ' — AI로 기능성 성분 함량 극대화' },
  { bold: '산업용 추출·농축', text: ' — GMP 수준 고순도 원료 확보' },
  { bold: '의료·뷰티 원료', text: ' — 차세대 바이오 소재 개발' },
  { bold: '건강기능식품', text: ' — 개별인정형 원료 등재' },
];

export default function VisionMission() {
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
        currentPage="Vision & Mission"
        breadcrumbParent={{ label: 'About', path: '/about/vision-mission' }}
        subNavItems={aboutSubNav}
      />

      {/* Hero Statement */}
      <section className="vm-statement section">
        <div className="container">
          <p className="vm-label" ref={addRef}>OUR VISION</p>
          <h2 className="vm-headline" ref={addRef}>
            스마트팜에서 시작해,<br />
            <span className="vm-highlight">바이오 소재</span>의 미래를 만듭니다.
          </h2>
          <p className="vm-subtext" ref={addRef}>
            COREX는 AI 정밀 농업과 바이오 추출 기술을 융합하여<br className="hide-mobile" />
            의료·제약·화장품·건강기능식품 분야의 핵심 원료를 개발합니다.
          </p>
        </div>
      </section>

      {/* Pipeline Flow */}
      <section className="vm-pipeline section">
        <div className="container">
          <div className="pipeline-table" ref={addRef}>
            {pipelineSteps.map((step, i) => (
              <div key={i} className="pipeline-row">
                <div className="pipeline-row-num">{step.step}</div>
                <div className="pipeline-row-main">
                  <div className="pipeline-row-header">
                    <span className="pipeline-row-icon">{step.icon}</span>
                    <div>
                      <h3 className="pipeline-row-title">{step.title}</h3>
                      <p className="pipeline-row-sub">{step.subtitle}</p>
                    </div>
                  </div>
                  <p className="pipeline-row-desc">{step.desc}</p>
                </div>
                <div className="pipeline-row-tags">
                  {step.items.map((item, j) => (
                    <span key={j} className="pipeline-tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Areas */}
      <section className="vm-applications section">
        <div className="container">
          <div className="app-layout">
            <div className="app-intro" ref={addRef}>
              <p className="vm-label">APPLICATION</p>
              <h2>응용 분야</h2>
              <p>COREX의 바이오 소재는 의료기기·제약·화장품·식품 전반에서 활용되는 고기능성 원료입니다.</p>
            </div>
            <div className="app-list" ref={addRef}>
              {applicationAreas.map((area, i) => (
                <div key={i} className="app-item" style={{ '--app-color': area.color }}>
                  <span className="app-item-icon">{area.icon}</span>
                  <div>
                    <h3>{area.title}</h3>
                    <p>{area.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="vm-roadmap section">
        <div className="container">
          <h2 className="section-title">사업 로드맵</h2>
          <div className="roadmap-timeline">
            {goalsPhases.map((phase, i) => (
              <div key={i} className="roadmap-phase" ref={addRef}>
                <div className="roadmap-number">{phase.number}</div>
                <div className="roadmap-content">
                  <h4>{phase.title}</h4>
                  <p>{phase.desc}</p>
                  <span className={`phase-status ${phase.status}`}>{phase.statusLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="vm-why section">
        <div className="container">
          <h2 className="section-title">왜 스마트팜 + 바이오 소재인가?</h2>
          <div className="why-content">
            <div className="why-text">
              <div className="problem-solution" ref={addRef}>
                <h3>산업의 과제</h3>
                <ul>
                  {problemItems.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="our-solution" ref={addRef}>
                <h3>COREX의 솔루션</h3>
                <ul>
                  {solutionItems.map((item, i) => (
                    <li key={i}><strong>{item.bold}</strong>{item.text}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
