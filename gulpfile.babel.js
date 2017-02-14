import gulp from 'gulp';
import path from 'path';
import rimraf from 'rimraf';
import webpackConfig from './webpack.config';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const $ = require('gulp-load-plugins')(); //gulp-load-plugins brings in a function so we need to execute it. it will load all modules which starts with gulp-
// so we don't need to require them separately

//-------------
// server

gulp.task('server:clean', (cb) => {
    rimraf('./build', () => cb());
});

function compile() {
    return gulp.src('./src/server/**/*.js') // specifying a glob to select all js file from dir and sub dir.
        .pipe($.changed('./build')) // change prevent recompilying a file that isn't changed. 
        .pipe($.sourcemaps.init()) // will initialize source sourcemaps
        .pipe($.babel()) // we are piping in the result of invoking babel()
        .pipe($.sourcemaps.write('.', { sourceRoot: path.join(__dirname, 'src', 'server') })) // by this time all our source code is compiled by babel and 
        // babel will work ith sourcemaps to generate sourcemaps which we need to write it src/server directory. . represents the current root directory,
        // second parameter is an absolute path where we want to write our sourcemaps
        .pipe(gulp.dest('./build')); // dump all the output to build dir.
}


gulp.task('server:build',
    gulp.series(
        'server:clean',
        compile
    )
);

gulp.task('server:watch',
    gulp.series('server:build',
        gulp.parallel(function watch() {
            return gulp
                .watch('./src/server/**/*.js', gulp.series(compile))
                .on('error', () => { });
        },
            function nodemon() {
                return $.nodemon({
                    script: './server.entry.js', // script that it runs 
                    watch: 'build', // watch build folder for any changes in file,
                    ignore: ['**/__tests'],
                    exec : 'node --debug' 
                });
            }
        )

    )
);

//------------------------
// Client

// consoleStats will control the output of webpack
const consoleStats = {
    colors: true,
    exclude: ['node_modules'],
    chunks: false,
    assets: false,
    timings: true,
    modules: false,
    hash: false,
    version: false
};

gulp.task('client:clean', (cb) => {
    rimraf('./public/build', () => cb());
});

gulp.task('client:build', buildClient);
gulp.task('client:watch', watchClient);

gulp.task('client:dev', gulp.series(
    'client:clean',
    'client:build',
    'client:watch'
));

function buildClient(cb) {
    webpack(webpackConfig, (err, stats) => {
        if (err) {
            cb(err);
        } else {
            console.log(stats.toString(consoleStats));
            cb();
        }
    });
}

function watchClient() {
    const compiler = webpack(webpackConfig);
    const server = new WebpackDevServer(compiler, {
        publicPath : '/build/',
        hot: true,
        stats: consoleStats
    });
    server.listen(8082, ()=> {});
}

//-------------------
// Dev runs

gulp.task('dev:run', gulp.parallel(
    'server:watch',
    'client:watch'));




