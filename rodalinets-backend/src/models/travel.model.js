
import {Sequelize, DataTypes} from 'sequelize'
import {sequelize} from '../db.js'


export const Travel = sequelize.define('Travel', {
    fromStation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    toStation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: true
    },
    userId: {
        type: DataTypes.CHAR(36),
        allowNull: false
    }
}, {
});

