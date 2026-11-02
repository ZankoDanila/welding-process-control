
const { News } = require('../models');

const {
    parseId,
    isValidBody,
    pickFields,
    validateStrings,
    checkRequiredFields,
    handleError,
} = require('../utils/helpers');

const FIELDS = [
    'image',
    'publishedAt',
    'category',
    'title',
    'text',
];

const REQUIRED_FIELDS = [...FIELDS];

function prepareNewsData(body) {
    const data = pickFields(body, FIELDS);

    validateStrings(data, FIELDS);

    return data;
}

// GET /api/news
async function getNews(req, res) {
    try {
        const news = await News.findAll({
            order: [['publishedAt', 'DESC']],
        });

        res.json(news);
    } catch (error) {
        handleError(res, error, 'Не удалось получить новости.');
    }
}

// GET /api/news/:id
async function getNewsById(req, res) {
    try {
        const id = parseId(req.params.id);

        if (!id) {
            return res.status(400).json({
                error: 'Некорректный идентификатор новости.',
            });
        }

        const newsItem = await News.findByPk(id);

        if (!newsItem) {
            return res.status(404).json({
                error: 'Новость не найдена.',
            });
        }

        res.json(newsItem);
    } catch (error) {
        handleError(res, error, 'Не удалось получить новость.');
    }
}

// POST /api/news
async function createNews(req, res) {
    try {
        if (!isValidBody(req.body)) {
            return res.status(400).json({
                error: 'Переданы некорректные данные.',
            });
        }

        const data = prepareNewsData(req.body);

        checkRequiredFields(data, REQUIRED_FIELDS);

        const newsItem = await News.create(data);

        res.status(201).json(newsItem);
    } catch (error) {
        handleError(res, error, 'Не удалось добавить новость.');
    }
}

// PUT /api/news/:id
async function updateNews(req, res) {
    try {
        const id = parseId(req.params.id);

        if (!id) {
            return res.status(400).json({
                error: 'Некорректный идентификатор новости.',
            });
        }

        if (!isValidBody(req.body)) {
            return res.status(400).json({
                error: 'Переданы некорректные данные.',
            });
        }

        const newsItem = await News.findByPk(id);

        if (!newsItem) {
            return res.status(404).json({
                error: 'Новость не найдена.',
            });
        }

        const updates = prepareNewsData(req.body);

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                error: 'Не переданы поля для изменения.',
            });
        }

        await newsItem.update(updates);

        res.json(newsItem);
    } catch (error) {
        handleError(res, error, 'Не удалось изменить новость.');
    }
}

// DELETE /api/news/:id
async function deleteNews(req, res) {
    try {
        const id = parseId(req.params.id);

        if (!id) {
            return res.status(400).json({
                error: 'Некорректный идентификатор новости.',
            });
        }

        const newsItem = await News.findByPk(id);

        if (!newsItem) {
            return res.status(404).json({
                error: 'Новость не найдена.',
            });
        }

        await newsItem.destroy();

        res.json({
            message: 'Новость успешно удалена.',
            id,
        });
    } catch (error) {
        handleError(res, error, 'Не удалось удалить новость.');
    }
}

module.exports = {
    getNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews,
};
