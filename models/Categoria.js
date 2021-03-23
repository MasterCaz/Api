const Sequelize = require('sequelize');

const db = require('../config/db');
const Categoria = db.define('Categoria', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    descripcion: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    estado:{
        type: Sequelize.STRING(50),
        allowNull: false,
    }
})

module.exports = Categoria;