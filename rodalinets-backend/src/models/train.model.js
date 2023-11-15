import {Sequelize, DataTypes} from 'sequelize'
import {sequelize} from '../db.js'


export const Train = sequelize.define('Train', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    trainId: {
      type: DataTypes.INTEGER,
    },
    departure_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    direction: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false,
});


