(function() {

  /* globals require */

  'use strict';

  var gulp = require('gulp');
  var $ = require('gulp-load-plugins')();
  var del = require('del');
  var runSequence = require('run-sequence');
  var browserSync = require('browser-sync');
  var reload = browserSync.reload;

  var DIST = 'dist';

  gulp.task('clean', function() {
    del([DIST]);
  });

  gulp.task('lint', function() {
    return gulp.src([
      'app/**/*.js',
      'app/**/*.html',
      '!app/bower_components/**/*',
      'gulpfile.js'
      ])
    .pipe($.if('*.html', $.htmlExtract()))
    .pipe($.jshint())
    .pipe($.jscs())
    .pipe($.jscsStylish.combineWithHintResults())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
  });

  gulp.task('vulcanize', function() {
    return gulp.src('app/ree-app.html')
      .pipe($.vulcanize({
        stripComments: true,
        inlineCss: true,
        inlineScripts: true
      }))
      .pipe(gulp.dest(DIST))
      .pipe($.size({title: 'vulcanize'})).on('end', function() {
        gulp.src([
          'app/index.html',
          'app/**/webcomponents-lite.min.js'
        ]).pipe(gulp.dest(DIST));
      }
    );
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
        baseDir: ['app']
      }
    });

    gulp.watch(['app/**/*.html'], reload);
    gulp.watch(['app/**/*.css'], reload);
    gulp.watch(['app/**/*.js'], reload);

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
