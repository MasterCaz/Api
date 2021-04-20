const bcrypt = require('bcrypt'); 
const { response } = require('express');
const { Op } = require('sequelize');

const Usuario = require('../models/Usuario');
const {emailResetPassword} = require('../utils/emailResetPassword');

exports.resetearPassword =  async (req, res, next) => {
  try {
    //verificar si se recibio el email
    if (!req.body.email){
      res.status(400).json({
        error: true,
        message: 'Se debe de proporcionar un email',
      });
    }
    //buscar el usuario por su email
    const usuario = await Usuario.findOne({
      where: {
        email: req.body.email,
      }
    });
    if(!usuario){
      res.status(404).json({
        error: true, 
        message: 'No existe el usuario',
      });
    }
    //generar el token y enviar el email
    let token = await bcrypt.hash(usuario.email + Date.now().toString(), 10);
    token = token.replace(/\//g, "j");

    //guardar token
    usuario.passwordResetToken = token;
    usuario.passwordResetExpire = Date.now() + 3600000;
    await usuario.save();

    //enviar email
    const resultadoEmail = await emailResetPassword(
      `${usuario.nombre} ${usuario.apellidos}`, 
      usuario.email, 
      token
      );
    if (resultadoEmail){
      res.json({
        message: 'Un mensaje ha sido enviado al email proporcionado',
      });
    } else {
      res.status(503).json({
        error: true,
        message: "Ocurrio un error al tratar de enviar el email de recuperación",
      });
    }
  } catch (error) {
    console.log(error)
    res.status(503).json({
      error: true,
      message: "Ocurrio un error al tratar de enviar el email de recuperación",
    });
  }
}

exports.validarTokenPassword = async (req, res, next) => {
  try {
    //buscar al usuario con ese token y vigencia
    const usuario = await Usuario.findOne({
      where: {
        passwordResetToken: req.body.token,
        passwordResetExpire: {
          [Op.gt]: new Date()
        }
      }
    });

    if(!usuario){
      res.status(400).json({
        message: 'El link para reestablecer la contraseña es inválido o ha expirado',
      });
    }

    //retornar estatus que indique que es valido
    res.json({
      isValid: true,
      message: 'Ingrese una nueva contraseña',
    });

  } catch (error) {
    console.log(error);
    response.status(503).json({
      error: true,
      message: 'Error al validar el token'
    })
  }
}

exports.guardarNuevoPassword = async (req, res,next) => {
  try {
    //volver a validar el token
    //buscar al usuario con ese token y vigencia
    const usuario = await Usuario.findOne({
      where: {
        passwordResetToken: req.body.token,
        passwordResetExpire: {
          [Op.gt]: new Date()
        }
      }
    });

    if(!usuario){
      res.status(400).json({
        message: 'El link para reestablecer la contraseña es inválido o ha expirado',
      });
    }

    //comprobar que se esta enviando la nueva contraseña
    if(!req.body.password){
      res.status(400).json({
        error: true,
        message: 'La contraseña es obligatoria',
      });
    }

    //cifrar contraseña
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(req.body.password, salt);

    //quitar el token de recuperacion
    usuario.passwordResetToken = '';
    usuario.passwordResetExpire = null;

    await usuario.save();

    res.json({
      message: 'La nueva contraseña ha sido guardada, iniciar sesión nuevamente',
    })
    
  } catch (error) {
    console.log(error)
    res.status(503).json({
      error: true,
      message: 'Error al guardar la nueva contraseña',
    })
  }
}