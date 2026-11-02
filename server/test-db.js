
const {
    sequelize,
    Sensor,
    Review,
    TeamMember,
    News,
} = require('./models');

async function testModels() {
    try {
        // Проверяем соединение с PostgreSQL
        await sequelize.authenticate();
        console.log('Подключение к PostgreSQL успешно!');

        // Проверяем, что модели обращаются к нужным таблицам
        await Sensor.findAll({ limit: 1 });
        console.log('Таблица sensors доступна.');

        await Review.findAll({ limit: 1 });
        console.log('Таблица reviews доступна.');

        await TeamMember.findAll({ limit: 1 });
        console.log('Таблица team_members доступна.');

        await News.findAll({ limit: 1 });
        console.log('Таблица news доступна.');

        console.log('Все модели работают корректно.');
    } catch (error) {
        console.error('Ошибка проверки:', error.message);
        process.exitCode = 1;
    } finally {
        await sequelize.close();
    }
}

testModels();
