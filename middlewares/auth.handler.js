const boom = require('@hapi/boom');
const { config } = require('../config/config')


function checkApiKey(req, res, next){
  const apiKey = req.headers['api'];
  if(apiKey === config.apiKey){
    next()
  } else{
    next(boom.unauthorized());
  }
}

function checkAdminRole(req, res, next){
  const user = req.user;
  if(user.rol === 'admin'){
    next()
  }else{
    next(boom.unauthorized())
  }
}

// ? otra opcion de verificar el rol
function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if(roles.includes(user.rol)){ // ? si el rol del request esta en el array
        next();
    }else{
      next(boom.unauthorized())
    }
  }
}


module.exports = { checkApiKey, checkAdminRole, checkRoles }
