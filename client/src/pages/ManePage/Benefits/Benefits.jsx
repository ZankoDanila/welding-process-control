import React from 'react'
import './Benefits.css'

function Benefits() {
  const applicationItems = [
    {
      id: 1,
      icon: '/img/icon-organizations.svg',
      alt: 'Предприятия и организации',
      text: 'Предприятия и организации, выполняющие сварку ответственных конструкций.',
    },
    {
      id: 2,
      icon: '/img/icon-centers.svg',
      alt: 'Центры подготовки',
      text: 'Центры подготовки и аттестации сварщиков.',
    },
  ]

  const resultItems = [
    {
      id: 1,
      icon: '/img/icon-arrow-down.svg',
      alt: 'Снижение затрат',
      text: 'Снижение затрат на исправление брака и повышение стабильности сварочного производства.',
    },
    {
      id: 2,
      icon: '/img/icon-check-list.svg',
      alt: 'Подтверждение качества',
      text: 'Формирование цифровых данных и документальное подтверждение результатов контроля.',
    },
  ]

  const advantages = [
    {
      id: 1,
      icon: '/img/icon-wifi.svg',
      alt: 'Контроль и автоматизация',
      title: 'Контроль в реальном времени',
      description:
        'Оперативное наблюдение за параметрами сварочного процесса, работой оборудования и действиями сварщика.',
    },
    {
      id: 2,
      icon: '/img/icon-dollar.svg',
      alt: 'Экономическая эффективность',
      title: 'Снижение производственных затрат',
      description:
        'Использование мобильных устройств и раннее выявление отклонений помогают сократить потери, связанные с браком.',
    },
    {
      id: 3,
      icon: '/img/icon-database.svg',
      alt: 'Цифровая база данных',
      title: 'Единая база и цифровой паспорт',
      description:
        'Данные о персонале, оборудовании и сварных соединениях сохраняются в единой системе для дальнейшего анализа и отчётности.',
    },
  ]

  return (
    <section className="benefits-section">

      <div className="benefits-container">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="benefits-header">

          <div className="benefits-header-line"></div>

          <span className="benefits-label">
            Практическая ценность системы
          </span>

          <h2 className="benefits-main-title">
            Преимущества системы
          </h2>

          <p className="benefits-intro">
            Система обеспечивает непрерывный контроль сварочных
            процессов, автоматизацию сбора данных и повышение
            качества производства.
          </p>

        </header>


        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div className="benefits-grid">

          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="benefits-left-column">

            {/* -------------------------------------------------
                APPLICATION
            ------------------------------------------------- */}

            <article className="benefits-card scope-card">

              <div className="card-heading">

                <span className="card-kicker">
                  Где применяется
                </span>

                <h3 className="card-title">
                  Область применения
                </h3>

              </div>


              <div className="card-body-content">

                {applicationItems.map((item) => (
                  <div
                    className="info-row"
                    key={item.id}
                  >

                    <div className="icon-container">
                      <img
                        src={item.icon}
                        alt={item.alt}
                        className="benefit-icon"
                      />
                    </div>

                    <p className="info-text">
                      {item.text}
                    </p>

                  </div>
                ))}

              </div>

            </article>


            {/* -------------------------------------------------
                RESULT
            ------------------------------------------------- */}

            <article className="benefits-card results-card">

              <div className="card-heading">

                <span className="card-kicker">
                  Что получает предприятие
                </span>

                <h3 className="card-title">
                  Практический результат
                </h3>

              </div>


              <div className="card-body-content">

                {resultItems.map((item) => (
                  <div
                    className="info-row"
                    key={item.id}
                  >

                    <div className="icon-container">
                      <img
                        src={item.icon}
                        alt={item.alt}
                        className="benefit-icon"
                      />
                    </div>

                    <p className="info-text">
                      {item.text}
                    </p>

                  </div>
                ))}

              </div>

            </article>


            {/* -------------------------------------------------
                ACTIONS
            ------------------------------------------------- */}

            <div className="benefits-actions">

              <a
                href="index.html"
                className="btn-action btn-order"
              >
                Заказать систему
              </a>

              <a
                href="index.html"
                className="btn-action btn-consult"
              >
                Получить консультацию
              </a>

            </div>

          </div>


          {/* =================================================
              RIGHT COLUMN
          ================================================= */}

          <article className="benefits-right-column advantages-card">

            <div className="advantages-heading">

              <span className="card-kicker">
                Основные возможности
              </span>

              <h3 className="advantages-main-title">
                Ключевые преимущества
              </h3>

              <p className="advantages-intro">
                Система объединяет контроль сварки, работу
                с данными и автоматизацию производственных процессов.
              </p>

            </div>


            <div className="advantages-list">

              {advantages.map((advantage) => (
                <div
                  className="advantage-item"
                  key={advantage.id}
                >

                  <div className="advantage-header">

                    <div className="advantage-icon-block">
                      <img
                        src={advantage.icon}
                        alt={advantage.alt}
                        className="adv-icon"
                      />
                    </div>

                    <div className="advantage-text-block">

                      <h4 className="advantage-title">
                        {advantage.title}
                      </h4>

                    </div>

                  </div>

                  <p className="advantage-description">
                    {advantage.description}
                  </p>

                </div>
              ))}

            </div>

          </article>

        </div>

      </div>

    </section>
  )
}

export default Benefits
