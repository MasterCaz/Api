const Categoria = require('../models/Categoria');
const {Op} = require('sequelize');

exports.agregar = async (request, response, next) => {
    try {
        await Categoria.create(request.body);
        response.json({mensaje: 'Se ha registrado la categoría'});

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
            mensaje: 'Error al registrar la categoría',
            errores,
        });
        next();
    }
};

exports.listar = async (req, res, next) => {
    try {
        const categorias = await Categoria.findAll({});
        res.json(categorias);
    } catch (error) {
        console.log(error);
        res.json({mensje: 'Error al leer las categoría'});
    }
}


exports.mostrar = async (req, res, next) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if(!categoria) { 
            res.status(404).json({mensaje: 'No se encontro la categoría'});
        } else {
            res.json(categoria);
        }
    } catch (error) {
        console.log(error);
        res.status(503).json({mensaje: 'Error al leer la categoría'});
    }
};

exports.actulizar = async (req, res, next) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if(!categoria) { 
            res.status(404).json({mensaje: 'No se encontro la categoría'});
        } else {
            Object.keys(req.body).forEach((propiedad) => {
                categoria[propiedad] = req.body[propiedad];
            });
            await categoria.save();
            res.json({mensaje: 'La categoría fue actualizada'})
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
            mensaje: 'Error al registrar la categoría',
            errores,
        });
    }
};

exports.eliminar = async (req, res, next) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if(!categoria) {
            res.status(404).json({mensaje: 'No se encontro la categoría'});
        } else {
            await categoria.destroy();
            res.json({mensaje: 'La categoría fue eliminada'});
        } 
    } catch (error) {
        res.status(503).json({mensaje: 'Error al eliminar'});  
    }
}