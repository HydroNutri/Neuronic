import { useEffect, useRef } from 'react';
import SubPageHero from '../components/SubPageHero';
import '../styles/investment.css';

const investmentSubNav = [
  { label: 'Investment', path: '/investment' },
  { label: 'News', path: '/investment/news' },
  { label: 'Blog', path: '/investment/blog' },
];

const chartData = [
  { label: '시드 투자', value: 40, color: '#2c7a2c' },
  { label: '정부지원금', value: 25, color: '#3b82f6' },
  { label: '자체 자본', value: 20, color: '#f59e0b' },
  { label: '파트너십', value: 15, color: '#8b5cf6' },
];

function buildConicGradient(data) {
  let accumulated = 0;
  const stops = data.map((d) => {
    const start = accumulated;
    accumulated += d.value;
    return `${d.color} ${start}% ${accumulated}%`;
  });
  return `conic-gradient(${stops.join(', ')})`;
}

export default function Investment() {
  const fadeRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    fadeRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !fadeRefs.current.includes(el)) {
      fadeRefs.current.push(el);
    }
  };

  return (
    <>
      <SubPageHero
        category="investment"
        title="Investment"
        currentPage="Investment"
        breadcrumbParent={{ label: 'Investment', path: '/investment' }}
        subNavItems={investmentSubNav}
      />

      {/* Chart Section */}
      <section className="investment-stats section">
        <div className="container">
          <h2 className="section-title">누적 투자 추이</h2>
          <div className="chart-container fade-in-scroll" ref={addRef}>
            <div
              className="doughnut-chart"
              style={{ background: buildConicGradient(chartData) }}
            >
              <div className="center-hole">
                <span className="chart-label">투자 비율</span>
                <span className="chart-value">100%</span>
              </div>
            </div>
            <div className="chart-legend">
              {chartData.map((d, i) => (
                <div key={i} className="legend-item">
                  <div className="legend-color" style={{ background: d.color }} />
                  <span>{d.label} ({d.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="investment-summary section-sm">
        <div className="container grid grid-3">
          <div className="summary-card fade-in-scroll" ref={addRef}>
            <h3>총 유치 금액</h3>
            <p><strong>$--</strong></p>
          </div>
          <div className="summary-card fade-in-scroll" ref={addRef}>
            <h3>투자자 수</h3>
            <p><strong>-- VC/Angel</strong></p>
          </div>
          <div className="summary-card fade-in-scroll" ref={addRef}>
            <h3>최신 라운드</h3>
            <p><strong>2025 시드</strong></p>
          </div>
        </div>
      </section>
    </>
  );
}
