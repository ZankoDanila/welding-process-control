
const express = require('express');
const cors = require('cors');

const { sequelize } = require('./models');

const sensorRoutes = require('./routes/sensorRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const teamRoutes = require('./routes/teamRoutes');
const newsRoutes = require('./routes/newsRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Проверка сервера и базы данных
app.get('/api/health', async (req, res) => {
    try {
        await sequelize.authenticate();

        res.json({
            status: 'ok',
            message: 'Сервер и база данных работают!',
        });
    } catch (error) {
        console.error('Ошибка подключения к БД:', error.message);

        res.status(500).json({
            status: 'error',
            message: 'Нет подключения к базе данных.',
        });
    }
});

// Подключение маршрутов
app.use('/api/sensors', sensorRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/news', newsRoutes);

// Запуск сервера
async function startServer() {
    try {
        await sequelize.authenticate();

        console.log('Подключение к PostgreSQL успешно!');

        app.listen(PORT, () => {
            console.log(`Сервер запущен: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(
            'Не удалось запустить сервер:',
            error.message
        );

        process.exitCode = 1;
    }
}

startServer();
