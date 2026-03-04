import { useState } from 'react';
import emailjs from '@emailjs/browser';
import SubPageHero from '../components/SubPageHero';
import '../styles/contact.css';

const faqSubNav = [
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/faq/contact' },
  { label: 'Location', path: '/faq/location' },
];

const categoryOptions = [
  { value: 'general', label: '일반 문의' },
  { value: 'investment', label: '투자 관련' },
  { value: 'partnership', label: '파트너십' },
  { value: 'support', label: '기술 지원' },
];

const infoCards = [
  {
    icon: '📍',
    title: '오피스 위치',
    content: (
      <p>강원특별자치도 춘천시 동산면 종자리로 33-7</p>
    ),
  },
  {
    icon: '📧',
    title: '이메일 문의',
    content: (
      <p><a href="mailto:eqjsro@gmail.com">eqjsro@gmail.com</a></p>
    ),
  },
  {
    icon: '🔗',
    title: 'SNS',
    content: (
      <div className="social-links">
        <a href="#" className="social-link">💼</a>
        <a href="#" className="social-link">🐦</a>
        <a href="#" className="social-link">📷</a>
      </div>
    ),
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs.send(
      'service_4vvm5c1',
      'template_xcpd6t4',
      {
        name: formData.name,
        email: formData.email,
        category: categoryOptions.find(o => o.value === formData.category)?.label || formData.category,
        message: formData.message,
      },
      '-kb7Dty1CCS7mnYzy'
    )
    .then(() => {
      alert('문의가 성공적으로 전송되었습니다. 감사합니다!');
      setFormData({ name: '', email: '', category: 'general', message: '' });
    })
    .catch(() => {
      alert('전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
    })
    .finally(() => {
      setSending(false);
    });
  };

  return (
    <>
      <SubPageHero
        category="faq"
        title="FAQ"
        currentPage="Contact"
        breadcrumbParent={{ label: 'FAQ', path: '/faq' }}
        subNavItems={faqSubNav}
      />

      <section className="contact-main section">
        <div className="container contact-grid">
          {/* Form */}
          <div className="contact-form">
            <h2>문의 양식</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">이름</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">문의 유형</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {categoryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">문의 내용</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="submit-btn" disabled={sending}>
                {sending ? '전송 중...' : '보내기 ✉️'}
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="contact-info">
            {infoCards.map((card, i) => (
              <div key={i} className="info-card">
                <div className="info-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                {card.content}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
