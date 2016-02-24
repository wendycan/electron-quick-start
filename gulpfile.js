var gulp = require('gulp');
var browserify = require('gulp-browserify');

var sass = require('gulp-sass');

var concat = require('gulp-concat');

const paths = {
  bundle: 'main.js',
  srcJs: 'javascripts/main.coffee',
  srcCss: 'stylesheets/main.scss',
  dist: 'src'
};

gulp.task('coffee', function () {
  return gulp.src(paths.srcJs, {
      read: false
    })
    .pipe(browserify({
      transform: ['coffeeify'],
      extensions: ['.coffee']
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('sass', function () {
  gulp.src(paths.srcCss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dist));
});

gulp.watch(paths.srcJs, ['coffee']);
gulp.watch(paths.srcCss, ['sass']);

gulp.task('default', ['coffee', 'sass']);
