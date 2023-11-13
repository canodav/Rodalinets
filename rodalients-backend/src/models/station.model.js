import {Sequelize, DataTypes} from 'sequelize'
import {sequelize} from '../db.js'

export const Station = sequelize.define('Station', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
}, {
    createdAt: false,
    updatedAt: false,
});


