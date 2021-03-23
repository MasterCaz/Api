const {Sequelize} = require('sequelize');


module.exports = new Sequelize('apiuitsmetldb', 'root', '1234567890',{
    host: 'localhost',
    dialect: 'mysql',
});