/**
 * ------------------------------------
 *  Package IMPORTS
 * ------------------------------------
 */

// ****Core Imports****
const path = require('path');
const {src, dest, series, parallel, watch} = require('gulp');

// SASS compiler
const sass = require('gulp-sass')(require('sass'));
const notify = require('gulp-notify');

// ****Utilities****

// PostProcessing of CSS
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
// const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

// Nodemon
const nodemon = require('gulp-nodemon');

// JS Utilities
const terser = require('gulp-terser-js');
// const rename = require('gulp-rename');
const concat = require('gulp-concat');

/**
 * ------------------------------------
 *  PATHS
 * ------------------------------------
 */

// Source PATHS
const sourcePATHS = {
    sass: path.join(__dirname, './gulp/scss/styles.scss'),
    images: path.join(__dirname, './gulp/media/images/**/*'),
    vwebp: path.join(__dirname, './gulp/media/images/**/*'),
    js: path.join(__dirname, './gulp/js/**/**/*.js'),
};

// Dest PATHS
const destPATHS = {
    sass: path.join(__dirname, './public/css'),
    images: path.join(__dirname, './public/images/min'),
    vwebp: path.join(__dirname, './public/images/webp'),
    js: path.join(__dirname, './public/js'),
};

/**
 * ------------------------------------
 *  FUNCTIONS (GULP TASKS)
 * ------------------------------------
 */

// SASS Compiler Outputs CSS
function SASS (){
    console.log(`Compilando SASS...`);
    return src( sourcePATHS.sass )
            .pipe( sourcemaps.init() )
            .pipe( sass())
            .pipe( postcss( [autoprefixer(), cssnano()] ) )
            .pipe( sourcemaps.write('.') )
            .pipe( dest(destPATHS.sass) );
}
// js minifier

function javascript(){
    console.log(`MInificando js ...`);
    return src( sourcePATHS.js )
            .pipe( sourcemaps.init() )
            .pipe( concat('bundle.js') )
            .pipe( terser() )
            .pipe( sourcemaps.write('.') )
            // .pipe( rename( {suffix: '.min'} ) )
            .pipe( dest(destPATHS.js) );
}

// Watch function
async function watchScssFiles() {
    const SCSS_FILES = path.join(__dirname, './gulp/scss/**/*.scss');
    return watch(SCSS_FILES, SASS);
}
async function watchJsFiles() {
    const JS_FILES = path.join(__dirname, './gulp/js/**/**/*.js');
    return watch(JS_FILES, javascript);
}

//
function imagesMin() {
    return src( sourcePATHS.images )
            .pipe( imagemin() )
            .pipe( dest( destPATHS.images ) )
            .pipe( notify( {message:'Imagen minificada'} ) );
}
function versionWebp() {
    return src( sourcePATHS.vwebP)
            .pipe( webp() )
            .pipe( dest( destPATHS.vwebP ) )
            .pipe( notify({message:"Version webp lista"}) );
}

// Nodemon
function startNodemon (done){
    return nodemon( {
        script: './bin/www',
        ext: 'js ejs css',
        env: { 'NODE_ENV': 'development'},
        done: done
    } );
}


module.exports.watchScssFiles = watchScssFiles;
module.exports.watchJsFiles = watchJsFiles;
module.exports.imagesMin = imagesMin;
module.exports.versionWebp = versionWebp;
module.exports.compileAll = series(SASS,versionWebp);
module.exports.default = parallel(watchScssFiles,startNodemon);