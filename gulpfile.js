const gulp = require('gulp');
const mocha = require('gulp-spawn-mocha');
const babel = require('gulp-babel');

const paths = {
  src: ['src/**/*.js'],
  scripts: ['src/**/*.js', 'test/**/*.js'],
  test: ['test/**/*.js'],
};

gulp.task('build', () => gulp
  .src(paths.src)
  .pipe(babel({ presets: ['es2015'] }))
  .pipe(gulp.dest('dist')));

gulp.task('test', () => gulp
  .src(paths.test)
  .pipe(mocha({
    exit: true,
    istanbul: true,
    NODE_ENV: 'test',
    reporter: 'spec',
  })));
