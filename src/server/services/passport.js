import passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import User from '../models/users';
import {secret} from '../config';

// In passport a strategy is a method to authenticate user. JwtStrategy is one of the strategy.
// we will verfy a user with Jwt and verify with a username and password.


// setup options for JWT Strategy
// where's the token on the request, body, url or headers and what's it called.

const jwtOptions = {
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),
    secretOrKey : secret
};

// create JWT strategy
// payload is the decoded jwt token, done is a callback option
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    // lookup the user from the database and if found send that user with the done callback, otherwise call done without a user object

    User.findById(payload.sub, (err, user) => {
        // if error then call the done function with false
        if (err) {
            return done(err, false);
        }

        if(user) {
            return done(null, user); // return the user
        } else {
            done(null, false); // can't find the user
        }
    });
});

// tell passport to use this Strategy.

passport.use(jwtLogin);
