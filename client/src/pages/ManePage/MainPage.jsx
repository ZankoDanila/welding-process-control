import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import Hero from './Hero/Hero'
import ExperienceSection from './Experience/ExperienceSection'
import Reviews from './Reviews/Reviews'
import Complectation from './Complectation/Complectation'
import SoftwareSection from '../../components/SoftwareSection/SoftwareSection'
import Benefits from './Benefits/Benefits'
import Team from './Team/Team'
import News from './News/News'

import './MainPage.css'

function MainPage() {
  const organizationName = 'Белорусско-Российский университет'
  const pageTitle = 'Мобильный регистратор'
const location = useLocation()

  const heroFeatures = [
    {
      id: 1,
      text: 'повышение качества сварки ответственных конструкций путём контроля за соблюдением технологии при производстве сварочных работ',
    },
    {
      id: 2,
      text: 'повышение эффективности управления сварочным производством за счёт оперативного предоставления точной информации о работе оборудования и сварщика',
    },
  ]

  const [data, setData] = useState(null)
  const [error, setError] = useState('')

useEffect(() => {
  if (!location.hash) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    return
  }

  const element = document.querySelector(
    location.hash
  )

  if (!element) {
    return
  }

  setTimeout(() => {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, 0)
}, [location.hash])

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/data/db.json')

        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`)
        }

        const result = await response.json()

        setData(result)
      } catch (error) {
        console.error('Ошибка загрузки данных:', error)

        setError('Не удалось загрузить данные')
      }
    }

    loadData()
  }, [])

  if (error) {
    return <div>{error}</div>
  }

  if (!data) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="main-page">

      <Header
        organizationName={organizationName}
      />

      <main className="main-content">

        <Hero
          title={pageTitle}
          features={heroFeatures}
        />

        <ExperienceSection
          sensors={data.sensors}
        />

        <Reviews
          reviews={data.reviews}
        />

        <Complectation />

<SoftwareSection />

        <Benefits />

        <Team
          team={data.team}
        />

        <News
          news={data.news}
        />

      </main>

      <Footer />

    </div>
  )
}

export default MainPage
