const Proveedor = require('../models/Proveedor');
const {Op} = require('sequelize');



exports.agregar = async (request, response, next) => {
    try {
        await Proveedor.create(request.body);
        response.json({mensaje: 'Se ha registrado el proveedor'});

    } catch (error) {
        console.log(error);

        let errores = [];
        if (error.errors){
            errores = error.errors.map((item) =>({
                campo: item.path,
                error: item.message,
            }))
        }

        response.json({
            error: true,
            mensaje: 'Error al registrar el proveedor',
            errores,
        });
        next();
    }
};

exports.listar = async (req, res, next) => {
    try {
        const proveedores = await Proveedor.findAll({});
        res.json(proveedores);
    } catch (error) {
        console.log(error);
        res.json({mensje: 'Error al leer los proveedores'});
    }
}


exports.mostrar = async (req, res, next) => {
    try {
        const proveedor = await Proveedor.findByPk(req.params.id);
        if(!proveedor) { 
            res.status(404).json({mensaje: 'No se encontro el proveedor'});
        } else {
            res.json(proveedor);
        }
    } catch (error) {
        console.log(error);
        res.status(503).json({mensaje: 'Error al leer el proveedor'});
    }
};


exports.actulizar = async (req, res, next) => {
    try {
        const proveedor = await Proveedor.findByPk(req.params.id);
        if(!proveedor) { 
            res.status(404).json({mensaje: 'No se encontro el proveedor'});
        } else {
            Object.keys(req.body).forEach((propiedad) => {
                proveedor[propiedad] = req.body[propiedad];
            });
            await proveedor.save();
            res.json({mensaje: 'El proveedor fue actualizado'})
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
            mensaje: 'Error al registrar el proveedor',
            errores,
        });
    }
};


exports.eliminar = async (req, res, next) => {
    try {
        const proveedor = await Proveedor.findByPk(req.params.id);
        if(!proveedor) {
            res.status(404).json({mensaje: 'No se encontro el proveedor'});
        } else {
            await proveedor.destroy();
            res.json({mensaje: 'El proveedor fue eliminado'});
        } 
    } catch (error) {
        res.status(503).json({mensaje: 'Error al eliminar'});  
    }
}