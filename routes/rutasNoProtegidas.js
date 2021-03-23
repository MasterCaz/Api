const express = require('express');

const router = express.Router();

const usuariosController = require('../controllers/UsuariosController');
const sesionController = require('../controllers/SesionController');
const productosController = require('../controllers/ProductosController');


module.exports = function(){
  router.post('/usuarios', usuariosController.agregar);
  router.post('/login', sesionController.login);
  router.get('/productos', productosController.listar);

  return router;
};