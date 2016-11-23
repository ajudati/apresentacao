var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var ts          = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json');

// Static server
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("*.scss", ['sass']);
    gulp.watch("*.ts", ['ts']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("*.js").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("*.scss")
        .pipe(sass())
        .pipe(gulp.dest("."))
        .pipe(browserSync.stream());
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('ts', function() {
    return gulp.src("*.ts")
        .pipe(tsProject())
        .pipe(gulp.dest("."))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
gulp.task('build', ['sass','ts']);
