// this file won't be parsed by babel.
require('source-map-support').install(); // by installing this package source map will be enabled in node
require("./build/server"); // babel compiles our src folder into build artifact folder.

