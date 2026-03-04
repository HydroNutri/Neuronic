import { useEffect, useRef } from 'react';
import SubPageHero from '../components/SubPageHero';
import '../styles/about.css';

const aboutSubNav = [
  { label: 'Vision & Mission', path: '/about/vision-mission' },
  { label: 'CI', path: '/about/ci' },
  { label: 'History', path: '/about/history' },
  { label: 'Organization', path: '/about/organization' },
];

const timelineData = [
  {
    date: '2026.H2',
    title: 'B2B 원료 공급 체계 구축',
    description: '제약·화장품·의료기기 기업 대상 천연물 유래 원료 납품 파트너십 확보',
    markerType: 'future',
    isFuture: true,
  },
  {
    date: '2026.H1',
    title: '추출·정제 공정 확립 & 원료 개발',
    description: '산업용 추출 농축 설비 도입, 마데카소사이드·바코사이드 등 핵심 성분 원료화 및 특허 출원',
    markerType: 'future',
    isFuture: true,
  },
  {
    date: '2025.H2',
    title: '현재 - 스마트팜 시스템 고도화',
    description: '기능성 작물(병풀, 바코파, 특수인삼) 정밀 재배 시스템 구축 및 AI 생육 알고리즘 개발 진행 중',
    markerType: 'active',
    isFuture: false,
  },
  {
    date: '2025.H1',
    title: '사업 방향 피벗 & 법인 설립',
    description: '아쿠아포닉스 식량 재배에서 스마트팜 기반 바이오 소재 개발 기업으로 전환, COREX 법인 설립',
    markerType: '',
    isFuture: false,
  },
  {
    date: '2024.H2',
    title: '핵심 팀 구성 & 연구 착수',
    description: '연세대학교 창업보육센터 입주, CEO·CTO·CSO 중심 창업팀 결성 및 기능성 작물 재배 연구 시작',
    markerType: '',
    isFuture: false,
  },
];

export default function History() {
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
        currentPage="History"
        breadcrumbParent={{ label: 'About', path: '/about/vision-mission' }}
        subNavItems={aboutSubNav}
      />

      <section className="journey-timeline section">
        <div className="container">
          <h2 className="section-title">Our Journey</h2>
          <div className="timeline">
            {timelineData.map((item, i) => (
              <div key={i} className={`timeline-item${item.isFuture ? ' future' : ''}`} ref={addRef}>
                <div className={`timeline-marker${item.markerType ? ` ${item.markerType}` : ''}`}></div>
                <div className="timeline-content">
                  <div className="timeline-date">{item.date}</div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
