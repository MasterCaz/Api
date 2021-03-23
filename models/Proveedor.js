const Sequelize = require('sequelize');

const db = require('../config/db');

const Proveedor = db.define('Proveedor', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombreComercial: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'El Nombre Comercial no puede quedar vacío',
            },
        }
    },
    razonSocial: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'La Razón social no puede quedar vacío',
            },
        }
    },
    telefono: {
        type: Sequelize.STRING(16),
        validate: {
            isMobilePhone: {
                args: ['es-MX'],
                msg: 'No es un numero telefonico valido'
            }
        }
    },
    email: {
        type: Sequelize.STRING(32),
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'Email no puede quedar vacío',
            },
            notEmpty: {
                args: true,
                msg: 'Email no puede quedar vacío',
            },
            isEmail: {
                args: true,
                msg: 'No es un email valido',
            },
        }
    },
    comentarios: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'La descripción no puede quedar vacia '
            },
        }
    },
})



module.exports = Proveedor;