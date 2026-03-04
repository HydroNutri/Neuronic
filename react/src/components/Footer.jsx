import { Link } from 'react-router-dom';

const footerLinks = [
  {
    label: 'Home',
    path: '/',
    children: [],
  },
  {
    label: 'About',
    path: '/about/vision-mission',
    children: [
      { label: 'Vision & Mission', path: '/about/vision-mission' },
      { label: 'CI', path: '/about/ci' },
      { label: 'History', path: '/about/history' },
      { label: 'Organization', path: '/about/organization' },
    ],
  },
  {
    label: 'Technology',
    path: '/technology',
    children: [
      { label: 'Technology', path: '/technology' },
      { label: 'Roadmap', path: '/technology/roadmap' },
    ],
  },
  {
    label: 'Investment',
    path: '/investment',
    children: [
      { label: 'Investment', path: '/investment' },
      { label: 'News', path: '/investment/news' },
      { label: 'Blog', path: '/investment/blog' },
    ],
  },
  {
    label: 'FAQ',
    path: '/faq',
    children: [
      { label: 'FAQ', path: '/faq' },
      { label: 'Contact', path: '/faq/contact' },
      { label: 'Location', path: '/faq/location' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>COREX</h3>
            <p>Where Living Systems <br /> meet Thinking Systems</p>
            <div className="footer-info" style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6 }}>
              COREX CEO. 유동규<br />
              E-mail: eqjsro@gmail.com<br />
              Address: 강원특별자치도 춘천시 동산면 종자리로 33-7<br /><br />
              &copy; 2025 COREX Team. All rights reserved.
            </div>
          </div>
          <div className="footer-links-container">
            {footerLinks.map((section) => (
              <div className="footer-main-link" key={section.label}>
                <Link to={section.path}>{section.label}</Link>
                {section.children.length > 0 && (
                  <div className="footer-sub-links">
                    {section.children.map((child) => (
                      <Link to={child.path} key={child.path}>{child.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
