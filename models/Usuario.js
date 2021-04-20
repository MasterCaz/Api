const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const db = require('../config/db');

const Usuario = db.define('Usuario', {
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
    apellidos:{
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Apellidos no puede quedar vacío',
            },
        }
    },
    email: {
        type: Sequelize.STRING(32),
        allowNull: false,
        unique: true,
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
    password: Sequelize.STRING,
    rol:{
        type: Sequelize.STRING(24),
        defaultValue: 'usuario',
    },
    activo:{
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
    passwordResetToken:{
        type: Sequelize.STRING,
    },
    passwordResetExpire:{
        type: Sequelize.DATE,
    }
});

Usuario.prototype.isValidPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = Usuario;