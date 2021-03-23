const Sequelize = require('sequelize');

const db = require('../config/db');



const Producto = db.define('Producto',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Nombre no puede quedar vacío',
            },
        }
    },
    descripcion: {
        type: Sequelize.STRING(200),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Descripción no puede quedar vacío',
            },
        }
    },
    image:{
        type: Sequelize.STRING(100)
    },
    precio: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'Precio no puede quedar vacío',
            },
            notEmpty: {
                args: true,
                msg: 'Precio no puede quedar vacío',
            },
            isNumeric: {
                args: true,
                msg: 'Solo puede contener  números'
            },
        }
    },
    sku: {
        type: Sequelize.STRING(16),
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'Sku no puede quedar vacío',
            },
            notEmpty: {
                args: true,
                msg: 'Sku no puede quedar vacío',
            },
            isAlphanumeric: {
                args: true,
                msg: 'Solo puede contener letras y números'
            },
        }
    },
})


module.exports = Producto;
