import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import SensorCard from '../SensorCard/SensorCard'
import './ExperienceSection.css'

function ExperienceSection({ sensors }) {
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(0)

  const [visibleCount, setVisibleCount] = useState(
    window.innerWidth <= 1024 ? 1 : 2
  )

  function handleResize() {
    const newVisibleCount =
      window.innerWidth <= 1024 ? 1 : 2

    if (visibleCount === newVisibleCount) {
      return
    }

    const maxPage = Math.max(
      0,
      Math.ceil(sensors.length / newVisibleCount) - 1
    )

    setVisibleCount(newVisibleCount)

    setCurrentPage((prevCurrentPage) =>
      Math.min(prevCurrentPage, maxPage)
    )
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [visibleCount, sensors.length])

  function handlePrevious() {
    setCurrentPage((prevCurrentPage) =>
      Math.max(0, prevCurrentPage - 1)
    )
  }

  function handleNext() {
    const maxPage =
      Math.ceil(sensors.length / visibleCount) - 1

    setCurrentPage((prevCurrentPage) =>
      Math.min(maxPage, prevCurrentPage + 1)
    )
  }

  function handleDotClick(index) {
    setCurrentPage(index)
  }

  function handleDetails() {
    navigate('/catalog')
  }

  const totalPages = Math.ceil(
    sensors.length / visibleCount
  )

  const startIndex = currentPage * visibleCount

  const visibleSensors = sensors.slice(
    startIndex,
    startIndex + visibleCount
  )

  return (
    <section
      className="experience-section"
      id="experience"
    >
      <div className="exp-header">
        <h2 className="exp-main-title">
          Опыт внедрения
        </h2>

        <div className="exp-subtitle-badge">
          Где уже работают
          <br />
          наши регистраторы
        </div>
      </div>

      <div className="exp-content-wrapper">

        <div className="exp-slider-container">
          {visibleSensors.map((sensor) => (
            <SensorCard
              key={sensor.id}
              sensor={sensor}
            />
          ))}
        </div>

        <div className="exp-actions-sidebar">

          <div className="exp-buttons-group">

            <a
              href="#"
              className="exp-btn exp-btn-primary"
            >
              ЗАКАЗАТЬ
            </a>

            <button
              type="button"
              className="exp-btn exp-btn-secondary"
              onClick={handleDetails}
            >
              ПОДРОБНЕЕ
            </button>

          </div>

          <div className="exp-slider-controls">

            <button
              type="button"
              className={`exp-arrow-btn ${
                currentPage === 0 ? 'disabled' : ''
              }`}
              aria-label="Назад"
              onClick={handlePrevious}
              disabled={currentPage === 0}
            />

            <div className="exp-dots-container">
              {Array.from({ length: totalPages }).map(
                (_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`exp-dot ${
                      index === currentPage ? 'active' : ''
                    }`}
                    aria-label={`Страница ${index + 1}`}
                    onClick={() =>
                      handleDotClick(index)
                    }
                  />
                )
              )}
            </div>

            <button
              type="button"
              className={`exp-arrow-btn ${
                currentPage === totalPages - 1
                  ? 'disabled'
                  : ''
              }`}
              aria-label="Вперед"
              onClick={handleNext}
              disabled={
                currentPage === totalPages - 1
              }
            />

          </div>

        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
