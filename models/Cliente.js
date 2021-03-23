const Sequelize = require('sequelize');

const db = require('../config/db');
const Producto = require('../models/Producto');

const Cliente = db.define('Cliente', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    direccion: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    estado:{
        type: Sequelize.STRING(50),
        allowNull: false,
    }
})

Producto.belongsTo(Cliente, {onDelete: 'CASCADE'});



module.exports = Cliente;