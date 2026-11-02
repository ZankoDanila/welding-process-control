
function parseId(value) {
    const id = Number(value);

    return Number.isInteger(id) && id > 0 ? id : null;
}

function isValidBody(body) {
    return (
        body !== null &&
        typeof body === 'object' &&
        !Array.isArray(body)
    );
}

// Выбираем только разрешённые поля
function pickFields(body, fields) {
    const result = {};

    for (const field of fields) {
        if (Object.prototype.hasOwnProperty.call(body, field)) {
            result[field] = body[field];
        }
    }

    return result;
}

// Проверяем строковые поля
function validateStrings(data, fields, allowEmpty = []) {
    for (const field of fields) {
        if (data[field] === undefined) {
            continue;
        }

        if (typeof data[field] !== 'string') {
            const error = new Error(
                `Поле "${field}" должно содержать текст.`
            );
            error.status = 400;
            throw error;
        }

        data[field] = data[field].trim();

        if (!allowEmpty.includes(field) && !data[field]) {
            const error = new Error(
                `Поле "${field}" обязательно для заполнения.`
            );
            error.status = 400;
            throw error;
        }
    }

    return data;
}

// Проверяем наличие обязательных полей
function checkRequiredFields(data, fields) {
    const missing = fields.filter(
        field => data[field] === undefined
    );

    if (missing.length > 0) {
        const error = new Error(
            `Не заполнены обязательные поля: ${missing.join(', ')}.`
        );
        error.status = 400;
        throw error;
    }
}

// Общая обработка ошибок
function handleError(res, error, message) {
    console.error(message, error.message);

    if (error.status === 400) {
        return res.status(400).json({
            error: error.message,
        });
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
            error: 'Запись с такими данными уже существует.',
        });
    }

    if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
            error: 'Данные не прошли проверку.',
            details: error.errors.map(item => item.message),
        });
    }

    if (
        error.name === 'SequelizeForeignKeyConstraintError' ||
        error.original?.code === '23503'
    ) {
        return res.status(409).json({
            error: 'Операция невозможна из-за связанных записей.',
        });
    }

    return res.status(500).json({
        error: message,
    });
}

module.exports = {
    parseId,
    isValidBody,
    pickFields,
    validateStrings,
    checkRequiredFields,
    handleError,
};
