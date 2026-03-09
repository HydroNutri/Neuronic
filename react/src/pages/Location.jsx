import SubPageHero from '../components/SubPageHero';
import '../styles/location.css';

const faqSubNav = [
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/faq/contact' },
  { label: 'Location', path: '/faq/location' },
];

export default function Location() {
  return (
    <>
      <SubPageHero
        category="faq"
        title="FAQ"
        currentPage="Location"
        breadcrumbParent={{ label: 'FAQ', path: '/faq' }}
        subNavItems={faqSubNav}
      />

      <section className="location-map-section">
        <div className="container">
          <div className="map-wrapper">
            <iframe
              src="https://maps.google.com/maps?q=%EA%B0%95%EC%9B%90%ED%8A%B9%EB%B3%84%EC%9E%90%EC%B9%98%EB%8F%84+%EC%B6%98%EC%B2%9C%EC%8B%9C+%EB%8F%99%EC%82%B0%EB%A9%B4+%EC%A2%85%EC%9E%90%EB%A6%AC%EB%A1%9C+33-7&t=&z=15&ie=UTF8&iwloc=&output=embed"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="COREX Location"
            />
          </div>

          <div className="location-info">
            <h2>연락처 및 주소</h2>
            <ul>
              <li>
                <strong>주소:</strong> 강원특별자치도 춘천시 동산면 종자리로 33-7
              </li>
              <li><strong>이메일:</strong> 22qjsro@corexbiotech.com</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
