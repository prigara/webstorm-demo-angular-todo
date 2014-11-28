'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('html', function () {
    var assets = $.useref.assets();

    return gulp.src('index.html')
        .pipe(assets)
        // Concatenate And Minify JavaScript with ng-annotate
        .pipe($.if('*.js', $.ngAnnotate()))
        // Concatenate And Minify Styles
        .pipe($.if('*.css', $.csso()))
        .pipe(assets.restore())
        .pipe($.useref())
        // Minify Any HTML
        .pipe($.if('*.html', $.minifyHtml()))
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'html'}));
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['dist']));

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (cb) {
    runSequence(['html'], cb);
});

