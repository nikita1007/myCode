const gulp = require('gulp');
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');

// Конфигурация путей
const paths = {
  styles: {
    watch: 'scss/**/*.scss',
    src: 'scss/main.scss',
    dest: 'css/'
  }
};

// Задача для компиляции Sass
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest));
}

// Задача для минификации CSS
function minifyStyles() {
  return gulp.src(paths.styles.dest + 'main.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.styles.dest));
}

// Задача для отслеживания изменений в файлах Sass
function watch() {
  gulp.watch(paths.styles.watch, styles);
}

// Задача по умолчанию
exports.default = gulp.series(styles, minifyStyles, watch);
