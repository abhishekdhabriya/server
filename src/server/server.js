import express from 'express';
import http from 'http'; // package from nodejs
import bodyParser from 'body-parser';
import morgan from 'morgan';
// import 

import { isDevelopment } from './settings';
import routes from './routes';

// --------------
// setup 
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
const server = http.Server(app);
routes(app);
// ---------------
// configuration

app.set('view engine', 'pug'); // previously called Jade
app.set('views', './views');
app.use(express.static('public')); // tells express to serve out any file that exist in public folder in normal http way.

const useExternalStyle = !isDevelopment;
const scriptRoot = isDevelopment ? 'http://localhost:8082/build' : '/build'; // webpack development server hosted at 8080 or compiled files in build

app.get('*', (req, res) => { // handler if the file doesn't in public folder then serve it from here
    
    let i = 10;
    let whoa = i*10;
    console.log(`whoa is ${whoa}`);
    
    res.render('index', {
        useExternalStyle,
        scriptRoot
    });
});

//------------------
// Startup 

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

