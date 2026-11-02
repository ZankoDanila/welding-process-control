
const { Review, Sensor } = require('../models');

const {
    parseId,
    isValidBody,
    pickFields,
    validateStrings,
    checkRequiredFields,
    handleError,
} = require('../utils/helpers');

const FIELDS = [
    'sensorId',
    'company',
    'authorName',
    'authorRole',
    'text',
    'rating',
    'reviewDate',
];

const STRING_FIELDS = [
    'company',
    'authorName',
    'authorRole',
    'text',
    'reviewDate',
];

const REQUIRED_FIELDS = [...FIELDS];

async function prepareReviewData(body) {
    const data = pickFields(body, FIELDS);

    validateStrings(data, STRING_FIELDS);

    if (data.sensorId !== undefined) {
        data.sensorId = parseId(data.sensorId);

        if (!data.sensorId) {
            const error = new Error(
                'Некорректный идентификатор оборудования.'
            );
            error.status = 400;
            throw error;
        }

        const sensor = await Sensor.findByPk(data.sensorId);

        if (!sensor) {
            const error = new Error(
                'Оборудование для этого отзыва не найдено.'
            );
            error.status = 400;
            throw error;
        }
    }

    if (data.rating !== undefined) {
        data.rating = Number(data.rating);

        if (
            !Number.isInteger(data.rating) ||
            data.rating < 1 ||
            data.rating > 5
        ) {
            const error = new Error(
                'Оценка должна быть целым числом от 1 до 5.'
            );
            error.status = 400;
            throw error;
        }
    }

    return data;
}

// GET /api/reviews
async function getReviews(req, res) {
    try {
        const reviews = await Review.findAll();

        res.json(reviews);
    } catch (error) {
        handleError(res, error, 'Не удалось получить отзывы.');
    }
}

// GET /api/reviews/:id
async function getReviewById(req, res) {
    try {
        const id = parseId(req.params.id);

        if (!id) {
            return res.status(400).json({
                error: 'Некорректный идентификатор отзыва.',
            });
        }

        const review = await Review.findByPk(id);

        if (!review) {
            return res.status(404).json({
                error: 'Отзыв не найден.',
            });
        }

        res.json(review);
    } catch (error) {
        handleError(res, error, 'Не удалось получить отзыв.');
    }
}

// POST /api/reviews
async function createReview(req, res) {
    try {
        if (!isValidBody(req.body)) {
            return res.status(400).json({
                error: 'Переданы некорректные данные.',
            });
        }

        const data = await prepareReviewData(req.body);

        checkRequiredFields(data, REQUIRED_FIELDS);

        const review = await Review.create(data);

        res.status(201).json(review);
    } catch (error) {
        handleError(res, error, 'Не удалось добавить отзыв.');
    }
}

// PUT /api/reviews/:id
async function updateReview(req, res) {
    try {
        const id = parseId(req.params.id);

        if (!id) {
            return res.status(400).json({
                error: 'Некорректный идентификатор отзыва.',
            });
        }

        if (!isValidBody(req.body)) {
            return res.status(400).json({
                error: 'Переданы некорректные данные.',
            });
        }

        const review = await Review.findByPk(id);

        if (!review) {
            return res.status(404).json({
                error: 'Отзыв не найден.',
            });
        }

        const updates = await prepareReviewData(req.body);

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                error: 'Не переданы поля для изменения.',
            });
        }

        await review.update(updates);

        res.json(review);
    } catch (error) {
        handleError(res, error, 'Не удалось изменить отзыв.');
    }
}

// DELETE /api/reviews/:id
async function deleteReview(req, res) {
    try {
        const id = parseId(req.params.id);

        if (!id) {
            return res.status(400).json({
                error: 'Некорректный идентификатор отзыва.',
            });
        }

        const review = await Review.findByPk(id);

        if (!review) {
            return res.status(404).json({
                error: 'Отзыв не найден.',
            });
        }

        await review.destroy();

        res.json({
            message: 'Отзыв успешно удалён.',
            id,
        });
    } catch (error) {
        handleError(res, error, 'Не удалось удалить отзыв.');
    }
}

module.exports = {
    getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
};
