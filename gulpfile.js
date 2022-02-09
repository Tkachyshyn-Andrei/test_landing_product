const {src, dest, series, watch, parallel} = require('gulp')
const scss = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const connect = require('gulp-connect');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
// const cssmin = require('gulp-cssmin');


const appPath = {
    scss: './app/scss/**/*.scss',
    // css: './app/css/*.css',
    js: './app/script/*.js',
    img: [
        './app/images/**/*.jpg',
        './app/images/**/*.png',
        './app/images/**/*.svg',
    ]
}
const destPath = {
    css: './dist/css/',
    js: './dist/script/',
    img: './dist/images/'
}

const jsPath = [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/flickity/dist/flickity.pkgd.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    './node_modules/vanilla-tilt/dist/vanilla-tilt.min.js',
    './node_modules/jquery-validation/dist/jquery.validate.min.js',
    './node_modules/sweetalert2/dist/sweetalert2.all.min.js',
    './node_modules/flatpickr/dist/flatpickr.js',
    './node_modules/jquery.maskedinput/src/jquery.maskedinput.js',
    './app/script/script.js'
]

function imageMin() {
    return src(appPath.img)
        .pipe(imagemin())
        .pipe(dest(destPath.img))
        .pipe(connect.reload())
}

function scssCompress() {
    return src(appPath.scss)
        .pipe(sourcemaps.init())
        .pipe(scss({
            // outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write())
        .pipe(dest(destPath.css))
        .pipe(connect.reload())
}

function copyHtml() {
    return src('./app/*.html')
        .pipe(dest('./dist/'))
        .pipe(connect.reload())
}

function jsMin() {
    return src(jsPath)
        .pipe(sourcemaps.init())
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest(destPath.js))
        .pipe(connect.reload());

}

// function cssMin() {
//     return src(appPath.css)
//         .pipe(cssmin())
//         .pipe(dest(destPath.css))
//         .pipe(connect.reload())
// }

function server() {
    connect.server({
        name: 'Dev App',
        root: 'dist',
        port: 8080,
        livereload: true
    })
}

function watchCode() {
    watch('app/*.html', copyHtml);
    // watch(appPath.css, cssMin);
    watch(appPath.scss, scssCompress);
    watch(appPath.js, jsMin);
    watch(appPath.img, {events: 'add'}, imageMin);
}

exports.build = series(copyHtml, imageMin, jsMin, scssCompress)
exports.default = series(copyHtml, scssCompress, imageMin, jsMin, parallel(server, watchCode))