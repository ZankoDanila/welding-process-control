import React from 'react'
import './SensorCard.css'

function SensorCard({ sensor }) {
  return (
    <article className="exp-sensor-card">
        <img
          src={sensor.image}
          alt={sensor.title}
        />

        <div className="exp-sensor-info">
          <h3 className="exp-sensor-title">
            {sensor.title}
          </h3>

          <div className="exp-sensor-company">
            {sensor.company}
          </div>
        </div>
      </article>
    )
}
export default SensorCard
