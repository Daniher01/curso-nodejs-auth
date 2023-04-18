const express = require('express');
const passport = require('passport');
const OrderService = require('../services/order.service');

const { config } = require('./../config/config');


const router = express.Router();
const service = new OrderService();


router.get('/my-orders',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await service.findBydUser(user.sub);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
