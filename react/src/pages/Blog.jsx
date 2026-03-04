import { useEffect, useRef } from 'react';
import SubPageHero from '../components/SubPageHero';
import '../styles/blog.css';

const investmentSubNav = [
  { label: 'Investment', path: '/investment' },
  { label: 'News', path: '/investment/news' },
  { label: 'Blog', path: '/investment/blog' },
];

const blogData = [
  {
    image: '/assets/blog-default.jpg',
    title: '스마트팜에서 바이오 소재까지 — COREX의 기술 파이프라인',
    author: '관리자',
    url: '#',
  },
  {
    image: '/assets/blog-default.jpg',
    title: '병풀(센텔라아시아티카)의 마데카소사이드, 왜 주목받는가',
    author: '관리자',
    url: '#',
  },
  {
    image: '/assets/blog-default.jpg',
    title: 'AI 정밀 재배로 기능성 성분 함량을 극대화하는 방법',
    author: '관리자',
    url: '#',
  },
];

export default function Blog() {
  const gridRef = useRef(null);

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

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SubPageHero
        category="investment"
        title="Investment"
        currentPage="Blog"
        breadcrumbParent={{ label: 'Investment', path: '/investment' }}
        subNavItems={investmentSubNav}
      />

      <section className="blog-list-section">
        <div className="container">
          <div className="blog-grid fade-in-scroll" ref={gridRef}>
            {blogData.map((post, i) => (
              <div key={i} className="blog-card">
                <img className="blog-thumbnail" src={post.image} alt="썸네일" />
                <div className="blog-content">
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-meta">작성자: {post.author}</p>
                  <a href={post.url} className="blog-button" target="_blank" rel="noopener noreferrer">
                    자세히 보기
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
