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

const IconLocation = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const IconLinkedIn = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const IconX = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12"/>
  </svg>
);

const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
);

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
                {sending ? '전송 중...' : '보내기'}
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="contact-info">
            <div className="info-block">
              <div className="info-row">
                <span className="info-row-icon"><IconLocation /></span>
                <div>
                  <span className="info-label">위치</span>
                  <p>강원특별자치도 춘천시<br />동산면 종자리로 33-7</p>
                </div>
              </div>
              <div className="info-row">
                <span className="info-row-icon"><IconMail /></span>
                <div>
                  <span className="info-label">이메일</span>
                  <p><a href="mailto:22qjsro@corexbiotech.com">22qjsro@corexbiotech.com</a></p>
                </div>
              </div>
              <div className="info-row info-row--social">
                <div className="social-links">
                  <a href="#" className="social-link" aria-label="LinkedIn">
                    <IconLinkedIn />
                    <span>LinkedIn</span>
                  </a>
                  <a href="#" className="social-link" aria-label="X">
                    <IconX />
                    <span>X (Twitter)</span>
                  </a>
                  <a href="#" className="social-link" aria-label="Instagram">
                    <IconInstagram />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
