(function () {

  /* globals require, console */

  'use strict';

  var gulp = require('gulp');
  var $ = require('gulp-load-plugins')();
  var del = require('del');
  var runSequence = require('run-sequence');
  var browserSync = require('browser-sync');
  var reload = browserSync.reload;

  // Clean output directory
  gulp.task('clean', function (cb) {
    del(['dist', '.temp'], cb);
  });

  gulp.task('copy', function (cb) {
    gulp.src(['../../bower_components/**/*'])
    .pipe(gulp.dest('.temp'))
    .on('end', function(){
      gulp.src(['src/**/*'])
      .pipe(gulp.dest('.temp/ree.js/src'))
      .on('end', cb);
    });
  });

  gulp.task('copy-demo', function (cb) {
    gulp.src(['src/demo/**/*'])
    .pipe(gulp.dest('dist/demo'))
    .on('end', cb);
  });

  // Vulcanize granular configuration
  gulp.task('vulcanize', function () {
    return gulp.src([
      '.temp/ree.js/src/ree-app.html'
    ])
    .pipe($.vulcanize({
      stripComments: true,
      inlineCss: true,
      inlineScripts: true
    }))
    .on('error', function(e) {
      console.log(e);
    })
    .pipe($.minifyInline())
    .pipe($.crisper({
      scriptInHead: false,
      onlySplit: false
    }))
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'vulcanize'}));
  });

  // Commit to dist branch
  gulp.task('dist', function () {
    return gulp.src([
      'dist/**/*',
      'README.md',
      'LICENSE'
    ])
    .pipe($.ghPages({ branch: 'dist', force: true }));
  });

  // Lint JavaScript
  gulp.task('lint', function() {
    return gulp.src([
      'src/**/*.js',
      'src/**/*.html',
      ])
      .pipe(reload({
        stream: true,
        once: true
      }))

    // JSCS has not yet a extract option
    .pipe($.if('*.html', $.htmlExtract()))
    .pipe($.jshint())
    .pipe($.jscs())
    .pipe($.jscsStylish.combineWithHintResults())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
  });

  gulp.task('watch', function () {

    gulp.watch([
      'src/**/*.js',
      'src/**/*.html'],
      ['build']
    );

    runSequence('build');

  });

  gulp.task('build', function (cb) {
    runSequence(
      'lint',
      'clean',
      'copy',
      'vulcanize',
      'copy-demo',
      cb
    );
  });

  // Build production files, the default task
  gulp.task('default', ['build']);

}());
