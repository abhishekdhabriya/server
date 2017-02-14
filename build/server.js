'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _settings = require('./settings');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// --------------
// setup 

// import 

// package from nodejs
var app = (0, _express2.default)();
app.use((0, _morgan2.default)('combined'));
app.use(_bodyParser2.default.json({ type: '*/*' }));
var server = _http2.default.Server(app);
(0, _routes2.default)(app);
// ---------------
// configuration

app.set('view engine', 'pug'); // previously called Jade
app.set('views', './views');
app.use(_express2.default.static('public')); // tells express to serve out any file that exist in public folder in normal http way.

var useExternalStyle = !_settings.isDevelopment;
var scriptRoot = _settings.isDevelopment ? 'http://localhost:8082/build' : '/build'; // webpack development server hosted at 8080 or compiled files in build

app.get('*', function (req, res) {
    // handler if the file doesn't in public folder then serve it from here

    var i = 10;
    var whoa = i * 10;
    console.log('whoa is ' + whoa);

    res.render('index', {
        useExternalStyle: useExternalStyle,
        scriptRoot: scriptRoot
    });
});

//------------------
// Startup 

var port = process.env.PORT || 3000;
server.listen(port, function () {
    console.log('Server started on port ' + port);
});
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(app, 'app', '/Users/adhabriy/Development/projects/projects/Webpack-1/src/server/server.js');

    __REACT_HOT_LOADER__.register(server, 'server', '/Users/adhabriy/Development/projects/projects/Webpack-1/src/server/server.js');

    __REACT_HOT_LOADER__.register(useExternalStyle, 'useExternalStyle', '/Users/adhabriy/Development/projects/projects/Webpack-1/src/server/server.js');

    __REACT_HOT_LOADER__.register(scriptRoot, 'scriptRoot', '/Users/adhabriy/Development/projects/projects/Webpack-1/src/server/server.js');

    __REACT_HOT_LOADER__.register(port, 'port', '/Users/adhabriy/Development/projects/projects/Webpack-1/src/server/server.js');
}();

;
//# sourceMappingURL=server.js.map
