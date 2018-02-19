'use strict';

var gulp = require('gulp');
var gulpNgConfig = require('gulp-ng-config');
var config = require('./config');
var path = require('path');

/**
 * Add env constants
 * @gulptask constants
 */
gulp.task('constants-prod', function() {
  return gulp.src('config.json')
  .pipe(gulpNgConfig('myApp.config', {
    environment: 'production'
  }))
  .pipe(gulp.dest(path.join(config.paths.src, '/app/services')))
});

gulp.task('constants-local', function() {
  return gulp.src('config.json')
  .pipe(gulpNgConfig('myApp.config', {
    environment: 'local'
  }))
  .pipe(gulp.dest(path.join(config.paths.src, '/app/services')))
});
