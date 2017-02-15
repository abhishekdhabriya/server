import User from '../models/users';

export default {
    signup: (req, res, next) => {

        const email = req.body.email;
        const password = req.body.password;

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
                res.json({success:true});
            });

        });

    }
};

