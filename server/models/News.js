
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const News = sequelize.define(
    'News',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        image: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        publishedAt: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'published_at',
        },

        category: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: 'news',
        timestamps: false,
    }
);

module.exports = News;
