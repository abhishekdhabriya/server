'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _default = function _default(app) {
    app.get('/', function (req, res) {
        res.send(['hi', 'there']);
    });
};

exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(_default, 'default', '/Users/adhabriy/Development/projects/projects/Webpack-1/src/server/routes.js');
}();

;
//# sourceMappingURL=routes.js.map
