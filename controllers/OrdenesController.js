const Orden = require('../models/Orden');
const {Op} = require('sequelize');
const Producto = require('../models/Producto');
const Cliente = require('../models/Cliente');

exports.agregar = async (req, res, next) => {
    try {
        const orden = new Orden (req.body);
        await orden.save();
        res.json(orden);
    } catch (error) {
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });      
    }
};


/*exports.listar = async (req, res, next) => {
    try {
        const ordenes = await Orden.find({})
        .populate('cliente')
        .populate({
            path: 'productos.producto',
            model: 'Producto'
        });
        res.json(ordenes);
    } catch (error) {
        res.status(400).json({
        message: 'Error al procesar la peticion'
        });
    }
};*/

exports.listar = async (req, res, next) => {
    try {
        const ordenes = await Orden.findAll({
            include:[
                //Se incluyen los datos del Profesor
                {model: Producto},
                {model: Cliente},
            ]
        });
        res.json(ordenes);
    } catch (error) {
        console.log(error);
        res.json({mensje: 'Error al leer los usuarios'});
    }
}