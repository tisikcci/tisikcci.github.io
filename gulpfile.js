var gulp        = require('gulp'),
	jade        = require('gulp-jade'),
	sass        = require('gulp-sass'),
	prefix      = require('gulp-autoprefixer'),
	minifyCSS   = require('gulp-minify-css'),
	rename      = require('gulp-rename'),
	browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

//jade2html
gulp.task('jade2html', function() {
    gulp.src('jade/*.jade')
        .pipe(jade())
        .pipe(gulp.dest(''))
        .pipe(browserSync.stream());
});

//sass2css
gulp.task('compressCSS', function() {
    gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(minifyCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

// Watch 
gulp.task('watch', function () {
    gulp.watch(['jade/*.jade'],['scss*.scss'], ['compressCSS']);
});

// Default task
gulp.task('default', ['jade2html','compressCSS', 'browser-sync', 'watch']);