import { useEffect, useState } from 'react'

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import AboutHero from './AboutHero/AboutHero'
import ProjectLeader from './ProjectLeader/ProjectLeader'
import Developers from './Developers/Developers'

import './TeamPage.css'

function TeamPage() {
    const [team, setTeam] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        async function loadTeam() {
            try {
                const response = await fetch('/data/db.json')

                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`)
                }

                const data = await response.json()

                setTeam(data.team || null)
            } catch (error) {
                console.error(
                    'Ошибка загрузки команды:',
                    error
                )

                setError(
                    'Не удалось загрузить данные команды'
                )
            }
        }

        loadTeam()
    }, [])

    if (error) {
        return (
            <div className="team-page">
                <Header />

                <main className="team-page__main">
                    <div className="team-page__status team-page__status--error">
                        {error}
                    </div>
                </main>

                <Footer />
            </div>
        )
    }

    if (!team) {
        return (
            <div className="team-page">
                <Header />

                <main className="team-page__main">
                    <div className="team-page__status">
                        Загрузка команды...
                    </div>
                </main>

                <Footer />
            </div>
        )
    }

    return (
        <div className="team-page">

            <Header />

            <main className="team-page__main">

                <AboutHero />

                <ProjectLeader />

                <Developers
                    team={team}
                />

            </main>

            <Footer />

        </div>
    )
}

export default TeamPage
