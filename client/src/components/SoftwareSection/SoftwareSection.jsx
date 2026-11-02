import React from 'react'

import MobileApp from '../../pages/ManePage/MobileApp/MobileApp'
import WebApp from '../../pages/ManePage/WebApp/WebApp'

import './SoftwareSection.css'

import './SoftwareSection.css'

function SoftwareSection() {
  return (
    <section className="software-section">
      <div className="software-section-container">

        <div className="software-section-header">
          <h2 className="software-section-title">
            Программные возможности
          </h2>

          <p className="software-section-description">
            Работа с данными и управление системой
          </p>
        </div>

        <div className="software-section-grid">
          <div className="software-section-column">
            <MobileApp />
          </div>

          <div className="software-section-column">
            <WebApp />
          </div>
        </div>

      </div>
    </section>
  )
}

export default SoftwareSection
