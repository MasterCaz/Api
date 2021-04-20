const express = require('express');

const router = express.Router();

const {accessControl} = require('../middlewares/accessControl');

//importar controladores
const productosController = require('../controllers/ProductosController');
const clientesController = require('../controllers/ClientesController');
const usuariosController = require('../controllers/UsuariosController');
const proveedoresController = require('../controllers/ProveedoresController')
const ordenesController = require('../controllers/OrdenesController');
const categoriasController = require('../controllers/CategoriasController');

module.exports = function(){
    //post: agregar producto
  
    //get: leer los productos
    router.get('/productos/:id', accessControl('readAny', 'producto'), productosController.mostrar);
    //actualizar productos
    router.put('/productos/:id',accessControl('updateAny', 'producto'), productosController.actulizar);
    //eliminar productos
    router.delete('/productos/:id',accessControl('deleteAny', 'producto'), productosController.eliminar);

    router.post('/clientes', clientesController.agregar);
    router.get('/clientes', clientesController.listar);

    //leer usuarios
    router.get('/usuarios', accessControl('readAny', 'usuario'), usuariosController.listar);
    router.get('/usuarios/:id', accessControl('readAny', 'usuario'), usuariosController.mostrar);
    //actualizar usuario    
    router.put('/usuarios/:id', accessControl('updateAny' , 'usuario'), usuariosController.actulizar);
    //eliminar usuario
    router.delete('/usuarios/:id', accessControl('deleteAny', 'usuario'), usuariosController.eliminar);

    //agregar proveedor
    router.post('/proveedores',accessControl('createAny', 'proveedor'), proveedoresController.agregar);
    //leer proveedores
    router.get('/proveedores', accessControl('readAny', 'proveedor'), proveedoresController.listar);
    router.get('/proveedores/:id', accessControl('readAny', 'proveedor'), proveedoresController.mostrar);
    //actualizar proveedor
    router.put('/proveedores/:id', accessControl('updateAny', 'proveedor'), proveedoresController.actulizar);
    //eliminar proveedor
    router.delete('/proveedores/:id', accessControl('deleteAny', 'proveedor'), proveedoresController.eliminar);

    router.post('/ordenes', ordenesController.agregar);
    router.get('/ordenes', ordenesController.listar);

    //agregar categoria
    router.post('/categorias', accessControl('createAny', 'categoria'), categoriasController.agregar);
    //leer categorias
    router.get('/categorias', accessControl('readAny', 'categoria'), categoriasController.listar);
    router.get('/categorias/:id', accessControl('readAny', 'categoria'), categoriasController.mostrar);
    //actualizar categoria
    router.put('/categorias/:id', accessControl('updateAny', 'categoria'), categoriasController.actulizar);
    //eliminar categoria
    router.delete('/categorias/:id', accessControl('deleteAny', 'categoria'), categoriasController.eliminar);

    return router;
}