
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Sensor = sequelize.define(
    'Sensor',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },

        company: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        image: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        logo: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        summary: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        advantages: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        productionManagement: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'production_management',
        },

        capabilities: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: 'sensors',
        timestamps: false,
    }
);

module.exports = Sensor;
