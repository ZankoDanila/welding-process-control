import { useState } from 'react'

import DeveloperCard from '../DeveloperCard/DeveloperCard'

import './Developers.css'

const MEMBERS_PER_PAGE = 4

function Developers({ team }) {
    const [currentPage, setCurrentPage] = useState(0)

    const leaders = team.leaders || []
    const members = team.members || []

    const totalPages = Math.ceil(
        members.length / MEMBERS_PER_PAGE
    )

    const startIndex =
        currentPage * MEMBERS_PER_PAGE

    const visibleMembers = members.slice(
        startIndex,
        startIndex + MEMBERS_PER_PAGE
    )

    function handlePrevious() {
        setCurrentPage((prev) =>
            Math.max(0, prev - 1)
        )
    }

    function handleNext() {
        setCurrentPage((prev) =>
            Math.min(totalPages - 1, prev + 1)
        )
    }

    return (
        <section
            className="developers-section"
            id="developers"
        >

            <header className="developers-header">

                <h2 className="developers-title">
                    Участники-разработчики
                    <br />
                    проекта
                </h2>

                <div className="developers-header-icon">
                    <span />
                    <span />
                    <span />
                </div>

            </header>

            {/* =================================================
                РУКОВОДИТЕЛИ
            ================================================= */}

            <div className="leaders-grid">

                {leaders.map((person) => (
                    <DeveloperCard
                        key={`leader-${person.id}`}
                        person={person}
                        variant="leader"
                    />
                ))}

            </div>

            {/* =================================================
                УЧАСТНИКИ
            ================================================= */}

            {members.length > 0 && (
                <div className="members-carousel">

                    <button
                        type="button"
                        className="carousel-arrow"
                        aria-label="Назад"
                        onClick={handlePrevious}
                        disabled={currentPage === 0}
                    >
                        ‹
                    </button>

                    <div className="members-grid">

                        {visibleMembers.map((person) => (
                            <DeveloperCard
                                key={`member-${person.id}`}
                                person={person}
                                variant="member"
                            />
                        ))}

                    </div>

                    <button
                        type="button"
                        className="carousel-arrow"
                        aria-label="Вперед"
                        onClick={handleNext}
                        disabled={
                            currentPage === totalPages - 1
                        }
                    >
                        ›
                    </button>

                </div>
            )}

        </section>
    )
}

export default Developers
