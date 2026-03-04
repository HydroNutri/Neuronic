import { Link } from 'react-router-dom';

export default function SubPageHero({ category, title, currentPage, breadcrumbParent, subNavItems }) {
  return (
    <section className={`hero-section ${category}`}>
      <div className="hero-overlay">
        <h1 className="hero-title">{title}</h1>
        <div className="breadcrumb">
          <span>🏠</span>
          <span>&mdash;</span>
          <Link to="/">Home</Link>
          <span>&mdash;</span>
          <Link to={breadcrumbParent.path}>{breadcrumbParent.label}</Link>
          <span>&mdash;</span>
          <span className="current">{currentPage}</span>
        </div>
      </div>

      <nav className="sub-nav-menu">
        <ul>
          {subNavItems.map((item) => (
            <li key={item.path} className={item.label === currentPage ? 'active-tab' : ''}>
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
