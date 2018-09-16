const PassportJWT = require('passport-jwt'),
      ExtractJWT = PassportJWT.ExtractJWT,
      Strategy = PassportJWT.Strategy,
      config = require('./index.js'),
      models = require('@BudgetManager/app/setup');
      
module.exports = (passport) => {
    const User = models.User;

    const paramters = {
        secretOrKey: config.secret,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    };

    passport.use(new Strategy(paramters, (payload, done) => {
        User.findOne({
            id:payload.id
        }, (error, user) => {
            if(error) {
                return done(error, false);
            }
            if(user) {
                done(null, user);
            }
            else {
                done(null,false);
            }
        });
    }));
};