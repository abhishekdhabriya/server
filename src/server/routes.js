import Authentication from './controllers/authentication';
import passportService from './services/passport';
import passport from 'passport';

// we are asking passport to use jwt as our authentication strategy and to not create a session, by default it creates a cokkie based session
// this requireAuth can be used as middleware
const requireAuth = passport.authenticate('jwt', {session:false});

export default function(app) {
    // any request must pass with requireAuth middleware
    app.get('/', requireAuth, (req, res) => {
        res.send({hi: 'there'});
    });
    app.post('/signup', Authentication.signup);
}