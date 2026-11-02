import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'

import { useNavigate } from 'react-router-dom'

import './NotFoundPage.css'

function NotFoundPage() {
  const navigate = useNavigate()

  function handleGoBack() {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }

    navigate('/')
  }

  return (
    <main className="not-found-page">

      <Container className="not-found-container">

        <Card className="not-found-card">

          <Card.Body className="not-found-card__body">

            <Badge className="not-found-badge">
              ОШИБКА 404
            </Badge>

            <div className="not-found-code">
              404
            </div>

            <Card.Title className="not-found-title">
              Похоже, что-то пошло не по плану
            </Card.Title>

            <Card.Text className="not-found-text">
              Страница, которую вы пытаетесь открыть,
              не существует или была перемещена.
            </Card.Text>

            <Button
              type="button"
              className="not-found-button"
              onClick={handleGoBack}
            >
              Вернуться назад
            </Button>

          </Card.Body>

        </Card>

      </Container>

    </main>
  )
}

export default NotFoundPage
