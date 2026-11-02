import { Link } from 'react-router'

import './Footer.css'

function Footer() {
  const navigationLinks = [
    {
      id: 1,
      to: '/#hero',
      text: 'ГЛАВНАЯ',
    },
    {
      id: 2,
      to: '/#experience',
      text: 'СИСТЕМА',
    },
    {
      id: 3,
      to: '/catalog',
      text: 'РАЗРАБОТКИ',
    },
    {
      id: 4,
      to: '/#team',
      text: 'КОМАНДА',
    },
    {
      id: 5,
      to: '/#news',
      text: 'НОВОСТИ',
    },
    {
      id: 6,
      to: '#',
      text: 'КАБИНЕТ',
    },
  ]

  function handleScrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer className="main-footer">

      <div className="footer-container">

        <div className="footer-main">

          <a
            href="https://bru.by"
            className="footer-brand"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/img/BRU_logo.png"
              alt="Логотип БРУ"
              className="footer-logo-img"
            />

            <div className="footer-brand-text">

              <span className="brand-university">
                Белорусско-Российский университет
              </span>

              <span className="brand-system">
                Система контроля сварочных процессов
              </span>

            </div>
          </a>

          <p className="footer-description">
            Интеллектуальный контроль сварочных процессов
            для повышения качества и эффективности производства.
          </p>

        </div>

        <div className="footer-navigation">

          <h3 className="footer-title">
            Навигация
          </h3>

          <nav className="footer-nav">

            <ul className="footer-menu">

              {navigationLinks.map((link) => (
                <li key={link.id}>

                  {link.to === '#' ? (
                    <a
                      href="#"
                      className="footer-link"
                    >
                      {link.text}
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      className="footer-link"
                    >
                      {link.text}
                    </Link>
                  )}

                </li>
              ))}

            </ul>

          </nav>

        </div>

      </div>

      <div className="footer-bottom">

        <div className="footer-bottom-container">

          <span className="footer-copyright">
            © 2026 Белорусско-Российский университет
          </span>

          <a
            href="https://bru.by"
            className="footer-university-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            bru.by
          </a>

          <button
            type="button"
            className="footer-top-button"
            onClick={handleScrollTop}
            aria-label="Вернуться наверх"
          >
            <span>Наверх</span>
            <span className="footer-top-arrow">
              ↑
            </span>
          </button>

        </div>

      </div>

    </footer>
  )
}

export default Footer
