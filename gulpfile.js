// Include the required tools used on tasks
var gulp          = require('gulp'),
    jshint        = require('gulp-jshint'),
    rename        = require('gulp-rename'),
    uglify        = require('gulp-uglify'),
    saveLicense   = require('uglify-save-license'),
    babel         = require("gulp-babel"),
    postcss       = require('gulp-postcss'),
    cleanCSS      = require('gulp-clean-css'),
    cssbeautify   = require('gulp-cssbeautify'),
    autoprefixer  = require('autoprefixer'),
    sass          = require('gulp-sass'),
    del           = require('del')
    minifyCss     = require('gulp-minify-css')
    sourcemaps    = require('gulp-sourcemaps');

sass.compiler     = require('node-sass');
var Server        = require('karma').Server;
var browserSync   = require('browser-sync').create();

// Specify the Source files
var SRC_JS        = 'src/js/jquery-toasts.js';
var SRC_CSS       = 'src/css/*.css';
var SRC_SCSS      = 'src/scss/jquery-toasts.scss';

// Specify the Destination folders
var DEST_JS       = 'dist/js';
var DEST_CSS      = 'dist/css';
var DEST_SCSS     = 'dist/css';

// Example pages
var EXAMPLE_HTML  = 'docs/*.html';

// BUILD JS
function build_js(cb) {
    gulp.src(SRC_JS)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest(DEST_JS))
        .pipe(uglify({
            output: {
                comments: saveLicense
            }
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(DEST_JS));

    cb();
}

// BUILD CSS
function build_css(cb) {
    gulp.src(SRC_CSS)
        .pipe(postcss( [autoprefixer()] ))
        .pipe(cssbeautify({ autosemicolon: true }))
        .pipe(gulp.dest(DEST_CSS))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(DEST_CSS));

    cb();
}

// BUILD SCSS
function build_scss(cb) {
    gulp.src(SRC_SCSS)
        .pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest(DEST_SCSS))
        .pipe(minifyCss())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(DEST_SCSS));

    cb();
}

// LINT
function lint_js(cb) {
    gulp.src(SRC_JS)
        .pipe(jshint({ "esversion": 8 }))
        .pipe(jshint.reporter('default'));

    cb();
}

// CLEAN
function clean_js(cb) {
    del.sync([DEST_JS]);

    cb();
}

function clean_css(cb) {
    del.sync([DEST_CSS]);

    cb();
}

// WATCH
function watch(cb) {
    gulp.watch(SRC_JS, build_js);
    gulp.watch(SRC_CSS, build_css);
    gulp.watch(SRC_SCSS, build_scss);

    cb();
}

// SERVE
function serve(cb) {
    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: './',
            index: "docs/index.html"
        }
    });

    gulp.watch(SRC_JS, build_js);
    gulp.watch(SRC_CSS, build_css);
    gulp.watch(SRC_SCSS, build_scss);

    gulp.watch([DEST_JS, DEST_CSS, EXAMPLE_HTML]).on("change", browserSync.reload);

    cb();
}

// TEST
function test(cb) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();

    cb();
}

// EXPORT methods
exports.clean   = gulp.parallel(clean_js, clean_css);
exports.build   = gulp.parallel(gulp.series(clean_js, lint_js, build_js), gulp.series(clean_css, build_scss, build_css));
exports.lint    = lint_js;
exports.watch   = watch;
exports.test    = test;
exports.serve   = serve;
exports.default = serve;