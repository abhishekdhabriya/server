

export default {
     validateLogin
};

function validateLogin (req, res, done) {
 // validation
        if(!req.body.email || !req.body.password) {
            return res.status(422).send({error: 'you must provide both email and password'});
        }

        done(null, true);
}