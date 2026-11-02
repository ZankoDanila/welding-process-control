import React from 'react'
import './MobileApp.css'

const phoneScreens = [
  {
    id: 1,
    image: '/img/phone_two.png',
    alt: 'Экран мобильного приложения',
    title: 'Идентификация',
    description: 'Работа со сварщиком и оборудованием',
  },
  {
    id: 2,
    image: '/img/phone_one.png',
    alt: 'Экран мобильного приложения',
    title: 'Параметры процесса',
    description: 'Отображение текущих параметров сварки',
  },
  {
    id: 3,
    image: '/img/phone_three.png',
    alt: 'Экран мобильного приложения',
    title: 'Контроль',
    description: 'Оповещение об отклонениях режима',
  },
]

function MobileApp() {
  return (
    <section className="mobile-app-section">
      <div className="mobile-app-container">

        <div className="mobile-app-header">


          <h2 className="mobile-app-title">
            Мобильное приложение
          </h2>

          <p className="mobile-app-description">
            Приложение обеспечивает идентификацию сварщика и оборудования,
            получение заданий с сервера, отображение параметров процесса
            в реальном времени и оперативное оповещение о нарушениях режима сварки.
          </p>
        </div>

        <div className="mobile-app-screens">

          <div className="mobile-app-screens-header">
            <h3>Основные экраны</h3>

            <span>
              Работа с системой на мобильном устройстве
            </span>
          </div>

          <div className="mobile-app-phones">
            {phoneScreens.map((screen) => (
              <div
                className="mobile-app-phone-item"
                key={screen.id}
              >
                <div className="mobile-app-phone-image-wrapper">
                  <img
                    src={screen.image}
                    alt={screen.alt}
                    className="mobile-app-phone"
                  />
                </div>

                <div className="mobile-app-phone-title">
                  {screen.title}
                </div>

                <div className="mobile-app-phone-description">
                  {screen.description}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}

export default MobileApp
