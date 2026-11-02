import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'

import './Complectation.css'

const features = [
  {
    id: '01',
    title: 'Универсальность и контроль доступа',
    description:
      'Работа с различным сварочным оборудованием. Система поддерживает радиочастотную идентификацию сварщика по индивидуальному удостоверению для разграничения прав и учёта.',
  },
  {
    id: '02',
    title: 'Мониторинг и передача данных',
    description:
      'Измерение и сохранение параметров на внешний носитель. Данные о сварочном токе, напряжении на дуге и температуре околошовной зоны передаются по Wi-Fi на мобильное устройство в режиме реального времени.',
  },
  {
    id: '03',
    title: 'Безопасность и автоматизация',
    description:
      'Автоматическая блокировка работы сварочного аппарата при нарушениях. При длительном отклонении от заданных параметров система включает внешнюю сигнализацию.',
  },
]

function Complectation() {
  return (
    <section
      className="complectation-section"
      id="complectation"
    >
      <Container className="complectation-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="complectation-header">

          <div className="complectation-header-line"></div>

          <div className="complectation-eyebrow">
            Аппаратная часть системы
          </div>

          <h2 className="complectation-title">
            Комплектация мобильного регистратора
          </h2>

          <p className="complectation-intro">
            Основные элементы оборудования и их взаимодействие
            при контроле параметров сварочного процесса.
          </p>

        </header>


        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <Row
          className="complectation-main-row"
          xs={1}
          lg={2}
        >

          {/* =================================================
              LEFT — FEATURES
          ================================================= */}

          <Col className="complectation-features-column">

            <div className="complectation-column-heading">


              <div>
                <strong>
                  Возможности системы
                </strong>

                <small>
                  Основные функции аппаратного комплекса
                </small>
              </div>

            </div>


            <div className="complectation-features">

              {features.map((feature) => (
                <Card
                  key={feature.id}
                  className="complectation-feature-card"
                >
                  <Card.Body className="complectation-feature-body">


                    <div className="complectation-feature-icon">
                      <img
                        src="/img/tick.png"
                        alt=""
                      />
                    </div>

                    <div className="complectation-feature-content">

                      <Card.Title className="complectation-feature-title">
                        {feature.title}
                      </Card.Title>

                      <Card.Text className="complectation-feature-description">
                        {feature.description}
                      </Card.Text>

                    </div>

                  </Card.Body>
                </Card>
              ))}

            </div>

          </Col>


          {/* =================================================
              RIGHT — SYSTEM DIAGRAM
          ================================================= */}

          <Col className="complectation-diagram-column">



            <div className="complectation-diagram">

              {/* ============================================
                  DEVICE 1
              ============================================ */}

              <Card className="complectation-device-card">

                <div className="complectation-device-card__top">

                  <span className="complectation-device-index">
                    01
                  </span>

                  <span>
                    Регистратор
                  </span>

                </div>


                <div className="complectation-device-image-wrapper">

                  <Badge className="complectation-placeholder-badge">
                    ЗАМЕНИТЬ НА:
                    <br />
                    РЕГИСТРАТОР + БЛОК ДАТЧИКОВ
                  </Badge>

                  <img
                    src="/img/sensor.png"
                    alt="Временное изображение регистратора"
                    className="complectation-device-image"
                  />

                </div>


                <Card.Body className="complectation-device-body">

                  <strong>
                    Регистратор с блоком датчиков
                  </strong>

                  <span>
                    Сбор и регистрация параметров
                    сварочного процесса
                  </span>

                </Card.Body>

              </Card>


              {/* ============================================
                  CONNECTION
              ============================================ */}

              <div className="complectation-connection">

                <div className="complectation-connection-line"></div>

                <div className="complectation-wifi">
                  Wi-Fi
                </div>

                <div className="complectation-connection-arrow">
                  →
                </div>

              </div>


              {/* ============================================
                  DEVICE 2
              ============================================ */}

              <Card className="complectation-device-card">

                <div className="complectation-device-card__top">

                  <span className="complectation-device-index">
                    02
                  </span>

                  <span>
                    Мобильное устройство
                  </span>

                </div>


                <div className="complectation-device-image-wrapper">

                  <Badge className="complectation-placeholder-badge">
                    ЗАМЕНИТЬ НА:
                    <br />
                    ПЛАНШЕТ С ПРИЛОЖЕНИЕМ
                  </Badge>

                  <img
                    src="/img/sensor.png"
                    alt="Временное изображение мобильного устройства"
                    className="complectation-device-image"
                  />

                </div>


                <Card.Body className="complectation-device-body">

                  <strong>
                    Мобильное устройство
                  </strong>

                  <span>
                    Отображение получаемых данных
                    и работа с системой
                  </span>

                </Card.Body>

              </Card>

            </div>


            {/* =================================================
                FLOW
            ================================================= */}

            <div className="complectation-flow">

              <div className="complectation-flow-title">
                Последовательность работы
              </div>


              <div className="complectation-flow-steps">

                <div className="complectation-flow-item">

                  <span className="complectation-flow-number">
                    01
                  </span>

                  <div>
                    <strong>
                      Измерение
                    </strong>

                    <small>
                      Сбор параметров сварки
                    </small>
                  </div>

                </div>


                <div className="complectation-flow-divider">
                  →
                </div>


                <div className="complectation-flow-item">

                  <span className="complectation-flow-number">
                    02
                  </span>

                  <div>
                    <strong>
                      Передача
                    </strong>

                    <small>
                      Передача данных по Wi-Fi
                    </small>
                  </div>

                </div>


                <div className="complectation-flow-divider">
                  →
                </div>


                <div className="complectation-flow-item">

                  <span className="complectation-flow-number">
                    03
                  </span>

                  <div>
                    <strong>
                      Контроль
                    </strong>

                    <small>
                      Работа с полученными данными
                    </small>
                  </div>

                </div>

              </div>

            </div>

          </Col>

        </Row>

      </Container>
    </section>
  )
}

export default Complectation
