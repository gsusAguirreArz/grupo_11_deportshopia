/**
 * ------------------------------------
 *  Package IMPORTS
 * ------------------------------------
 */

// Core Imports
const path = require('path');
const {src, dest, series, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imgmin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

// Utilities 
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

// JS Utilities
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

/**
 * ------------------------------------
 *  PATHS
 * ------------------------------------
 */

// Source PATHS
const sourcePATHS = {
    sass: path.join(__dirname, './scss/styles.scss'),
    images: path.join(__dirname, '../media/**/*'),
    wp: path.join(__dirname, '../public/images/min/**/*'),
    js: path.join(__dirname, './js/**/*.js')
};

// Dest PATHS
const destPATHS = {
    sass: path.join(__dirname, '../public/css'),
    images: path.join(__dirname, '../public/images/min'),
    wp: path.join(__dirname, '../public/images/webp'),
    js: path.join(__dirname, '../public/js')
};

/**
 * ------------------------------------
 *  FUNCTIONS
 * ------------------------------------
 */

// SASS Compiler into CSS
function compileCSS (){
    console.log(`Compilando SASS...`);
    return src( sourcePATHS.sass )
            .pipe( sourcemaps.init() )
            .pipe( sass() )
            .pipe( postcss( [autoprefixer(), cssnano()] ) )
            .pipe( sourcemaps.write('.') )
            .pipe( dest(destPATHS.sass) );
}

// Watch function
function watchFiles() {
    const SCSS_DIRPATH = path.join(__dirname, './scss/**/*.scss');
    watch(SCSS_DIRPATH, compileCSS);
}

// Raw Image Minifier
function images(){
    return src( sourcePATHS.images )
            .pipe( imgmin() )
            .pipe( dest(destPATHS.images) )
            .pipe( notify({message: 'Imagen Minificada'}) );
}

// Create WEBP image version
function imgWebp() {
    return src( sourcePATHS.wp )
            .pipe( webp() )
            .pipe( dest(destPATHS.wp) )
            .pipe( notify({message:"Version webp lista"}) );
}

// JS concatenator and minifier
function javascript(){
    return src( sourcePaths.js )
            .pipe( sourcemaps.init() )
            .pipe( concat('main.js') )
            .pipe( terser() )
            .pipe( sourcemaps.write('.') )
            .pipe( rename({suffix: '.min'}) )
            .pipe( dest(destPaths.js) );
}

module.exports.default = series(compileCSS, images, imgWebp, watchFiles);