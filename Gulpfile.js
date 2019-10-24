'use strict'

const gulp = require('gulp')
const gls = require('gulp-live-server')

// simple task to copy static file(s) to a folder accessible publicly via the web server
gulp.task('static', function () {
  return gulp.src('node_modules/lodash/lodash.min.js')
    .pipe(gulp.dest('public/static/js'))
})

gulp.task('run', function () {
  let server = gls.new('app.js')
  server.start()
})

gulp.task('start', gulp.parallel('static', 'run'))
