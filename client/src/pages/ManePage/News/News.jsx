
import { useEffect, useRef, useState } from 'react'

import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Modal from 'react-bootstrap/Modal'
import CloseButton from 'react-bootstrap/CloseButton'
import Image from 'react-bootstrap/Image'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

import './News.css'


// Полная дата для модального окна
function formatNewsDate(value) {
    if (!value) {
        return ''
    }

    const dateString = String(value)
    const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/)

    const date = match
        ? new Date(
            Number(match[1]),
            Number(match[2]) - 1,
            Number(match[3])
        )
        : new Date(value)

    if (Number.isNaN(date.getTime())) {
        return dateString
    }

    return new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date)
}


// Короткая дата на карточке: например, «14 апр»
function formatNewsDateBadge(value) {
    if (!value) {
        return ''
    }

    const dateString = String(value)
    const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/)

    const date = match
        ? new Date(
            Number(match[1]),
            Number(match[2]) - 1,
            Number(match[3])
        )
        : new Date(value)

    if (Number.isNaN(date.getTime())) {
        return dateString
    }

    return new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'short',
    })
        .format(date)
        .replace(/\.$/, '')
}


// Формируем путь изображения
function getNewsImageSrc(image) {
    if (!image) {
        return '/img/news-1.png'
    }

    if (
        /^(https?:\/\/|data:|blob:)/i.test(image) ||
        image.startsWith('/')
    ) {
        return image
    }

    return `/${image.replace(/^\.?\//, '')}`
}


// Преобразуем текст старых публикаций
// в обычный текст без HTML-разметки
function getPlainNewsText(value) {
    if (!value) {
        return ''
    }

    return String(value)
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/p\s*>/gi, '\n\n')
        .replace(/<p\b[^>]*>/gi, '')
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .trim()
}


// Выбираем цвет метки по типу новости
function getNewsCategoryClass(category) {
    const value = String(category || '').toLowerCase()

    if (value.includes('разработ')) {
        return 'news-category--development'
    }

    if (value.includes('испыт')) {
        return 'news-category--testing'
    }

    if (value.includes('производ')) {
        return 'news-category--production'
    }

    if (value.includes('событ')) {
        return 'news-category--events'
    }

    if (value.includes('университет')) {
        return 'news-category--university'
    }

    return 'news-category--default'
}


