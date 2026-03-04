import { useState } from 'react';
import SubPageHero from '../components/SubPageHero';
import '../styles/faq.css';

const faqSubNav = [
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/faq/contact' },
  { label: 'Location', path: '/faq/location' },
];

const categories = [
  { key: 'all', label: '전체' },
  { key: 'general', label: '일반' },
  { key: 'technical', label: '기술' },
  { key: 'business', label: '비즈니스' },
];

const faqData = [
  {
    category: 'general',
    question: 'COREX는 어떤 회사인가요?',
    answer: 'AI 정밀 농업(스마트팜)으로 기능성 작물을 재배하고, 바이오 추출 기술로 고순도 천연 원료를 생산하여 의료·제약·화장품·건강기능식품 산업에 B2B 공급하는 바이오 소재 기업입니다.',
  },
  {
    category: 'general',
    question: '어떤 작물을 재배하나요?',
    answer: '병풀(센텔라아시아티카), 바코파, 특수인삼, 덴드로비움, 스테비아, 워터렌틸 등 고부가가치 기능성 작물을 재배합니다.',
  },
  {
    category: 'general',
    question: '주요 추출 성분은 무엇인가요?',
    answer: '마데카소사이드(상처 치료·피부 재생), 바코사이드(인지기능 개선), 진세노사이드(면역력·활력), 항노화 성분, 천연 감미료, 식물성 단백질 등을 타겟으로 합니다.',
  },
  {
    category: 'technical',
    question: 'AI 기술은 어떻게 활용되나요?',
    answer: '작물별 최적 생육 조건(온도, 습도, 광량, 양액 등)을 자동으로 학습하고 제어하는 AI 알고리즘을 개발하여 기능성 성분 함량을 극대화합니다.',
  },
  {
    category: 'technical',
    question: '추출·정제 공정은 어떤 수준인가요?',
    answer: '산업용 추출 농축 장비를 활용하여 GMP 수준의 품질 관리 체계를 갖춘 천연물 추출·정제 공정을 구축하고 있습니다.',
  },
  {
    category: 'business',
    question: '원료는 어떤 산업에 공급하나요?',
    answer: '의료기기(하이드로겔, 스텐트 코팅), 제약·건강기능식품(인지기능 개선제, 면역 강화), 화장품(미백, 항노화), 푸드테크(식물성 단백질, 천연 감미료) 분야에 B2B 원료를 공급합니다.',
  },
  {
    category: 'business',
    question: '투자 유치 현황은 어떤가요?',
    answer: '현재 시드 단계로, 스마트팜 시스템 고도화와 추출 공정 확립을 위한 투자를 유치 중입니다.',
  },
  {
    category: 'business',
    question: '협업이나 파트너십은 가능한가요?',
    answer: '천연물 원료가 필요한 제약·화장품·의료기기·식품 기업과의 B2B 파트너십을 적극 환영합니다. Contact 페이지를 통해 문의해 주세요.',
  },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const filteredFaq = faqData.filter((item) => {
    const matchCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch =
      searchQuery === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <SubPageHero
        category="faq"
        title="FAQ"
        currentPage="FAQ"
        breadcrumbParent={{ label: 'FAQ', path: '/faq' }}
        subNavItems={faqSubNav}
      />

      {/* Search */}
      <section className="faq-search section-sm">
        <div className="container">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="궁금한 내용을 입력하세요..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOpenIndex(null);
              }}
            />
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="faq-categories section-sm">
        <div className="container">
          <div className="category-tabs">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`category-tab ${activeCategory === cat.key ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat.key);
                  setOpenIndex(null);
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="faq-content section">
        <div className="container">
          <div className="faq-list">
            {filteredFaq.length > 0 ? (
              filteredFaq.map((item, i) => (
                <div
                  key={i}
                  className={`faq-item ${openIndex === i ? 'open' : ''}`}
                  onClick={() => toggleFaq(i)}
                >
                  <div className="faq-question">
                    <span>{item.question}</span>
                    <span className="faq-toggle">&#9660;</span>
                  </div>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="faq-no-results">
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
