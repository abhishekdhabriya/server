import jwt from 'jwt-simple';
import {secret} from '../config';

import User from '../models/users';

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({sub:user.id, iat: timestamp}, secret); // encode user information using secret from config
    // sub stands for subject and iat stands for issue at time and both are standards
}


export default {
    signup: (req, res, next) => {

        const email = req.body.email;
        const password = req.body.password;

        // validation
        if(!email || !password) {
            return res.status(422).send({error: 'you must provide both email and password'});
        }

        User.findOne({ email: email }, (err, existingUser) => {
            if (err) { return next(err); }

            if (existingUser) {
                return res.status(422).send({ error: 'Email already in use' });
            }

            const user = new User({
                email: email,
                password: password
            });

            user.save((err) => {
                if (err) {
                    return next(err);
                }

                // respond to request indication the user was created
                res.json({ token: tokenForUser(user)});
            });
        });
    }
};

