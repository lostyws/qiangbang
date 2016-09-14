/**
 * devDependencies module
 */
var gulp = require('gulp');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');
var config = require('../config');
var del = require('del');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var notify = require('gulp-notify');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var revReplace = require('gulp-rev-replace');
// var cssnano = require('gulp-cssnano');
var path = require('path');
console.log(process.cwd());

/**
 * src path
 */
var DEST = config.dest;
var JSSSRC = config.js.src;
var CSSSRC = config.css.src;
var IMGSRC = config.img.src;
var MD5BASE = path.join(process.cwd(), 'dist');
var MD5PATH = DEST + 'md5-map.json';

console.log(MD5BASE);


/**
 * clean dist
 */
gulp.task('clean', function(cb) {
    del([DEST]).then(paths => {
        cb();
    });
});


/**
 * js check
 */
gulp.task('hint', function() {
    var jshint = require('gulp-jshint');
    var stylish = require('jshint-stylish');

    return gulp.src([
            './js/accountset/**/*.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

/**
 * task js
 */
gulp.task('js', function() {
    return gulp.src(JSSSRC)
        .pipe(uglify())
        .pipe(rev())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(DEST))
        .pipe(rev.manifest(MD5PATH,{
            base: MD5BASE,
            merge: true
        }))
        .pipe(gulp.dest(DEST));
});

/**
 * task css
 */
gulp.task('css', function() {
    return gulp.src(CSSSRC)
        //.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        // .pipe(cssnano())
        .pipe(minifycss({
            advanced: false,
            aggressiveMerging: false
        }))
        .pipe(rev())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(DEST))
        .pipe(rev.manifest(MD5PATH, {
            base: MD5BASE,
            merge: true
        }))
        .pipe(gulp.dest(DEST))
        .pipe(notify({
            message: 'css task complete'
        }));
});

/**
 * task img
 */
gulp.task('img', function() {
    return gulp.src(IMGSRC)
        .pipe(imagemin())
        // .pipe(rev())
        // .pipe(gulp.dest(DEST))
        // .pipe(rev.manifest({
        //     path: 'md5-map.json',
        //     base: DEST,
        //     merge: true
        // }))
        .pipe(gulp.dest(DEST))
        // .pipe(notify({
        //     message: 'img task complete'
        // }));
});



//build
gulp.task('build', ['clean'], function() {
    gulp.start('js', 'css', 'img')
});
