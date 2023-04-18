const express = require('express');
const passport = require('passport');

const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const orderRouter = require('./orders.router');
const customersRouter = require('./customers.router');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories',passport.authenticate('jwt', {session: false}), categoriesRouter);
  router.use('/users',passport.authenticate('jwt', {session: false}), usersRouter);
  router.use('/orders',passport.authenticate('jwt', {session: false}), orderRouter);
  router.use('/customers',passport.authenticate('jwt', {session: false}), customersRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
}

module.exports = routerApi;
