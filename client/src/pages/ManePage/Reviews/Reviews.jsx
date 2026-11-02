import { useEffect, useState } from 'react'
import './Reviews.css'

function Reviews({ reviews }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const [visibleCards, setVisibleCards] = useState(
    getVisibleCardsCount()
  )

  function getVisibleCardsCount() {
    if (window.innerWidth <= 768) {
      return 1
    }

    if (window.innerWidth <= 1000) {
      return 2
    }

    return 3
  }

  useEffect(() => {
    function handleResize() {
      const newVisibleCards = getVisibleCardsCount()

      setVisibleCards(newVisibleCards)

      const newMaxIndex = Math.max(
        0,
        reviews.length - newVisibleCards
      )

      setCurrentIndex((prevIndex) =>
        Math.min(prevIndex, newMaxIndex)
      )
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [reviews.length])

  useEffect(() => {
    const maxIndex = Math.max(
      0,
      reviews.length - visibleCards
    )

    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex, maxIndex)
    )
  }, [reviews.length, visibleCards])

  function handlePrevious() {
    setCurrentIndex((prevIndex) =>
      Math.max(0, prevIndex - 1)
    )
  }

  function handleNext() {
    const maxIndex = Math.max(
      0,
      reviews.length - visibleCards
    )

    setCurrentIndex((prevIndex) =>
      Math.min(maxIndex, prevIndex + 1)
    )
  }

  const maxIndex = Math.max(
    0,
    reviews.length - visibleCards
  )

  return (
    <section className="reviews" id="reviews">
      <div className="reviews__inner">

        <button
          type="button"
          className="reviews__arrow reviews__arrow--prev"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          aria-label="Предыдущий отзыв"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#004A8F"
            strokeWidth="4"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="reviews__track-wrapper">
          <div
            className="reviews__track"
            style={{
              '--reviews-index': currentIndex,
            }}
          >
            {reviews.map((review) => (
              <article
                className="review-card"
                key={review.id}
              >
                <div className="review-product">
                  {review.product}
                </div>

                <div className="review-company">
                  {review.company}
                </div>

                <div className="review-author-name">
                  {review.authorName}
                </div>

                <div className="review-author-role">
                  {review.authorRole}
                </div>

                <p className="review-text">
                  {review.text}
                </p>

                <div className="review-footer">
                  <div className="review-star"></div>

                  <div className="review-rating">
                    {review.rating}
                  </div>

                  <div className="review-date">
                    {review.date}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="reviews__arrow reviews__arrow--next"
          onClick={handleNext}
          disabled={currentIndex === maxIndex}
          aria-label="Следующий отзыв"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#004A8F"
            strokeWidth="4"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>

      </div>
    </section>
  )
}

export default Reviews
