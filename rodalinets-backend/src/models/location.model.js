
import {Sequelize, DataTypes} from 'sequelize'
import {sequelize} from '../db.js'

export const Location = sequelize.define('Location', {
    // Model attributes are defined her
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {

});

