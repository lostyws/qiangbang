'use strict';

/**
 * min.js
 * @author zhanghaiyang<403724532@qq.com>
 * @version 1.0.0
 */
/**
 * Module dependencies
 * gulp min task
 */
/* gulp系列 */
let gulp = require('gulp');
let uglify = require('gulp-uglify');
let cssnano = require('gulp-cssnano');
let rev = require('gulp-rev');
let gulpClean = require('gulp-clean');
let rename = require('gulp-rename');
let runSequence = require('run-sequence');

/* config 基础参数配置文件 */
let config = require('../config');
let DEST = config.dest;


/**
 * [上线时候的压缩css,js任务]
 */
gulp.task('min', function(callback) {
    runSequence(['min:js', 'min:css'],
        callback);
});
gulp.task('min:js', function() {
    return gulp.src(['build/**/*.js'])
        .pipe(uglify())
        // .pipe(rev())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(DEST));



})

gulp.task('min:css', function() {
    return gulp.src(['build/**/*.css'])
        .pipe(cssnano())
        // .pipe(rev())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(DEST));
})
