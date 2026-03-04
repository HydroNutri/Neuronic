import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Show/hide button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      style={{
        display: visible ? 'block' : 'none',
        position: 'fixed',
        bottom: '20px',
        right: '30px',
        zIndex: 99,
        fontSize: '18px',
        border: 'none',
        outline: 'none',
        backgroundColor: '#2C7A2C',
        color: 'white',
        cursor: 'pointer',
        padding: '15px',
        borderRadius: '4px',
      }}
    >
      &#8679;
    </button>
  );
}
