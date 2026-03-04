import { useEffect, useRef } from 'react';
import SubPageHero from '../components/SubPageHero';
import '../styles/news.css';

const investmentSubNav = [
  { label: 'Investment', path: '/investment' },
  { label: 'News', path: '/investment/news' },
  { label: 'Blog', path: '/investment/blog' },
];

const newsData = [
  {
    image: '/assets/news1.jpg',
    title: 'COREX, 스마트팜 기반 바이오 소재 스타트업으로 법인 설립',
    summary: 'AI 정밀 농업과 바이오 추출 기술을 융합하여 의료·제약·화장품 분야 핵심 원료를 개발하는 COREX가 공식 출범했습니다.',
    link: '#',
  },
  {
    image: '/assets/news2.jpg',
    title: '연세대 창업보육센터 입주, 기능성 작물 재배 연구 본격화',
    summary: '연세대학교 창업보육센터에 입주하여 병풀·바코파·특수인삼 등 기능성 작물의 정밀 재배 연구를 시작합니다.',
    link: '#',
  },
  {
    image: '/assets/news3.jpg',
    title: 'AI 생육 알고리즘 개발 착수, 기능성 성분 함량 극대화 목표',
    summary: '작물별 최적 생육 조건을 자동으로 학습하는 AI 알고리즘으로 마데카소사이드 등 핵심 성분 함량을 극대화합니다.',
    link: '#',
  },
];

export default function News() {
  const cardsRef = useRef([]);

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

    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SubPageHero
        category="investment"
        title="Investment"
        currentPage="News"
        breadcrumbParent={{ label: 'Investment', path: '/investment' }}
        subNavItems={investmentSubNav}
      />

      <section className="news-section">
        <div className="container">
          <div className="news-grid">
            {newsData.map((news, i) => (
              <article
                key={i}
                className="news-card fade-in-scroll"
                ref={(el) => (cardsRef.current[i] = el)}
              >
                <img src={news.image} alt="기사 이미지" />
                <div className="news-content">
                  <h3 className="news-title">{news.title}</h3>
                  <p className="news-summary">{news.summary}</p>
                  <a href={news.link} className="read-more">자세히 보기 →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
