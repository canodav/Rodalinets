import Sequelize  from 'sequelize';
export const sequelize = new Sequelize('trainapp-sampler', 'developer', 'CrkRw2pyfj', {
    host: 'db',
    dialect: 'mysql'
});