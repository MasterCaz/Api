const express = require('express');

const router = express.Router();

//importar controladores
const productosController = require('../controllers/ProductosController');
const clientesController = require('../controllers/ClientesController');
const usuariosController = require('../controllers/UsuariosController');
const proveedoresController = require('../controllers/ProveedoresController')
const ordenesController = require('../controllers/OrdenesController');
const categoriasController = require('../controllers/CategoriasController');

module.exports = function(){
    //post: agregar producto
    router.post('/productos', 
    productosController.fileUpload,
    productosController.agregar);
    //get: leer los productos
    router.get('/productos/:id', productosController.mostrar);
    router.put('/productos/:id', productosController.actulizar);
    router.delete('/productos/:id', productosController.eliminar);

    router.post('/clientes', clientesController.agregar);
    router.get('/clientes', clientesController.listar);

    router.get('/usuarios', usuariosController.listar);
    router.get('/usuarios/:id', usuariosController.mostrar);
    router.put('/usuarios/:id', usuariosController.actulizar);
    router.delete('/usuarios/:id', usuariosController.eliminar);

    router.post('/proveedores', proveedoresController.agregar);
    router.get('/proveedores', proveedoresController.listar);
    router.get('/proveedores/:id', proveedoresController.mostrar);
    router.put('/proveedores/:id', proveedoresController.actulizar);
    router.delete('/proveedores/:id', proveedoresController.eliminar);

    router.post('/ordenes', ordenesController.agregar);
    router.get('/ordenes', ordenesController.listar);

    router.post('/categorias', categoriasController.agregar);
    router.get('/categorias', categoriasController.listar);
    router.get('/categorias/:id', categoriasController.mostrar);
    router.put('/categorias/:id', categoriasController.actulizar);
    router.delete('/categorias/:id', categoriasController.eliminar);

    return router;
}