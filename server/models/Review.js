
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define(
    'Review',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        sensorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'sensor_id',
        },

        company: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        authorName: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'author_name',
        },

        authorRole: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'author_role',
        },

        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        rating: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
                isInt: true,
            },
        },

        reviewDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'review_date',
        },
    },
    {
        tableName: 'reviews',
        timestamps: false,
    }
);

module.exports = Review;
