const AccessControl = require ('accesscontrol');

const ac = new AccessControl();

exports.roles = () => {
  ac.grant('ninguno');

  ac.grant('usuario')
    .readAny('producto');

  ac.grant('admin')
    .extend('usuario')
    .readAny(['proveedor', 'categoria', 'usuario'])
    .createAny(['producto', 'proveedor', 'categoria']) 
    .updateAny(['producto', 'proveedor', 'categoria', 'usuario']);

  ac.grant('super')
    .extend('admin')
    .deleteAny(['producto', 'proveedor', 'categoria', 'usuario']);

  return ac;  
  }