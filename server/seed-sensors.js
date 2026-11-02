
const fs = require('fs/promises');
const path = require('path');

const {
    sequelize,
    Sensor,
    Review,
    TeamMember,
    News,
} = require('./models');

const dataPath = path.join(
    __dirname,
    '..',
    'client',
    'public',
    'data',
    'db.json'
);

// Краткие описания оборудования — не используем shortCards
const summaries = {
    'РСП-БРУ-01':
        'Система предназначена для дистанционного контроля сварочных работ на промышленных объектах, в том числе повышенной опасности. Она обеспечивает мониторинг состояния оборудования через web-приложение и интерактивную карту, а также RFID-идентификацию персонала и оборудования. Параметры сварки автоматически регистрируются и передаются на сервер для анализа, формирования отчётов и цифровых паспортов сварных соединений.',

    'СМСО-БРУ-01':
        'Система предназначена для непрерывного контроля сварочного оборудования и персонала. Она отслеживает параметры сварки, включая ток, напряжение и температуру, и предупреждает о нарушениях технологических режимов. Собранные данные используются для оценки качества сварных соединений и формирования производственной отчётности.',

    'МРСП-БРУ-01':
        'Система предназначена для автоматизированного сбора данных и управления технологическими процессами. В её основе используются устройства сбора данных и программная среда NI LabVIEW. Решение позволяет визуализировать контролируемые параметры, настраивать режимы работы оборудования и формировать управляющие воздействия.',

    'МРСП-БРУ-02':
        'Система предназначена для автоматизированного сбора данных и управления технологическими процессами. В её основе используются устройства сбора данных и программная среда NI LabVIEW. Решение позволяет визуализировать контролируемые параметры, настраивать режимы работы оборудования и формировать управляющие воздействия.',

    'МРСП-БРУ-03':
        'Система предназначена для автоматизированного сбора данных и управления технологическими процессами. В её основе используются устройства сбора данных и программная среда NI LabVIEW. Решение позволяет визуализировать контролируемые параметры, настраивать режимы работы оборудования и формировать управляющие воздействия.',
};

function getCardText(sensor, title) {
    const card = sensor.cards.find((item) => item.title === title);

    if (!card) {
        throw new Error(
            `Для ${sensor.title} не найдена карточка «${title}»`
        );
    }

    return card.text;
}

// Преобразуем дату отзыва из DD.MM.YYYY в YYYY-MM-DD
function parseReviewDate(date) {
    const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(date);

    if (!match) {
        throw new Error(`Неизвестный формат даты отзыва: ${date}`);
    }

    const [, day, month, year] = match;

    return `${year}-${month}-${day}`;
}

// В исходных датах новостей нет года.
// Для учебных данных назначаем годы с 2018 по 2026.
function parseNewsDate(date, index, total) {
    const match = /^(\d{1,2})\s+([а-яё]+)$/i.exec(date.trim());

    if (!match) {
        throw new Error(`Неизвестный формат даты новости: ${date}`);
    }

    const [, day, monthText] = match;

    const months = {
    'янв': '01',
    'фев': '02',
    'мар': '03',
    'апр': '04',
    'май': '05',
    'мая': '05',
    'июн': '06',
    'июл': '07',
    'авг': '08',
    'сен': '09',
    'сент': '09',
    'окт': '10',
    'ноя': '11',
    'дек': '12',
};

    const monthKey = monthText.toLowerCase().slice(0, 4);
    const month = months[monthKey] || months[monthText.toLowerCase().slice(0, 3)];

    if (!month) {
        throw new Error(`Неизвестный месяц в новости: ${date}`);
    }

    const year = total > 1
        ? 2018 + Math.round((index * 8) / (total - 1))
        : 2026;

    return `${year}-${month}-${day.padStart(2, '0')}`;
}

// Синхронизируем счётчик ID после вставки исходных идентификаторов
async function resetSequence(tableName, transaction) {
    const allowedTables = [
        'sensors',
        'reviews',
        'team_members',
        'news',
    ];

    if (!allowedTables.includes(tableName)) {
        throw new Error(`Недопустимое имя таблицы: ${tableName}`);
    }

    await sequelize.query(
        `SELECT setval(
            pg_get_serial_sequence('${tableName}', 'id'),
            COALESCE((SELECT MAX(id) FROM "${tableName}"), 1),
            EXISTS(SELECT 1 FROM "${tableName}")
        );`,
        { transaction }
    );
}

