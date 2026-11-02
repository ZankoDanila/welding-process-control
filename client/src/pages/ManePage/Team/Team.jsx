import { Link } from 'react-router'
import './Team.css'

function Team() {
    return (
        <section className="team-section" id="team">

            <div className="team-container">

                <div className="team-content-wrapper">

                    {/* =====================================================
                        ЛЕВАЯ ЧАСТЬ
                    ===================================================== */}

                    <div className="team-left-col">

                        <div className="team-header-block">

                            <div className="team-icon-wrapper">
                                <img
                                    src="/img/icon-team.svg"
                                    alt=""
                                    className="team-header-icon"
                                />
                            </div>

                            <h2 className="team-main-title">
                                О нашей команде
                            </h2>

                        </div>


                        <div className="team-blue-card">

                            <div className="blue-card-inner-content">

                                <div className="text-and-button-group">

                                    <p className="team-description-text">
                                        Мы объединяем научную базу
                                        Белорусско-Российского университета
                                        с передовыми технологиями мониторинга
                                        для автоматизации и контроля качества
                                        вашего производства.
                                    </p>

                                    <Link
                                        to="/team"
                                        className="btn-team-more"
                                    >
                                        Подробнее о нашей команде
                                    </Link>

                                </div>


                                <div className="card-embedded-logo">

                                    <a
                                        href="https://bru.by"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src="/img/BRU_logo2.png"
                                            alt="Логотип БРУ"
                                            className="bru-card-img"
                                        />
                                    </a>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =====================================================
                        ПРАВАЯ ЧАСТЬ
                    ===================================================== */}

                    <div className="team-main-photo-block">

                        <img
                            src="/img/team-photo.png"
                            alt="Лаборатория и робот"
                            className="team-main-photo"
                        />

                    </div>

                </div>

            </div>

        </section>
    )
}

export default Team
