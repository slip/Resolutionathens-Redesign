var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var cp = require('child_process');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var imageOptim = require('gulp-imageoptim');

var gutil = require('gulp-util');
var siteRoot = '_site';
var jadeFiles = '_jadefiles/**/*.jade';
var sassFiles = 'assets/css/**/*.sass';
var jsFiles = 'assets/js/**/*.js';

var sassDevOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
}

var sassProdOptions = {
  errLogToConsole: true,
  outputStyle: 'compact'
}


gulp.task('jekyll', ['sass-prod', 'jade'], () => {
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

gulp.task('jekyll-prod', function() {
  const jekyll = cp.spawn('jekyll', ['build']);

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
  gulp.watch(sassFiles, ['sass-prod']);
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass-dev', function() {
  return gulp.src('assets/css/main.sass')
    .pipe(sourcemaps.init())
    .pipe(sass(sassDevOptions).on('error', sass.logError))
    .pipe(prefix())
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('sass-prod', function() {
  gulp.src('assets/css/main.sass')
    .pipe(sass(sassProdOptions).on('error', sass.logError))
    .pipe(prefix())
    .pipe(minifycss())
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest('assets/css/'))
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

// optimize images
gulp.task('images', function() {
  return gulp.src('assets/img/**/*')
    .pipe(imageOptim.optimize({
      jpegmini: true
    }))
    .pipe(gulp.dest('_site/assets/img'));
});


/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */

gulp.task('prod', gulpsync.sync(['js', 'jade', 'sass-prod', 'jekyll-prod', 'images']));
gulp.task('default', gulpsync.sync(['jekyll', 'sass-dev', 'js', 'jade', 'serve']));
