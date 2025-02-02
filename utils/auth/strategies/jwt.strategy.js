const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // ? optiene el token del header
  secretOrKey: config.jwtSecret
}

const jwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});

module.exports = jwtStrategy;
