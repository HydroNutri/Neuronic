import { useEffect, useRef } from 'react';
import SubPageHero from '../components/SubPageHero';
import '../styles/technology.css';

const techSubNav = [
  { label: 'Technology', path: '/technology' },
  { label: 'Roadmap', path: '/technology/roadmap' },
];

const roadmapPhases = [
  {
    number: '01',
    period: '2024 H2 – 2025 H1',
    title: '스마트팜 구축 & 팀 결성',
    status: 'done',
    statusLabel: '완료',
    milestones: [
      '연세대 창업보육센터 입주',
      'CEO · CTO · CSO 핵심 팀 구성',
      '기능성 작물 재배 연구 착수',
      'COREX 법인 설립',
    ],
  },
  {
    number: '02',
    period: '2025 H2',
    title: 'AI 정밀 재배 시스템 고도화',
    status: 'active',
    statusLabel: '진행 중',
    milestones: [
      '병풀 · 바코파 · 특수인삼 정밀 재배',
      'AI 생육 알고리즘 개발',
      '환경 자동 제어 시스템 구축',
      '생육 데이터 수집 · 분석 파이프라인',
    ],
  },
  {
    number: '03',
    period: '2026 H1',
    title: '추출 · 정제 공정 확립',
    status: 'upcoming',
    statusLabel: '예정',
    milestones: [
      '산업용 추출 농축 설비 도입',
      '마데카소사이드 · 바코사이드 원료화',
      'GMP 수준 품질 관리 체계',
      '개별인정형 원료 등재 · 특허 출원',
    ],
  },
  {
    number: '04',
    period: '2026 H2 –',
    title: 'B2B 원료 공급 & 사업 확장',
    status: 'future',
    statusLabel: '목표',
    milestones: [
      '제약 · 화장품 · 의료기기 기업 납품',
      '건강기능식품 원료 공급 체계',
      'IP 포트폴리오 확대',
      '글로벌 시장 진출 준비',
    ],
  },
];

const kpiTargets = [
  { label: '타겟 작물', value: '6종', desc: '병풀 · 바코파 · 특수인삼 외' },
  { label: '핵심 원료', value: '4+', desc: '마데카소사이드 · 바코사이드 등' },
  { label: '특허 목표', value: '3건', desc: 'AI 알고리즘 · 추출 공정' },
  { label: '응용 산업', value: '4개', desc: '의료 · 제약 · 뷰티 · 식품' },
];

export default function Roadmap() {
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
        currentPage="Roadmap"
        breadcrumbParent={{ label: 'Technology', path: '/technology' }}
        subNavItems={techSubNav}
      />

      {/* Hero Statement */}
      <section className="roadmap-statement section">
        <div className="container">
          <p className="tech-label" ref={addRef}>ROADMAP</p>
          <h2 className="tech-headline" ref={addRef}>
            재배에서 원료 공급까지,<br />
            <span className="tech-highlight">단계별 성장</span> 전략
          </h2>
        </div>
      </section>

      {/* Timeline */}
      <section className="roadmap-timeline-section section">
        <div className="container">
          <div className="rm-timeline">
            {roadmapPhases.map((phase, i) => (
              <div key={i} className={`rm-phase rm-${phase.status}`} ref={addRef}>
                <div className="rm-indicator">
                  <div className="rm-number">{phase.number}</div>
                  {i < roadmapPhases.length - 1 && <div className="rm-line"></div>}
                </div>
                <div className="rm-card">
                  <div className="rm-card-header">
                    <span className="rm-period">{phase.period}</span>
                    <span className={`rm-status rm-status-${phase.status}`}>{phase.statusLabel}</span>
                  </div>
                  <h3 className="rm-title">{phase.title}</h3>
                  <ul className="rm-milestones">
                    {phase.milestones.map((m, j) => (
                      <li key={j}>{m}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KPI Targets */}
      <section className="roadmap-kpi section">
        <div className="container">
          <h2 className="section-title">핵심 목표 지표</h2>
          <div className="kpi-grid">
            {kpiTargets.map((kpi, i) => (
              <div key={i} className="kpi-card" ref={addRef}>
                <div className="kpi-value">{kpi.value}</div>
                <div className="kpi-label">{kpi.label}</div>
                <div className="kpi-desc">{kpi.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
