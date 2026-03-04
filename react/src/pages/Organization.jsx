import { useEffect, useRef } from 'react';
import SubPageHero from '../components/SubPageHero';
import '../styles/team.css';

const aboutSubNav = [
  { label: 'Vision & Mission', path: '/about/vision-mission' },
  { label: 'CI', path: '/about/ci' },
  { label: 'History', path: '/about/history' },
  { label: 'Organization', path: '/about/organization' },
];

const teamData = [
  {
    avatar: '유',
    name: '유동규',
    role: 'CEO & Founder',
    color: '#2c7a2c',
    gradient: 'linear-gradient(135deg, #2c7a2c, #4caf50)',
    tagline: '비전을 현실로, 기술과 시장의 접점을 설계합니다.',
    specialization: 'Visionary · Strategic Leadership · R&D Direction',
    description: '스마트팜 재배부터 바이오 추출까지 전 주기를 아우르는 비즈니스 로드맵을 설계하고, 거시적인 기업 전략과 핵심 파트너십 구축을 주도하며 R&D 현장 경영을 통해 기술과 시장을 연결합니다.',
    responsibilities: [
      'Business Roadmap & Vision Building',
      'Strategic Partnership & Investment Attraction',
      'R&D & Production Oversight',
    ],
    techStack: ['Corporate Strategy', 'R&D Management', 'Business Development', 'Partnership'],
  },
  {
    avatar: '김',
    name: '김수찬',
    role: 'CTO',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    tagline: '스마트팜의 두뇌, 데이터와 알고리즘을 설계합니다.',
    specialization: 'Data Architecture · Algorithm Dev · Tech Culture',
    description: '생육 데이터를 수집·분석하는 서버 인프라를 구축하고 작물 생산성을 극대화하는 핵심 알고리즘을 개발합니다. 혁신적인 기술 문화를 기반으로 최고의 인재를 발굴하고 조직을 최적화합니다.',
    responsibilities: [
      'Smart Farm Data Architecture & Server Eng.',
      'Growth Algorithm Optimization',
      'Tech Talent Acquisition & Culture',
    ],
    techStack: ['Server Infrastructure', 'Algorithm', 'Data Analytics', 'Team Building'],
  },
  {
    avatar: '주',
    name: '주혜우',
    role: 'CSO',
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
    tagline: '성장의 발판, 전략적 자금 조달을 이끕니다.',
    specialization: 'Funding Strategy · Investor Relations · Business Planning',
    description: '정부 지원 사업 및 민간 투자를 포함한 자금 조달 전략을 수립·실행하며, 회사의 가치를 대외적으로 증명하는 IR과 사업 기획을 전담합니다.',
    responsibilities: [
      'Strategic Funding & Grant Management',
      'Investor Relations (IR) & Business Planning',
      'Financial Planning & Analysis',
    ],
    techStack: ['Funding Strategy', 'IR', 'Financial Planning', 'Gov. Grant'],
  },
];


const orgChartData = {
  departments: [
    {
      name: 'R&D Department',
      teams: [
        { title: 'Hardware', desc: '센서, 제어 시스템' },
        { title: 'Software', desc: 'AI, 데이터 분석' },
      ],
    },
    {
      name: 'Management Department',
      teams: [
        { title: 'Finance', desc: '재무, 회계' },
        { title: 'HR', desc: '인사, 총무' },
      ],
    },
  ],
};

export default function Organization() {
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
        currentPage="Organization"
        breadcrumbParent={{ label: 'About', path: '/about/vision-mission' }}
        subNavItems={aboutSubNav}
      />

      {/* Team Intro */}
      <section className="team-intro section">
        <div className="container">
          <h2 className="team-intro-headline" ref={addRef}>
            함께 만들어가는 <span className="highlight">HydroNutri</span>
          </h2>
          <p className="team-intro-subtitle" ref={addRef}>
            아쿠아포닉스 기술의 미래를 설계하는 전문가 팀을 소개합니다.
          </p>
        </div>
      </section>

      {/* Team Cards */}
      <section className="team-cards-section section">
        <div className="container">
          <div className="team-cards-grid">
            {teamData.map((member, i) => (
              <div
                key={i}
                className="team-card"
                ref={addRef}
                style={{ '--accent': member.color, '--accent-gradient': member.gradient }}
              >
                <div className="team-card-avatar" style={{ background: member.gradient }}>
                  {member.avatar}
                </div>
                <h3 className="team-card-name">{member.name}</h3>
                <div className="team-card-role">{member.role}</div>
                <p className="team-card-spec">{member.specialization}</p>
                <p className="team-card-tagline">{member.tagline}</p>
                <div className="team-card-details">
                  <p className="team-card-desc">{member.description}</p>
                  <div className="team-card-responsibilities">
                    <h4>주요 역할</h4>
                    <ul>
                      {member.responsibilities.map((r, j) => (
                        <li key={j}>{r}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="team-card-techstack">
                    {member.techStack.map((tech, j) => (
                      <span key={j} className="team-card-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organization Chart */}
      <section className="organization-chart-section section">
        <div className="container">
          <h2 className="section-title">Organization</h2>
          <div className="organization-chart" ref={addRef}>
            <div className="level-1-container">
              <div className="org-box ceo-box">
                CEO<br />
                <strong>Strategy &amp; Leadership</strong>
              </div>
              <div className="ceo-line-down"></div>
            </div>
            <div className="departments-connector">
              <div className="connector-left-branch"></div>
              <div className="connector-horizontal"></div>
              <div className="connector-right-branch"></div>
            </div>
            <div className="level-2">
              {orgChartData.departments.map((dept, i) => (
                <div key={i} className="department-branch">
                  <div className="org-box department-box">{dept.name}</div>
                  <div className="dept-line-down"></div>
                  <div className="teams-connector">
                    <div className="team-connector-left"></div>
                    <div className="team-connector-horizontal"></div>
                    <div className="team-connector-right"></div>
                  </div>
                  <div className="level-3">
                    {dept.teams.map((team, j) => (
                      <div key={j} className="org-box team-box">
                        <strong>{team.title}</strong>
                        <span>{team.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
