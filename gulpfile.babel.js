import gulp from 'gulp';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import notify from 'gulp-notify';

import babelify from 'babelify';
import eslint from 'gulp-eslint';
import sourcemaps from 'gulp-sourcemaps';

import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import atImport from 'postcss-import';
import nested from 'postcss-nested';
import vars from 'postcss-simple-vars';
import extend from 'postcss-simple-extend';
import cssnano from 'cssnano';
import concat from 'gulp-concat';

const paths = {
  bundle: 'main.js',
  srcJs: 'javascripts/main.js',
  srcCss: 'stylesheets/main.scss',
  srcImg: 'images/**',
  srcFont: 'font/**',
  dist: 'src',
  distFont: 'build/font'
};

gulp.task('js', function () {
  gulp.src(paths.srcJs)
    .pipe(concat('main.js'))
    .pipe(gulp.dest(dist));
});

gulp.task('scss', () => {
  gulp.src(paths.srcCss)
    .pipe(sourcemaps.init())
    .pipe(postcss([atImport, vars, extend, nested, autoprefixer, cssnano]))
    .pipe(sourcemaps.write('.'))
    .pipe(concat('main.css'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('lint', () => {
  gulp.src(paths.srcJsx)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watchTask', () => {
  gulp.watch(paths.srcCss, ['scss']);
  gulp.watch(paths.srcJs, ['js']);
});

gulp.task('watch', ['watchTask', 'js', 'scss']);

gulp.task('build', ['js', 'scss']);
