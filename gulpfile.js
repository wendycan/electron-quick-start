var gulp = require('gulp');
var browserify = require('gulp-browserify');
var replace = require('gulp-replace');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

var baseUrl = 'file://' + __dirname + '/';

const paths = {
  bundle: 'main.js',
  srcHtml: 'html/*.html',
  srcJsWatched: './javascripts/*.coffee',
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
      // ignoreMissing: true,
      // detectGlobals: false
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('sass', function () {
  gulp.src(paths.srcCss)
    .pipe(concat('main.css'))
    .pipe(replace(/@import "[\/]+/g, "@import \"" + baseUrl))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('html', function () {
  gulp.src(paths.srcHtml)
    .pipe(replace(/src="[\/]+/g, "src=\"" + baseUrl))
    .pipe(replace(/href="[\/]+/g, "href=\"" + baseUrl))
    .pipe(gulp.dest(paths.dist));
})

gulp.watch(paths.srcJsWatched, ['coffee']);
gulp.watch(paths.srcCss, ['sass']);
gulp.watch(paths.srcHtml, ['html']);

gulp.task('default', ['coffee', 'sass', 'html']);
