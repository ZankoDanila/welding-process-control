const sequelize = require('../config/database');

const Sensor = require('./Sensor');
const Review = require('./Review');
const TeamMember = require('./TeamMember');
const News = require('./News');

// Одно оборудование может иметь много отзывов
Sensor.hasMany(Review, {
    foreignKey: 'sensorId',
    as: 'reviews',
    onDelete: 'CASCADE',
});

// Каждый отзыв относится к одному оборудованию
Review.belongsTo(Sensor, {
    foreignKey: 'sensorId',
    as: 'sensor',
});

module.exports = {
    sequelize,
    Sensor,
    Review,
    TeamMember,
    News,
};
