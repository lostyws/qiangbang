

/**
 * devDependencies module
 */
var gulp = require('gulp');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');
var del = require('del');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var csso = require('gulp-csso');
var notify = require('gulp-notify');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var revReplace = require('gulp-rev-replace');
var combiner = require('stream-combiner2');
// var source = require('vinyl-source-stream')
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var path = require('path');


/**
 * src path
 */
var config = require('../config');
var DEST = config.dest;
var JSSSRC = config.js.src;
var CSSSRC = config.css.src;
var IMGSRC = config.img.src;
var MD5BASE = path.join(process.cwd(), 'dist');
var MD5PATH = DEST + 'md5-map.json';



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
    return gulp.src(JSSSRC)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

/**
 * task js
 */
gulp.task('js', function() {
    return gulp.src(JSSSRC)
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(DEST))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(rev.manifest(MD5PATH,{
            base: MD5BASE,
            merge: true
        }))
        .pipe(gulp.dest(DEST));
});

/**
 * task js
 */
gulp.task('testjs', function() {
     var combined = combiner.obj([
        gulp.src(JSSSRC),
        jshint(),
        jshint.reporter(stylish),
        uglify(),
        rev(),
        rename({
            suffix: '.min'
        }),
        gulp.dest(DEST),
        rev.manifest(MD5PATH, {
            base: MD5BASE,
            merge: true
        }),
        gulp.dest(DEST)
      ]);


     combined.on('error', console.error.bind(console));

     return combined;
});


/**
 * task css
 */
gulp.task('css', function() {
    return gulp.src(CSSSRC)
        // .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(csso())
        .pipe(minifycss())
        .pipe(rev())
        .pipe(gulp.dest(DEST))
        .pipe(rename({
            suffix: '.min'
        }))
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
 * task js
 */
gulp.task('testcss', function() {
    var combined = combiner.obj([
        gulp.src(CSSSRC),
        // .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        csso(),
        minifycss(),
        rev(),
        gulp.dest(DEST),
        rename({
            suffix: '.min'
        }),
        rev.manifest(MD5PATH, {
            base: MD5BASE,
            merge: true
        }),
        gulp.dest(DEST),
        notify({
            message: 'css task complete'
        })
      ]);
    

     combined.on('error', console.error.bind(console));

     return combined;
});

/**
 * task img
 */
gulp.task('img', function() {
    return gulp.src(IMGSRC)
        .pipe(cache(imagemin({
            // optimizationLevel: 3,
            // progressive: true,
            interlaced: true
        })))
        // .pipe(rev())
        // .pipe(gulp.dest(DEST))
        // .pipe(rev.manifest({
        //     path: 'md5-map.json',
        //     base: DEST,
        //     merge: true
        // }))
        .pipe(gulp.dest(DEST));
        // .pipe(notify({
        //     message: 'img task complete'
        // }));
});



//build
gulp.task('build', ['clean'], function() {
    gulp.start('js', 'css', 'img');
});
