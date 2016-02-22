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

const paths = {
  bundle: 'main.js',
  srcJsx: 'javascripts/main.js',
  srcCss: 'stylesheets/main.css',
  srcImg: 'images/**',
  srcFont: 'font/**',
  dist: 'src',
  distFont: 'build/font'
};

const customOpts = {
  entries: [paths.srcJsx],
  debug: true
};

const opts = Object.assign({}, watchify.args, customOpts);

gulp.task('watchify', () => {
  let bundler = watchify(browserify(opts));

  function rebundle() {
    return bundler.bundle()
      .on('error', notify.onError())
      .pipe(source(paths.bundle))
      .pipe(buffer())
      .pipe(sourcemaps.init({
        loadMaps: true
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.dist))
      ;
  }

  bundler.transform(babelify)
    .on('update', rebundle);
  return rebundle();
});

gulp.task('browserify', () => {
  browserify(paths.srcJsx, {
      debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source(paths.bundle))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('styles', () => {
  gulp.src(paths.srcCss)
    .pipe(sourcemaps.init())
    .pipe(postcss([atImport, vars, extend, nested, autoprefixer, cssnano]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('lint', () => {
  gulp.src(paths.srcJsx)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watchTask', () => {
  gulp.watch(paths.srcCss, ['styles']);
  gulp.watch(paths.srcJsx, ['lint']);
});

gulp.task('watch', ['watchTask', 'watchify', 'styles', 'lint']);

gulp.task('build', ['browserify', 'styles']);
