'use strict';

/**
 * copy.js
 * @author zhanghaiyang<403724532@qq.com>
 * @version 1.0.0
 */
/**
 * Module dependencies
 * gulp copy task
 */
let path = require('path');
/* gulp系列 */
let gulp = require('gulp');
let copy = require('gulp-copy');
let gulpClean = require('gulp-clean');
let runSequence = require('run-sequence');

/* config 基础参数配置文件 */
let config = require('../config');
let DEST = config.dest;




/**
 * [上线时候的copy任务]
 */
gulp.task('copy', function(callback) {
    runSequence(['copy:public', 'copy:myplugins','copy:plugins', 'copy:crm', 'copy:tianwu', 'copy:social', 'copy:joyowyb'],
        callback);
});
gulp.task('copy:public', function(callback) {
    return gulp.src(['public/**/*.{js,css,jpge,jpg,gif,png,ttf,eot,svg,woff,woff2}'])
        .pipe(gulp.dest(DEST + 'public/'));
});
gulp.task('copy:myplugins', function(callback) {
    return gulp.src(['myplugins/**/*.{js,css,jpge,jpg,gif,png,ttf,eot,svg,woff,woff2}'])
        .pipe(gulp.dest( DEST + 'myplugins/'));
});
gulp.task('copy:plugins', function(callback) {
    return gulp.src(['plugins/**/*.{js,css,jpge,jpg,gif,png,ttf,eot,svg,woff,woff2}'])
        .pipe(gulp.dest( DEST + 'plugins/'));
});

gulp.task('copy:website', function(callback) {
    return gulp.src('website/**/*.{css,jpge,jpg,gif,png}')
        .pipe(gulp.dest(DEST + 'website/'));
});
