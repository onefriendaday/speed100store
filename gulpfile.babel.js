const gulp = require('gulp')
const blok = require('gulp-blok')
const watch = require('gulp-watch')
const sass = require('gulp-sass')
const sassGlob = require('gulp-sass-glob')
const browserSync = require('browser-sync')
const config = require('./config.js')
const fs = require('fs')
const rename = require('gulp-rename')

if (config.blok.domain == 'INSERT_YOUR_DOMAIN') {
  config.blok.domain = 'ac0e600a.me.storyblok.com'
}

if (config.blok.themeId == 'INSERT_SPACE_ID') {
  config.blok.themeId = '40288'
}

gulp.task('deploy:dev', function () {
  return gulp.src('./views/**/*')
    .pipe(blok(config.blok))
})

gulp.task('deploy:live', function () {
  config.environment = 'live'

  return gulp.src('./views/**/*')
    .pipe(blok(config.blok))
})

gulp.task('styles:below', function () {
  return gulp.src('source/scss/below.scss')
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['node_modules/']
    }).on('error', sass.logError))
    .pipe(gulp.dest('./views/assets/css/'))
    .pipe(browserSync.stream())
})

gulp.task('styles:above', function () {
  return gulp.src('source/scss/above.scss')
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['node_modules/']
    }).on('error', sass.logError))
    .pipe(gulp.dest('./views/assets/css/'))
    .pipe(browserSync.stream())
    .pipe(rename('_above_fold_css.liquid'))
    .pipe(gulp.dest('./views/components/'))
})

gulp.task('styles:quickstart', function () {
  return gulp.src('source/scss/quickstart.scss')
    .pipe(sassGlob())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./views/assets/css/'))
    .pipe(browserSync.stream())
})

gulp.task('vendor:scripts', function () {
  return gulp.src('source/js/vendor/*')
    .pipe(gulp.dest('views/assets/js/vendor'))
})

gulp.task('browsersync', function () {
  browserSync({
    port: 4440,
    serveStatic: ['./views'],
    proxy: {
      target: 'https://' + config.blok.domain,
      reqHeaders: function () {
        return {
          'accept-encoding': 'identity',
          'agent': false,
          'browsersyncblok': true,
          'storyblokenv': config.blok.environment
        }
      }
    },
    reloadDelay: 500,
    notify: true,
    open: true,
    logLevel: 'silent'
  })

  gulp.watch(['source/scss/_variables.scss'], ['styles:above', 'styles:below'])
  gulp.watch(['source/scss/above.scss', 'source/scss/components/above/**/*.scss', 'source/scss/components/elements/**/*.scss'], ['styles:above'])
  gulp.watch(['source/scss/below.scss', 'source/scss/components/below/**/*.scss'], ['styles:below'])
  gulp.watch('source/js/vendor/*.js', ['vendor:scripts'])
  gulp.watch('views/assets/js/**/*.js', function(event) {
    browserSync.reload()
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  })
})

gulp.task('build', ['styles:above', 'styles:below'])

gulp.task('default', ['build', 'browsersync'], function () {
  return watch('./views/**/*')
    .pipe(blok(config.blok))
})
