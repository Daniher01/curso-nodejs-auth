const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');


const router = express.Router();


router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      // ? el payload para enviar el jwt
      const payload = {
        sub: user.id,
        rol: user.role
      }
      // ? firma la data (payload) con la secret key
      const token = jwt.sign(payload, config.jwtSecret);
      // ? retorna el usuario y el token
      res.status(201).json({
        user,
        token
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
