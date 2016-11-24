var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
// var sass        = require('gulp-sass');
var ts          = require('gulp-typescript');
var compass     = require('gulp-compass');
var rollup      = require('gulp-rollup');
var uglify      = require('gulp-uglify');
var uglifyjs    = require('uglify-js-harmony');
var minifier    = require('gulp-uglify/minifier');
var pump        = require('pump');

var tsProject = ts.createProject('tsconfig.json');

// Static server
gulp.task('serve',['ts','bundle','compass'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
        
    });
    //gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("scss/**/*.scss",['compass']);
    gulp.watch("ts/*.ts", ['ts','bundle']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("js/*.js").on('change', browserSync.reload);
    gulp.watch("css/*.js").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
// gulp.task('sass', function() {
//     return gulp.src("scss/*.scss")
//         .pipe(sass({compass:true}))
//         .pipe(gulp.dest("."))
//         .pipe(browserSync.stream());
// });

// Compile sass into CSS & auto-inject into browsers
gulp.task('ts', function() {
    return gulp.src("ts/*.ts")
        .pipe(tsProject())
        .pipe(gulp.dest("js"))
        .pipe(browserSync.stream());
});

gulp.task('compass', function() {
  gulp.src('scss/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'css',
      sass: 'scss'
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

gulp.task('compress', function (cb) {
  var options = {
    preserveComments: 'license'
  };
  pump([
        gulp.src('js/*.js'),
        minifier(options, uglifyjs),//uglify(), //
        gulp.dest('js')
    ],
    cb
  );
});

gulp.task('bundle',['ts'], function() {
  gulp.src('js/*.js')
    // transform the files here.
    .pipe(rollup({entry:'./js/ajudati2.js'}))
    .pipe(gulp.dest('js'));
});

gulp.task('default', ['serve']);
gulp.task('build', ['sass','ts']);
