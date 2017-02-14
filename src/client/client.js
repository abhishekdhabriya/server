import "./client.scss";
import ReactDOM from 'react-dom';

function main() {
    // we can have require syntax anywhere in our code whereas import statement can only be at the top.
    //webpack understands CommonJs, so it will hook it up for us.
    // default export will be .default. since we are exporting a ES5 module and using it with CommonJS module.
    // and since the route isn't returning in the JSX, rather it's returning a function so we need to invoke it.
    const routes = require('./routes').default();
    ReactDOM.render(routes, document.getElementById('mount'));
}

main();  // now everytime we load app the entire AppContainer component will be reloaded.

if(module.hot){
    // callback will be invoked whenever the app component changes. 
    // either this component change or any of the sub component changes, 
    module.hot.accept('./components/app', () => {
        main();
    });
}