async function seedDatabase() {
    let transaction;

    try {
        const fileContent = await fs.readFile(dataPath, 'utf8');
        const data = JSON.parse(fileContent);

        await sequelize.authenticate();
        transaction = await sequelize.transaction();

        // 1. Оборудование
        for (const sensor of data.sensors) {
            const sensorData = {
                id: Number(sensor.id),
                title: sensor.title,
                company: sensor.company,
                image: sensor.image,
                logo: sensor.logo || null,
                summary: summaries[sensor.title],
                advantages: getCardText(sensor, 'Преимущества'),
                productionManagement: getCardText(
                    sensor,
                    'Эффективное управление производством'
                ),
                capabilities: getCardText(
                    sensor,
                    'Характеристика и возможности системы'
                ),
            };

            if (!sensorData.summary) {
                throw new Error(
                    `Не найдено краткое описание для ${sensor.title}`
                );
            }

            await Sensor.upsert(sensorData, { transaction });
        }

        // Получаем оборудование из БД для связи с отзывами
        const savedSensors = await Sensor.findAll({ transaction });

        const sensorIds = new Map(
            savedSensors.map((sensor) => [
                sensor.title,
                sensor.id,
            ])
        );

        // 2. Отзывы
        for (const review of data.reviews) {
            const sensorId = sensorIds.get(review.product);

            if (!sensorId) {
                throw new Error(
                    `Для отзыва ${review.id} не найдено оборудование: ${review.product}`
                );
            }

            const rating = Number(String(review.rating).split('/')[0]);

            const reviewData = {
                id: Number(review.id),
                sensorId,
                company: review.company,
                authorName: review.authorName
                    || review.author_name
                    || review.author,
                authorRole: review.authorRole
                    || review.author_role
                    || review.role
                    || review.position,
                text: review.text,
                rating,
                reviewDate: parseReviewDate(review.date),
            };

            if (!reviewData.authorName || !reviewData.authorRole) {
                throw new Error(
                    `Проверьте поля автора и должности в отзыве ${review.id}`
                );
            }

            await Review.upsert(reviewData, { transaction });
        }

        // 3. Руководители и остальные участники команды
        const leaders = data.team.leaders.map((member) => ({
            ...member,
            roleType: 'leader',
        }));

        const members = data.team.members.map((member) => ({
            ...member,
            roleType: 'member',
        }));

        const allMembers = [...leaders, ...members];

        for (let index = 0; index < allMembers.length; index++) {
            const member = allMembers[index];

            await TeamMember.upsert(
                {
                    // Общие ID, потому что у руководителей и участников
                    // исходные ID могут повторяться.
                    id: index + 1,
                    roleType: member.roleType,
                    lastName: member.lastName,
                    firstName: member.firstName,
                    avatar: member.avatar,
                    tag: member.tag,
                    tagColor: member.tagColor,
                    description: member.description,
                    expertise: member.expertise,
                    buttonText: member.buttonText ?? member.btnText,
                    buttonHref: member.buttonHref ?? member.btnHref,
                    sortOrder: index + 1,
                },
                { transaction }
            );
        }

        // 4. Новости
        for (let index = 0; index < data.news.length; index++) {
            const item = data.news[index];

            await News.upsert(
                {
                    id: Number(item.id),
                    image: item.image,
                    publishedAt: parseNewsDate(
                        item.date,
                        index,
                        data.news.length
                    ),
                    category: item.category,
                    title: item.title,
                    text: item.text,
                },
                { transaction }
            );
        }

        // Обновляем счётчики ID во всех таблицах
        for (const table of [
            'sensors',
            'reviews',
            'team_members',
            'news',
        ]) {
            await resetSequence(table, transaction);
        }

        await transaction.commit();

        console.log('Импорт завершён успешно.');
        console.log(`Оборудование: ${data.sensors.length}`);
        console.log(`Отзывы: ${data.reviews.length}`);
        console.log(`Участники команды: ${allMembers.length}`);
        console.log(`Новости: ${data.news.length}`);
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }

        console.error('Ошибка импорта:', error.message);
        process.exitCode = 1;
    } finally {
        await sequelize.close();
    }
}

seedDatabase();
