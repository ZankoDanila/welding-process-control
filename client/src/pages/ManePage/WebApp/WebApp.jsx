import React from 'react'
import './WebApp.css'

const webFeatures = [
  {
    id: 1,
    title: 'Централизованная база данных и ресурсов',
    text: 'Единое хранилище для управления реестром сотрудников, оборудованием и технологическими инструкциями.',
  },
  {
    id: 2,
    title: 'Цифровая паспортизация и отчетность',
    text: 'Формирование отчетов о работе персонала и оборудования, а также цифровых паспортов сварных швов.',
  },
]

function WebApp() {
  return (
    <section className="web-app-section">
      <div className="web-container">

        <div className="web-header">



          <h2 className="web-title">
            Веб-приложение
          </h2>

          <p className="web-description">
            Централизованное управление данными, оборудованием,
            заданиями и результатами контроля сварочного производства.
          </p>

        </div>


        <div className="web-preview">

          <div className="web-preview-header">
            <span className="web-preview-dot"></span>
            <span className="web-preview-dot"></span>
            <span className="web-preview-dot"></span>

            <span className="web-preview-name">
              WEB-ПРИЛОЖЕНИЕ
            </span>
          </div>


          <div className="web-preview-content">

            <div className="web-placeholder">

              <div className="web-placeholder-badge">
                ЗАМЕНИТЬ НА:
              </div>

              <strong>
                СКРИНШОТ WEB-ПРИЛОЖЕНИЯ
              </strong>

              <span>
                Панель управления системой
              </span>

            </div>


            <div className="web-preview-panels">

              <div className="web-preview-panel">
                <span className="web-preview-panel-title">
                  Персонал
                </span>

                <span className="web-preview-panel-line"></span>
                <span className="web-preview-panel-line"></span>
                <span className="web-preview-panel-line short"></span>
              </div>


              <div className="web-preview-panel">
                <span className="web-preview-panel-title">
                  Оборудование
                </span>

                <span className="web-preview-panel-line"></span>
                <span className="web-preview-panel-line"></span>
                <span className="web-preview-panel-line short"></span>
              </div>


              <div className="web-preview-panel">
                <span className="web-preview-panel-title">
                  Контроль
                </span>

                <span className="web-preview-panel-line"></span>
                <span className="web-preview-panel-line"></span>
                <span className="web-preview-panel-line short"></span>
              </div>

            </div>

          </div>
        </div>


        <div className="web-features">

          {webFeatures.map((feature) => (
            <article
              className="web-feature"
              key={feature.id}
            >
              <div className="web-feature-number">
                0{feature.id}
              </div>

              <div className="web-feature-content">

                <h3>
                  {feature.title}
                </h3>

                <p>
                  {feature.text}
                </p>

              </div>
            </article>
          ))}

        </div>

      </div>
    </section>
  )
}

export default WebApp