function News({ news = [] }) {
    const viewportRef = useRef(null)

    const [selectedNews, setSelectedNews] = useState(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)


    // Проверяем, можно ли листать ленту в обе стороны
    useEffect(() => {
        const viewport = viewportRef.current

        if (!viewport) {
            return
        }

        function updateScrollButtons() {
            setCanScrollLeft(viewport.scrollLeft > 2)

            setCanScrollRight(
                viewport.scrollLeft + viewport.clientWidth <
                viewport.scrollWidth - 2
            )
        }

        viewport.addEventListener(
            'scroll',
            updateScrollButtons,
            { passive: true }
        )

        window.addEventListener(
            'resize',
            updateScrollButtons
        )

        const track = viewport.querySelector(
            '.news-carousel-track'
        )

        let resizeObserver

        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(
                updateScrollButtons
            )

            resizeObserver.observe(viewport)

            if (track) {
                resizeObserver.observe(track)
            }
        }

        const animationFrame = window.requestAnimationFrame(
            updateScrollButtons
        )

        return () => {
            viewport.removeEventListener(
                'scroll',
                updateScrollButtons
            )

            window.removeEventListener(
                'resize',
                updateScrollButtons
            )

            resizeObserver?.disconnect()

            window.cancelAnimationFrame(animationFrame)
        }
    }, [news])


    // Перемещаем ленту на ширину одной карточки
    function handleScroll(direction) {
        const viewport = viewportRef.current

        if (!viewport) {
            return
        }

        const card = viewport.querySelector('.news-card')
        const track = viewport.querySelector('.news-carousel-track')

        if (!card || !track) {
            return
        }

        const cardWidth = card.getBoundingClientRect().width
        const trackStyles = window.getComputedStyle(track)

        const gap =
            parseFloat(trackStyles.columnGap) ||
            parseFloat(trackStyles.gap) ||
            20

        viewport.scrollBy({
            left: direction * (cardWidth + gap),
            behavior: 'smooth',
        })
    }


    // Открываем полную публикацию
    function handleNewsClick(newsItem) {
        setSelectedNews(newsItem)
    }


    // Закрываем модальное окно
    function handleCloseModal() {
        setSelectedNews(null)
    }


    return (
        <>
            <section
                className="news-section"
                id="news"
            >
                <div className="news-container">

                    {/* Заголовок раздела */}
                    <div className="news-header-badge">
                        <h2 className="news-main-title">
                            Блог и новости
                        </h2>
                    </div>


                    {/* Если публикаций нет */}
                    {news.length === 0 ? (
                        <Alert
                            variant="info"
                            className="news-empty-alert"
                        >
                            Новости пока отсутствуют.
                        </Alert>
                    ) : (
                        <section className="news-list">

                            <div className="news-section-label">
                                Все новости
                            </div>


                            <div className="news-slider-wrapper">

                                {/* Стрелка влево */}
                                <button
                                    type="button"
                                    className="slider-btn btn-prev"
                                    aria-label="Предыдущая новость"
                                    onClick={() => handleScroll(-1)}
                                    disabled={!canScrollLeft}
                                >
                                    <span className="arrow-icon left" />
                                </button>


                                {/* Горизонтальная лента */}
                                <div
                                    className="news-carousel-viewport"
                                    ref={viewportRef}
                                >
                                    <div className="news-carousel-track">

                                        {news.map((newsItem) => (
                                            <Card
                                                key={newsItem.id}
                                                className="news-card"
                                            >

                                                {/* Фото и дата */}
                                                <div className="news-card__image-wrapper">

                                                    <Card.Img
                                                        variant="top"
                                                        src={getNewsImageSrc(
                                                            newsItem.image
                                                        )}
                                                        alt={
                                                            newsItem.title ||
                                                            'Новость'
                                                        }
                                                        className="news-card__image"
                                                    />

                                                    {newsItem.publishedAt && (
                                                        <time
                                                            className="news-card__date-badge"
                                                            dateTime={String(
                                                                newsItem.publishedAt
                                                            )}
                                                        >
                                                            {formatNewsDateBadge(
                                                                newsItem.publishedAt
                                                            )}
                                                        </time>
                                                    )}

                                                </div>


                                                {/* Текстовая часть */}
                                                <Card.Body className="news-card__body">

                                                    {newsItem.category && (
                                                        <Badge
                                                            className={`news-card__badge ${getNewsCategoryClass(
                                                                newsItem.category
                                                            )}`}
                                                        >
                                                            {newsItem.category}
                                                        </Badge>
                                                    )}


                                                    <Card.Title
                                                        as="h3"
                                                        className="news-card__title"
                                                    >
                                                        {newsItem.title}
                                                    </Card.Title>


                                                    {/* Открываем полную публикацию */}
                                                    <Button
                                                        type="button"
                                                        variant="link"
                                                        className="news-card__link"
                                                        onClick={() =>
                                                            handleNewsClick(
                                                                newsItem
                                                            )
                                                        }
                                                    >
                                                        читать →
                                                    </Button>

                                                </Card.Body>

                                            </Card>
                                        ))}

                                    </div>
                                </div>


                                {/* Стрелка вправо */}
                                <button
                                    type="button"
                                    className="slider-btn btn-next"
                                    aria-label="Следующая новость"
                                    onClick={() => handleScroll(1)}
                                    disabled={!canScrollRight}
                                >
                                    <span className="arrow-icon right" />
                                </button>

                            </div>
                        </section>
                    )}

                </div>
            </section>


            {/* Модальное окно с полной публикацией */}
            <Modal
                show={selectedNews !== null}
                onHide={handleCloseModal}
                centered
                size="lg"
                scrollable
                className="news-modal"
            >
                {selectedNews && (
                    <>
                        <Modal.Header className="news-modal__header">

                            <div className="news-modal__header-inner">

                                <div className="news-modal__meta">

                                    {selectedNews.category && (
                                        <Badge
                                            className={`news-modal__badge ${getNewsCategoryClass(
                                                selectedNews.category
                                            )}`}
                                        >
                                            {selectedNews.category}
                                        </Badge>
                                    )}

                                    {selectedNews.publishedAt && (
                                        <time
                                            className="news-modal__date"
                                            dateTime={String(
                                                selectedNews.publishedAt
                                            )}
                                        >
                                            {formatNewsDate(
                                                selectedNews.publishedAt
                                            )}
                                        </time>
                                    )}

                                </div>

                                <CloseButton
                                    onClick={handleCloseModal}
                                    aria-label="Закрыть новость"
                                    className="news-modal__close"
                                />

                            </div>

                        </Modal.Header>


                        <Modal.Body className="news-modal__body">

                            <Image
                                src={getNewsImageSrc(
                                    selectedNews.image
                                )}
                                alt={
                                    selectedNews.title ||
                                    'Новость'
                                }
                                fluid
                                className="news-modal__image"
                            />

                            <div className="news-modal__content">

                                <h3 className="news-modal__title">
                                    {selectedNews.title}
                                </h3>

                                <p className="news-modal__text">
                                    {getPlainNewsText(
                                        selectedNews.text
                                    )}
                                </p>

                            </div>

                        </Modal.Body>
                    </>
                )}
            </Modal>
        </>
    )
}

export default News
