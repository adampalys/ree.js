(function() {

  /* globals require, console */

  'use strict';

  var gulp = require('gulp');
  var $ = require('gulp-load-plugins')();
  var del = require('del');
  var runSequence = require('run-sequence');
  var browserSync = require('browser-sync');
  var reload = browserSync.reload;

  gulp.task('clean', function(cb) {
    del(['build'], cb);
  });

  gulp.task('vulcanize', function() {
    return gulp.src('src/ree-app.html')
      .pipe($.vulcanize({
        stripComments: true,
        inlineCss: true,
        inlineScripts: true
      }))
      .on('error', function(e) {
        console.log(e);
      })
      .pipe(gulp.dest('build'))
      .pipe($.size({title: 'vulcanize'}));
  });

  gulp.task('lint', function() {
    return gulp.src([
      'src/**/*.js',
      'src/**/*.html',
      '!src/components/**/*',
      'gulpfile.js'
      ])
    .pipe($.if('*.html', $.htmlExtract()))
    .pipe($.jshint())
    .pipe($.jscs())
    .pipe($.jscsStylish.combineWithHintResults())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
  });

  gulp.task('serve', function() {
    browserSync({
      port: 5000,
      notify: false,
      open: false,
      logPrefix: 'PSK',
      snippetOptions: {
        rule: {
          match: '<span id="browser-sync-binding"></span>',
          fn: function(snippet) {
            return snippet;
          }
        }
      },
      server: {
        baseDir: ['src']
      }
    });

    gulp.watch(['src/**/*.html'], reload);
    gulp.watch(['src/**/*.css'], reload);
    gulp.watch(['src/**/*.js'], reload);
  });

  gulp.task('build', function(cb) {
    runSequence(
      'lint',
      'clean',
      'vulcanize',
      cb
    );
  });

  gulp.task('default', ['build']);

}());
