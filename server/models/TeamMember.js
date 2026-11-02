
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TeamMember = sequelize.define(
    'TeamMember',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        roleType: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: 'role_type',
            validate: {
                isIn: [['leader', 'member']],
            },
        },

        lastName: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'last_name',
        },

        firstName: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'first_name',
        },

        avatar: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        tag: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        tagColor: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'tag_color',
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        expertise: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        buttonText: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'button_text',
        },

        buttonHref: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'button_href',
        },

        sortOrder: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'sort_order',
        },
    },
    {
        tableName: 'team_members',
        timestamps: false,
    }
);

module.exports = TeamMember;
