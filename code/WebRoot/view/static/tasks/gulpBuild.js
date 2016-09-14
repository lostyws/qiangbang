'use strict';

/**
 * build.js
 * @author zhanghaiyang<403724532@qq.com>
 * @version 1.0.0
 */
/**
 * Module dependencies
 * gulp build task
 */
let path = require('path');
/* gulp系列 */
let gulp = require('gulp');
let gulpUtil = require('gulp-util');
let gulpClean = require('gulp-clean');
let imagemin = require('gulp-imagemin');
let cache = require('gulp-cache');
let rev = require('gulp-rev');
let rename = require('gulp-rename');
let uglify = require('gulp-uglify');
let cssnano = require('gulp-cssnano');
let copy = require('gulp-copy');
let runSequence = require('run-sequence');




/* webpack系列 */
let webpack = require('webpack');
let webpackDevServer = require('webpack-dev-server');
let webpackConfig = require('../webpack.config.gulp');


/* config 基础参数配置文件 */
let config = require('../config');


/*处理命令行参数*/
let minimist = require('minimist');
/**
 * [knownOptions 默认命令行参数]
 * @type {Object}
 */
let knownOptions = {
    string: 'src',
    default: { src: process.env.NODE_ENV || 'all' }
};

/**
 * [options 获取新的命令行参数]
 * @type {[命令行参数]}
 */
let options = minimist(process.argv.slice(2), knownOptions);

/* 获取任务路径 */
let taskSrc = require('./options/taskSrc')(options);


/**
 * [webpackCompiler webpack实例化]
 * @type {[Object]}
 */
let webpackCompiler = webpack(webpackConfig(options));


// gulp.task('watch', function(done) {
//     gulp.watch(taskSrc.watch, ['dev:build:js'])
//         .on('end', done);
// });

gulp.task('clean', function(done) {
    // return;
    return gulp.src([taskSrc.clean[0]])
        .pipe(gulpClean());
});


// let IMGSRC = [
//     "**/*.{jpge,jpg,gif,png}",
//     "!build/**/*.{jpge,jpg,gif,png}",
//     "!node_modules/**/*.{jpge,jpg,gif,png}"
// ]
// let DEST = "./build/";

/**
 * [上线时候的build:img任务]
 */
gulp.task('build:img', function() {
    return gulp.src(taskSrc.img.src)
        .pipe(cache(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        })))
        // .pipe(rev())
        // .pipe(gulp.dest('./'))
        // .pipe(rev.manifest({
        //     path: 'md5-map.json',
        //     base: DEST,
        //     merge: true
        // }))
        .pipe(gulp.dest(taskSrc.img.dest))
        // .pipe(notify({
        //     message: 'img task complete'
        // }));
});


/**
 * [上线时候的build:js任务]
 */
gulp.task('build:js', function(callback) {
    webpackCompiler.run(function(error, status) {
        if (error) {
            throw new gulpUtil.PluginsError('webpack:build:js', error);
        }
        gulpUtil.log('[webpack:build:js]', status.toString({
            colors: true
        }));
        callback();
    });
});




/**
 * 开发时候的build:js
 */
gulp.task('dev:build:js', function(callback) {
    var server = new webpackDevServer(webpackCompiler, {
        // publicPath: "http://localhost:8080/dist/",
        // hot: true,
        inline: true,
        progress: true,
        quiet: false,
        noInfo: false,
        // filename: "build.js",
        historyApiFallback: false,
        stats: { colors: true },
        proxy: {
            "/test/*": {
                target: "http://localhost:8088",
                secure: false,
            }
        },
        watchOptions: {
            aggregateTimeout: 300,
            poll: true
        }
    });
    server.listen(4001, function(argument) {
        console.log('server is runing 4001');
    });
    // webpackCompiler.run(function(error, status) {
    //     if (error) {
    //         throw new gulpUtil.PluginsError('webpack:build:js', error);
    //     }

    //     gulpUtil.log('[webpack:build:js]', status.toString({
    //         colors: true
    //     }));

    //     callback();
    // })
});





gulp.task('dev', ['dev:build:js']);

gulp.task('test', function(callback) {
    runSequence('clean', 'build:js',
        callback);
});

gulp.task('build', function(callback) {
    runSequence('clean', 'build:js',   ['md5:js', 'md5:css'],
        callback);
});