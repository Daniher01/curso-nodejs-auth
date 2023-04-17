//Require passport
const passport = require('passport');
//Require strategy used
const localStrategy = require('./strategies/local.strategy');
const jwtStrategy = require('./strategies/jwt.strategy');
//Tell to passport we'll use localStrategy
passport.use(localStrategy);
passport.use(jwtStrategy);
