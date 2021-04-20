const {roles} = require('../config/roles');

exports.accessControl = (accion, recurso) => async (request, response, next) => {
  try {
    const permiso = roles().can(request.user.rol)[accion](recurso);
    if(!permiso.granted){
      return response.status(403).json({
        message: 'No autorizado para realizar esta acción'
      });
    }
    return next();
  } catch (error) {
    return next(error);
  }
};