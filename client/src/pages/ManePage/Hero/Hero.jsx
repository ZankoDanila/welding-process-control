import React from 'react'
import './Hero.css'

function Hero({ title, features }) {
  return (
    <section className="hero" id="hero">
        <div className="hero__bg">
          <img
            className="hero__bg-img"
            src="/img/main_fraim.png"
            alt="Фоновое изображение сварки"
          />

          <div className="hero__bg-overlay"></div>
        </div>

        <div className="hero__container">
          <div className="hero__content">
            <h1 className="hero__title">
              {title}
            </h1>

            <h2 className="hero__subtitle">
              для контроля параметров
              <br />
              сварочных процессов
            </h2>

            <div className="hero__features">
              <div className="hero__features-line"></div>

              <div className="hero__features-list">
                {features.map((feature) => (
                  <div
                    className="hero__feature"
                    key={feature.id}
                  >
                    {feature.text}
                  </div>
                ))}
              </div>
            </div>

            <a href="index.html" className="hero__btn">
              Связаться для заказа
            </a>
          </div>
        </div>
      </section>
    )
}

export default Hero
