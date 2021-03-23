const Cliente = require('../models/Cliente');

exports.agregar = async (request, response, next) => {
    try {
        //crear el producto con los datos recibidos en el request.body
        await Cliente.create(request.body);
        response.json({mensaje: 'Se ha registrado el cliente'});

    } catch (error) {
        console.log(error);
        response.json({mensaje: 'Error al registrar el cliente'});
    }
};

exports.listar = async (req, res, next) => {
    try {
        //implementacion del filtro
        const clientes = await Cliente.findAll({});
        res.json(clientes);
    } catch (error) {
        console.log(error);
        res.json({mensje: 'Error al leer los clientes'});
    }
}