"use strict";

var gulp = require("gulp");
var Config = require('./gulpfile.config');
var concat = require('gulp-concat');
var tsc = require('gulp-typescript');
var tslint = require('gulp-tslint');

var config = new Config();

gulp.task('compile', function () {

    var sourceTsFiles = ['./wwwroot/**/*.ts'];

    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(tsc({
                           "experimentalDecorators": true,
                           "emitDecoratorMetadata": true,
                           "module": "commonJS",
                           "target": "es5",
                           "removeComments": true
                       }));

    tsResult.dts.pipe(gulp.dest('./wwwroot/'));

    return tsResult.js.pipe(gulp.dest('./dist/'));
});

gulp.task('concat-js', function () {
    return gulp.src(config.allJavaScript)
      .pipe(concat('app.js'))
      .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', ['concat-js'], function () {
    gulp.watch(config.allFiles, ['concat-js']);
});

gulp.task('default', ['concat-js', 'watch']);