var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var cp = require('child_process');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

const gutil = require('gulp-util');
const siteRoot = '_site';
const jadeFiles = '_jadefiles/**/*.jade';
const sassFiles = 'assets/css/**/*.sass';
const jsFiles = 'assets/js/**/*.js';

gulp.task('jekyll', ['sass', 'jade'],() => {
  const jekyll = cp.spawn('jekyll', ['build',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('serve', () => {
  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: siteRoot
    }
  });

  gulp.watch(jadeFiles, ['jade']);
  gulp.watch(jsFiles, ['js']);
  gulp.watch(sassFiles, ['sass']);
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function() {
  return gulp.src('assets/css/main.sass')
    .pipe(sass({
      includePaths: ['css'],
      onError: browserSync.notify
    }))
    .pipe(prefix(['last 3 versions', '> 5%', 'ie 8', 'ie 7'], {
      cascade: true
    }))
    .pipe(minifycss())
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest('assets/css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});
/*
 * Compile Jade into _includes
 */
gulp.task('jade', function() {
  return gulp.src('_jadefiles/**/*.jade')
    .pipe(jade())
    .pipe(rename({
      dirname: ''
    }))
    .pipe(gulp.dest('_includes'));
});
/*
 ** minify and uglify js.
 */
gulp.task('js', function() {
  return gulp.src('assets/js/common.js')
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/'));
});
/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', gulpsync.sync(['jekyll', 'sass', 'js', 'jade', 'serve']));
