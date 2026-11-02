
const { TeamMember } = require('../models');

const {
    parseId,
    isValidBody,
    pickFields,
    validateStrings,
    checkRequiredFields,
    handleError,
} = require('../utils/helpers');

const FIELDS = [
    'roleType',
    'lastName',
    'firstName',
    'avatar',
    'tag',
    'tagColor',
    'description',
    'expertise',
    'buttonText',
    'buttonHref',
    'sortOrder',
];

const STRING_FIELDS = FIELDS.filter(
    field => field !== 'sortOrder'
);

const REQUIRED_FIELDS = [...FIELDS];

function prepareTeamData(body) {
    const data = pickFields(body, FIELDS);

    validateStrings(data, STRING_FIELDS);

    if (data.roleType !== undefined) {
        if (!['leader', 'member'].includes(data.roleType)) {
            const error = new Error(
                'Тип участника должен быть leader или member.'
            );
            error.status = 400;
            throw error;
        }
    }

    if (data.sortOrder !== undefined) {
        data.sortOrder = Number(data.sortOrder);

        if (!Number.isInteger(data.sortOrder)) {
            const error = new Error(
                'Порядок сортировки должен быть целым числом.'
            );
            error.status = 400;
            throw error;
        }
    }

    return data;
}

// GET /api/team
async function getTeam(req, res) {
    try {
        const team = await TeamMember.findAll({
            order: [['sortOrder', 'ASC']],
        });

        res.json(team);
    } catch (error) {
        handleError(res, error, 'Не удалось получить команду.');
    }
}

// GET /api/team/:id
async function getTeamMemberById(req, res) {
    try {
        const id = parseId(req.params.id);

        if (!id) {
            return res.status(400).json({
                error: 'Некорректный идентификатор участника команды.',
            });
        }

        const member = await TeamMember.findByPk(id);

        if (!member) {
            return res.status(404).json({
                error: 'Участник команды не найден.',
            });
        }

        res.json(member);
    } catch (error) {
        handleError(res, error, 'Не удалось получить участника команды.');
    }
}

// POST /api/team
async function createTeamMember(req, res) {
    try {
        if (!isValidBody(req.body)) {
            return res.status(400).json({
                error: 'Переданы некорректные данные.',
            });
        }

        const data = prepareTeamData(req.body);

        checkRequiredFields(data, REQUIRED_FIELDS);

        const member = await TeamMember.create(data);

        res.status(201).json(member);
    } catch (error) {
        handleError(res, error, 'Не удалось добавить участника команды.');
    }
}

// PUT /api/team/:id
async function updateTeamMember(req, res) {
    try {
        const id = parseId(req.params.id);

        if (!id) {
            return res.status(400).json({
                error: 'Некорректный идентификатор участника команды.',
            });
        }

        if (!isValidBody(req.body)) {
            return res.status(400).json({
                error: 'Переданы некорректные данные.',
            });
        }

        const member = await TeamMember.findByPk(id);

        if (!member) {
            return res.status(404).json({
                error: 'Участник команды не найден.',
            });
        }

        const updates = prepareTeamData(req.body);

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                error: 'Не переданы поля для изменения.',
            });
        }

        await member.update(updates);

        res.json(member);
    } catch (error) {
        handleError(res, error, 'Не удалось изменить участника команды.');
    }
}

// DELETE /api/team/:id
async function deleteTeamMember(req, res) {
    try {
        const id = parseId(req.params.id);

        if (!id) {
            return res.status(400).json({
                error: 'Некорректный идентификатор участника команды.',
            });
        }

        const member = await TeamMember.findByPk(id);

        if (!member) {
            return res.status(404).json({
                error: 'Участник команды не найден.',
            });
        }

        await member.destroy();

        res.json({
            message: 'Участник команды успешно удалён.',
            id,
        });
    } catch (error) {
        handleError(res, error, 'Не удалось удалить участника команды.');
    }
}

module.exports = {
    getTeam,
    getTeamMemberById,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
};
