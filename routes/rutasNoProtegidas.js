const express = require('express');

const router = express.Router();

const usuariosController = require('../controllers/UsuariosController');
const sesionController = require('../controllers/SesionController');
const productosController = require('../controllers/ProductosController');
const passwordController =  require('../controllers/PasswordController');

module.exports = function(){
  router.post('/usuarios', usuariosController.agregar);
  router.post('/login', sesionController.login);
  router.get('/productos', productosController.listar);
  router.post('/recuperar-password', passwordController.resetearPassword);
  router.post('/validar-token', passwordController.validarTokenPassword);
  router.post('/actualizar-password', passwordController.guardarNuevoPassword);
  router.post('/productos',
  productosController.fileUpload,
  productosController.agregar);

  return router;
};