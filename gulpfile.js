var buildFolder  = './build/'
  , gulp         = require('gulp')
  , fs           = require('fs')
  , rename       = require('gulp-rename')
  , sass         = require('gulp-sass')
  , sourcemaps   = require('gulp-sourcemaps')
  , autoprefixer = require('gulp-autoprefixer')
  , concat       = require('gulp-concat')
  , uglify       = require('gulp-uglify')
  , source       = require('vinyl-source-stream')
  , browserify   = require('browserify')
  , reactify     = require('reactify')
  , transform    = require('vinyl-transform')

gulp.task('default', [
    'sass'
  , 'concat'
])

// Compile Sass
gulp.task('sass', function () 
{
  gulp.src('./src/scss/squid.scss')
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

gulp.task('concat', function () 
{
  browserify( './index.js' )
    .transform( reactify )
    .bundle()
    .pipe( source('squid.js') )
    .pipe( gulp.dest( buildFolder ) )

// './src/lib/jquery-2.0.3/build/jquery.js'
// , './src/lib/react-0.8.0/build/react.js'
// , './src/lib/react-0.8.0/build/JSXTransformer.js'


  // gulp.src([
  //       './src/lib/underscore-1.5.2/build/underscore.js'
  //     , './src/lib/backbone-1.1.0/build/backbone.js'
  //     , './src/js/closure.intro.js'
  //     , './src/js/helpers/*.js'
  //     , './src/js/models/*.js'
  //     , './src/js/squid.js'
  //     , './src/js/test.js'
  //     , './src/js/closure.outro.js'])
  //   // .pipe( sourcemaps.init() )
  //     .pipe( concat('squid.js') )
  //   // .pipe( sourcemaps.write() )
  //   // .pipe( uglify() )
  //   .pipe( gulp.dest( buildFolder ) )
})

gulp.task('browserify', function () 
{
  return browserify( buildFolder + 'squid.js' )
    .transform( reactify )
    .bundle()
    .pipe( source('bundle.js') )
    .pipe( gulp.dest( buildFolder ) )
})


gulp.task('watch', function () 
{
  gulp.watch(
      ['./src/scss/*.scss', './src/scss/**/*.scss', './src/js/*', './index.js']
    , ['sass', 'concat']
  )
})
