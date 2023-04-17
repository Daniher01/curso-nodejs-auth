const jwt = require('jsonwebtoken');

const secret = 'myCat';
const payload = {
  sub: 1,
  rol: 'customer'
}

function signToken(payload, secret){
  return jwt.sign(payload, secret);
}

function verifyToken(token, secret){
  return jwt.verify(token, secret);
}

const token = signToken(payload, secret);

const verificado = verifyToken(token, secret);

console.log(token);

console.log(verificado);
