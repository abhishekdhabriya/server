import Authentication from './controllers/authentication';
import passport from 'passport';
import validation from './common/validation';
// we are asking passport to use jwt as our authentication strategy and to not create a session, by default it creates a cokkie based session
// this requireAuth can be used as middleware
const requireAuth = passport.authenticate('jwt', {session:false});
const requireSignin = passport.authenticate('local', {session: false});


export default function(app) {
    // any request must pass with requireAuth middleware
    app.get('/', requireAuth, (req, res) => {
        res.send({message: 'Yes man! '});
    });
    app.post('/signup', Authentication.signup);
    app.post('/signin', validation.validateLogin, requireSignin, Authentication.signin);
}