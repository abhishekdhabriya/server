import express from 'express';
import http from 'http'; // package from nodejs
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes';
import passportService from './services/passport';

// --------------
// DB setup

mongoose.connect('mongodb://localhost:auth/auth');

// --------------
// setup 
const app = express();
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
const server = http.Server(app);
passportService.LocalStrategy();
passportService.JwtStrategy();
routes(app);
// ---------------
// configuration

app.set('view engine', 'pug'); // previously called Jade
app.set('views', './views');
app.use(express.static('public')); // tells express to serve out any file that exist in public folder in normal http way.


//------------------
// Startup 

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

