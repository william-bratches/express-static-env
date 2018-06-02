const gulp = require('gulp');
const mocha = require('gulp-spawn-mocha');

const paths = {
  scripts: ['src/**/*.js', 'test/**/*.js'],
  test: ['test/**/*.js'],
};

gulp.task('test', () => gulp
  .src(paths.test)
  .pipe(mocha({
    exit: true,
    istanbul: true,
    NODE_ENV: 'test',
    reporter: 'spec',
  })));
