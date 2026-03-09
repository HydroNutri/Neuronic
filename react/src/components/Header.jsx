import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navData = [
  {
    label: 'Home',
    path: '/',
    icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  },
  {
    label: 'About',
    path: '/about/vision-mission',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
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
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    children: [
      { label: 'Technology', path: '/technology' },
      { label: 'Roadmap', path: '/technology/roadmap' },
    ],
  },
  {
    label: 'Investment',
    path: '/investment',
    icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    children: [
      { label: 'Investment', path: '/investment' },
      { label: 'News', path: '/investment/news' },
      { label: 'Blog', path: '/investment/blog' },
    ],
  },
  {
    label: 'FAQ',
    path: '/faq',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z',
    children: [
      { label: 'FAQ', path: '/faq' },
      { label: 'Contact', path: '/faq/contact' },
      { label: 'Location', path: '/faq/location' },
    ],
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [visibleMega, setVisibleMega] = useState(null);
  const leaveTimeout = useRef(null);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenSubmenu(null);
  }, [location]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // Close on resize
  useEffect(() => {
    const handleResize = () => { if (isMenuOpen) setIsMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const toggleSubmenu = useCallback((index) => {
    setOpenSubmenu((prev) => (prev === index ? null : index));
  }, []);

  const handleDropdownEnter = useCallback((index) => {
    clearTimeout(leaveTimeout.current);
    setVisibleMega(index);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    leaveTimeout.current = setTimeout(() => setVisibleMega(null), 200);
  }, []);

  return (
    <header className="header" id="header">
      <nav className="nav">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src="/icons/LOGO.png" alt="COREX Logo" className="logo-img" />
          <span className="logo-text">COREX</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="nav-links desktop-links">
          {navData.map((item, i) => (
            <li
              key={item.label}
              className={`nav-link${item.children ? ' has-dropdown' : ''}`}
              onMouseEnter={item.children ? () => handleDropdownEnter(i) : undefined}
              onMouseLeave={item.children ? handleDropdownLeave : undefined}
            >
              <Link to={item.path}>{item.label}</Link>
              {item.children && (
                <div
                  className={`mega-menu-container${visibleMega === i ? ' visible' : ''}`}
                  onMouseEnter={() => clearTimeout(leaveTimeout.current)}
                  onMouseLeave={() => setVisibleMega(null)}
                >
                  <div className="mega-menu-content">
                    <div className="mega-menu-title">{item.label}</div>
                    <ul className="mega-menu-links">
                      {item.children.map((child) => (
                        <li key={child.path}>
                          <Link to={child.path}>{child.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className={`hamburger${isMenuOpen ? ' active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          style={{ display: isMenuOpen ? 'none' : undefined }}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </nav>

      {/* Overlay */}
      <div
        className={`nav-overlay${isMenuOpen ? ' active' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div className={`nav-menu${isMenuOpen ? ' active' : ''}`}>
        <button className="nav-close-btn" onClick={() => setIsMenuOpen(false)} aria-label="메뉴 닫기">
          &times;
        </button>
        <div className="nav-menu-content">
          <ul className="nav-links mobile-links">
            {navData.map((item, i) => (
              <li key={item.label} className={`nav-link${item.children ? ' has-submenu' : ''}`}>
                <div className="nav-link-header">
                  <Link to={item.path}>
                    <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d={item.icon} />
                    </svg>
                    {item.label}
                  </Link>
                  {item.children ? (
                    <button className="submenu-toggle" onClick={() => toggleSubmenu(i)}>
                      {openSubmenu === i ? '-' : '+'}
                    </button>
                  ) : (
                    <span className="submenu-placeholder"></span>
                  )}
                </div>
                {item.children && (
                  <ul
                    className={`submenu${openSubmenu === i ? ' active' : ''}`}
                    style={{ maxHeight: openSubmenu === i ? `${item.children.length * 50}px` : '0' }}
                  >
                    {item.children.map((child) => (
                      <li key={child.path}>
                        <Link to={child.path}>{child.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="nav-footer">
          <div className="nav-footer-text">
            <div className="nav-footer-slogan">
              "Where Living Systems meet Thinking Systems"
            </div>
            &copy; 2025 COREX Team
          </div>
        </div>
      </div>
    </header>
  );
}
