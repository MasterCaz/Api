const { DATE } = require('sequelize');
const Sequelize = require('sequelize');
const Cliente = require('../models/Cliente');
const Producto = require('../models/Producto');
const db = require('../config/db');
const { schema } = require('./Cliente');
const Orden = db.define('Orden', {
    cantidad: {
        type: Sequelize.INTEGER
    },
    montoTotal: {
        type: Sequelize.INTEGER
    }
})
Orden.belongsTo(Cliente, {onDelete: 'CASCADE'});
Orden.belongsTo(Producto, {onDelete: 'CASCADE'});
module.exports = Orden;