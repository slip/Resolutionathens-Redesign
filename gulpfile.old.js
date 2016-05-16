var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var cp = require('child_process');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var bourbon = require('bourbon').includePaths;

const sassFiles = 'assets/css/**/*.sass';
const jsFiles = 'assets/js/**/*.js';

var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['build',
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

  gulp.watch(jsFiles, ['js']);
  gulp.watch(sassFiles, ['sass']);
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jekyll-build', 'sass', 'js', 'jade'], function() {
  browserSync({
    server: {
      baseDir: '_site'
    },
    notify: false
  });
  // add browserSync.reload to the tasks array to make
  // all browsers reload after tasks are complete.
  gulp.watch("_jadefiles/**/*.sass", ['jade-watch']);
  gulp.watch("assets/js/**/*.sass", ['js-watch']);
  gulp.watch("assets/css/**/*.sass", ['sass-watch']);
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass-watch', ['sass'], browserSync.reload);
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
    .pipe(gulp.dest('_site/assets/css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

/*
 * Compile Jade into _includes
 */
gulp.task('jade-watch', ['jade'], browserSync.reload);
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
gulp.task('js-watch', ['js'], browserSync.reload);
gulp.task('js', function() {
  return gulp.src('assets/js/common.js')
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('_site/assets/js'));
});


/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function() {
  // gulp.watch('assets/css/**/*.sass', ['sass']);
  // gulp.watch('assets/js/**/*.js', ['js']);
  // gulp.watch('_jadefiles/**/*.jade', ['jade']);
  // gulp.watch('_site/assets/**', ['browser-sync']);
  gulp.watch(['index.html',
    '_layouts/*.html',
    '_includes/*',
    'case-studies/index.html',
    'contact/index.html',
    'portfolio/index.html',
    'process/index.html',
    'services/index.html'
  ], ['jekyll-rebuild']);
});
// TODO: fix this file so that the default task builds first, then adds the css, then the js, then syncs the browser

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['watch', 'sass', 'js', 'browser-sync']);