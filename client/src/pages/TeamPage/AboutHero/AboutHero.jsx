import './AboutHero.css'

function AboutHero() {
    return (
        <section className="about-hero-section">

            <div className="about-hero__overlay" />

            <div className="about-container">

                <div className="about-content-left">

                    <h1 className="about-title">
                        Белорусско-Российский университет
                    </h1>

                    <div className="about-card about-card--wide">
                        <p>
                            Наш проект зародился и развивается
                            на базе Белорусско-Российского
                            университета (БРУ) — ведущего
                            научно-образовательного центра,
                            объединяющего передовые
                            инженерные школы двух стран.
                        </p>
                    </div>

                    <div className="about-cards-row">

                        <div className="about-card about-card--small">
                            <p>
                                Мы переносим классические
                                промышленные процессы в эпоху
                                цифровых технологий. Опираясь
                                на исследовательскую базу
                                кафедры «Оборудование и
                                технология сварочного
                                производства», наша команда
                                разрабатывает решения, которые
                                делают контроль качества
                                автоматическим, прозрачным
                                и независимым от человеческого
                                фактора.
                            </p>
                        </div>

                        <div className="about-card about-card--small">
                            <p>
                                Каждый регистратор проходит
                                полный цикл апробации в
                                научно-производственных
                                лабораториях университета.
                                Наличие собственной базы
                                неразрушающего контроля
                                позволяет нам оперативно
                                тестировать оборудование,
                                калибровать датчики и
                                адаптировать систему под
                                жесткие стандарты реального
                                сектора.
                            </p>
                        </div>

                    </div>

                </div>

                <div className="about-collage-right">

                    <img
                        src="/img/team_photo_1.jpg"
                        alt="Процесс работы 1"
                        className="collage-img img-top"
                    />

                    <img
                        src="/img/team_photo_2.jpg"
                        alt="Процесс работы 2"
                        className="collage-img img-middle"
                    />

                    <a
                        href="https://bru.by"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="img-bottom-link"
                    >
                        <img
                            src="/img/bru_small_logo.jpg"
                            alt="Сайт БРУ"
                            className="logo-link-img"
                        />
                    </a>

                </div>

            </div>

        </section>
    )
}

export default AboutHero
