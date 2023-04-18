const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config');

const UserService = require('./user.service');
const service =new UserService();

class AuthService {
  async getUser(email, password) {
    const user =await service.findByEmail(email);
    if (!user) {
    throw boom.unauthorized();
      }

  const isMatch =await bcrypt.compare(password, user.password);
    if (!isMatch) {
    throw boom.unauthorized();
        }
    delete user.dataValues.password;
    return user;
    }

  signToken(user) {
    const payload = {
          sub: user.id,
          role: user.role,
        };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
          user,
          token,
        };
    }

  async sendMail(email) {
    const user =await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
      }

  const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
            // ! agregar como variables de ambiente
        auth: {
            user: 'marty.oconner65@ethereal.email',
            pass: 'RcGpJqGN2MgY66vq7S'
        }
      });

  await transporter.sendMail({
        from: `"Foo Boo 👻" <${config.mailerEmail}>`, // sender address
        to: `${'marty.oconner65@ethereal.email'}`, // list of receivers
        subject: 'Nuevo correo de prueba', // Subject line
        text: 'Estoy usando Nodemailer!', // plain text body
        html: '<b>Holaaaaaaaaaa!</b>', // html body
      });

  return { message: 'Mail sent' };
    }
}

module.exports = AuthService;
