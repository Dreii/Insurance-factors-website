const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const csso = require('gulp-csso')
const del = require('del')
const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const sass = require('gulp-sass')
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin')

// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

//Concat all css to one file
gulp.task('concat-css', () => gulp.src('./css/*.css').pipe(concat('styles.css')).pipe(gulp.dest('./dist/')))

//Minify CSS file
gulp.task('minify-css', () => gulp.src('./dist/styles.css').pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS})).pipe(csso()).pipe(gulp.dest('./dist/')))

//Concat all js files
gulp.task('concat-js', () => gulp.src([
'./js/people.js',
'./js/plugins.js',
'./js/main.js',
]).pipe(concat('main.js')).pipe(gulp.dest('./dist/')))

// Minify JavaScript file
gulp.task('minify-js', () => gulp.src(['./dist/main.js', './js/vendor/*.js']).pipe(terser()).pipe(gulp.dest('./dist/')))

//Minify HTML files
gulp.task('minify-html', () => gulp.src(['./*.html']).pipe(htmlmin({collapseWhitespace: true, removeComments: true})).pipe(gulp.dest('./dist/')))

//Minify images
gulp.task('minify-images', () => gulp.src('./img/**/*').pipe(imagemin()).pipe(gulp.dest('./dist/img/')))

//remove old dist files
gulp.task('clean', () => del(['dist']))

// Gulp task to concat and minify all files
gulp.task('default', gulp.series('concat-css', 'concat-js', 'minify-css', 'minify-js', 'minify-html'))
gulp.task('package', gulp.series('clean', 'concat-css', 'concat-js', 'minify-css', 'minify-js', 'minify-html', 'minify-images'))
