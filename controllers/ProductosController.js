const multer = require('multer');
const multerConfig = require('../utils/multerConfig');
const Producto = require('../models/Producto');
const {Op} = require('sequelize');
const Cliente = require('../models/Cliente');

const upload = multer(multerConfig).single('image');

exports.fileUpload = (req, res, next) => {
    upload(req,res, function(error){
        if(error){
            res.json({message: error});
        }
        return next();
    });
};

//funcion para agregar un producto
exports.agregar = async (req, res, next) => {
    const producto = new Producto(req.body);

    try {
        if(req.file && req.file.filename) {
            producto.image = req.file.filename;
        }
        //crear el producto con los datos recibidos en el request.body
        await producto.save();
        res.json({mensaje: 'Se ha registrado el producto'});

    } catch (error) {
        console.log(error);

        let errores = [];
        if (error.errors){
            errores = error.errors.map((item) =>({
                campo: item.path,
                error: item.message,
            }))
        }

        res.json({
            error: true,
            mensaje: 'Error al registrar el producto',
            errores,
        });
        next();
    }
};

//listar  productos
exports.listar = async (req, res, next) => {
    try {
        //implementacion del filtro
        let filtro = req.query;
        if (req.query.q) {
            filtro = {nombre: {[Op.like]: `%${req.query.q}%`}};
        }
        const productos = await Producto.findAll({
            where: filtro,
            include: [
                {model: Cliente}
            ]
        });
        res.json(productos);
    } catch (error) {
        console.log(error);
        res.json({mensje: 'Error al leer los productos'});
    }
}

//mostrar producto
exports.mostrar = async (req, res, next) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if(!producto) { 
            res.status(404).json({mensaje: 'No se encontro el producto'});
        } else {
            res.json(producto);
        }
    } catch (error) {
        console.log(error);
        res.status(503).json({mensaje: 'Error al leer el producto'});
    }
};

//actualizar un producto
exports.actulizar = async (req, res, next) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if(!producto) { 
            res.status(404).json({mensaje: 'No se encontro el producto'});
        } else {
            Object.keys(req.body).forEach((propiedad) => {
                producto[propiedad] = req.body[propiedad];
            });
            await producto.save();
            res.json({mensaje: 'El producto fue actualizado'})
        }
    } catch (error) {
        console.log(error);
        let errores = [];
        if(error.errors){
            errores = error.errors.map((item) => ({
                campo: item.path,
                error: item.message,

            }));
        }
        res.status(503).json({
            error: true,
            mensaje: 'Error al registrar el producto',
            errores,
        });
    }
};

//Eliminar un producto
exports.eliminar = async (req, res, next) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if(!producto) {
            res.status(404).json({mensaje: 'No se encontro el producto'});
        } else {
            await producto.destroy();
            res.json({mensaje: 'El producto fue eliminado'});
        } 
    } catch (error) {
        res.status(503).json({mensaje: 'Error al eliminar'});  
    }
}