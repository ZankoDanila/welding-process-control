
const { Sensor, Review } = require('../models');

const {
    parseId,
    isValidBody,
    pickFields,
    validateStrings,
    checkRequiredFields,
    handleError,
} = require('../utils/helpers');

const FIELDS = [
    'title',
    'company',
    'image',
    'logo',
    'summary',
    'advantages',
    'productionManagement',
    'capabilities',
];

const STRING_FIELDS = FIELDS.filter(field => field !== 'logo');

const REQUIRED_FIELDS = [
    'title',
    'company',
];

// Подготовка данных оборудования
function prepareSensorData(body) {
    const data = pickFields(body, FIELDS);

    // Логотип может быть null
    if (data.logo !== undefined && data.logo !== null) {
        validateStrings(data, ['logo'], ['logo']);
    }

    validateStrings(data, STRING_FIELDS, [
        'summary',
        'advantages',
        'productionManagement',
        'capabilities',
    ]);

    // Изображение по умолчанию
    if (data.image === '') {
        data.image = '/img/sensor.png';
    }

    return data;
}

// GET /api/sensors
async function getSensors(req, res) {
    try {
        const sensors = await Sensor.findAll({
            include: [{
                model: Review,
                as: 'reviews',
            }],
        });

        res.json(sensors);
    } catch (error) {
        handleError(res, error, 'Не удалось получить оборудование.');
    }
}

// GET /api/sensors/:id
async function getSensorById(req, res) {
    try {
        const id = parseId(req.params.id);

        if (!id) {
            return res.status(400).json({
                error: 'Некорректный идентификатор оборудования.',
            });
        }

        const sensor = await Sensor.findByPk(id, {
            include: [{
                model: Review,
                as: 'reviews',
            }],
        });

        if (!sensor) {
            return res.status(404).json({
                error: 'Оборудование не найдено.',
            });
        }

        res.json(sensor);
    } catch (error) {
        handleError(res, error, 'Не удалось получить оборудование.');
    }
}

// POST /api/sensors
async function createSensor(req, res) {
    try {
        if (!isValidBody(req.body)) {
            return res.status(400).json({
                error: 'Переданы некорректные данные.',
            });
        }

        const data = prepareSensorData(req.body);

        if (data.image === undefined) {
            data.image = '/img/sensor.png';
        }

        if (data.logo === undefined) {
            data.logo = null;
        }

        checkRequiredFields(data, REQUIRED_FIELDS);

        const sensor = await Sensor.create(data);

        res.status(201).json(sensor);
    } catch (error) {
        handleError(res, error, 'Не удалось добавить оборудование.');
    }
}

// PUT /api/sensors/:id
async function updateSensor(req, res) {
    try {
        const id = parseId(req.params.id);

        if (!id) {
            return res.status(400).json({
                error: 'Некорректный идентификатор оборудования.',
            });
        }

        if (!isValidBody(req.body)) {
            return res.status(400).json({
                error: 'Переданы некорректные данные.',
            });
        }

        const sensor = await Sensor.findByPk(id);

        if (!sensor) {
            return res.status(404).json({
                error: 'Оборудование не найдено.',
            });
        }

        const updates = prepareSensorData(req.body);

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                error: 'Не переданы поля для изменения.',
            });
        }

        await sensor.update(updates);

        res.json(sensor);
    } catch (error) {
        handleError(res, error, 'Не удалось изменить оборудование.');
    }
}

// DELETE /api/sensors/:id
async function deleteSensor(req, res) {
    try {
        const id = parseId(req.params.id);

        if (!id) {
            return res.status(400).json({
                error: 'Некорректный идентификатор оборудования.',
            });
        }

        const sensor = await Sensor.findByPk(id);

        if (!sensor) {
            return res.status(404).json({
                error: 'Оборудование не найдено.',
            });
        }

        await sensor.destroy();

        res.json({
            message: 'Оборудование успешно удалено.',
            id,
        });
    } catch (error) {
        handleError(res, error, 'Не удалось удалить оборудование.');
    }
}

module.exports = {
    getSensors,
    getSensorById,
    createSensor,
    updateSensor,
    deleteSensor,
};
