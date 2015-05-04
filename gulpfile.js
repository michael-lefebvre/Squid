var buildFolder  = './build/'
  , gulp         = require('gulp')
  , source       = require('vinyl-source-stream')
  , browserify   = require('browserify')
  , reactify     = require('reactify')
  , sass         = require('gulp-sass')
  , sourcemaps   = require('gulp-sourcemaps')
  , autoprefixer = require('gulp-autoprefixer')
  , concat       = require('gulp-concat')


// Compile Sass
gulp.task('sass', function () 
{
  gulp.src('./scss/squid.scss')
    .pipe( sourcemaps.init() )
    .pipe( sass({
      includePaths: require('node-bourbon').includePaths
    }) )
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(
    {
        browsers: ['last 2 versions']
      , cascade: false
    }))
    .pipe( gulp.dest( buildFolder ) )
})

gulp.task('move', function() 
{
  gulp
    .src([
        'index.html'
      , 'package.json'
      , 'components/repos.json'
      , 'squid-header.png'
      , 'icons/*'
      , 'updater.js'
      , 'VERSION'
    ])
    .pipe( gulp.dest( buildFolder ) )
})


gulp.task('browserify', function () 
{
  return browserify( './js/app.js' )
    .transform( reactify )
    .bundle()
    .pipe( source('squid.js') )
    .pipe( gulp.dest( buildFolder ) )
})

gulp.task('watch', function() 
{
  gulp.watch( [
      'scss/*.scss'
    , 'scss/**/*.scss'
    , 'package.json'
    , 'index.js'
    , 'updater.js'
    , 'components/*.js'
    , 'methods/*.js'
    , 'js/*.js'
    , 'js/*/*.js'
    , 'VERSION'
  ], ['sass','browserify', 'move'] )
})

gulp.task('default', ['move', 'sass', 'browserify', 'watch'])

gulp.task('build', ['move', 'sass', 'browserify'])




