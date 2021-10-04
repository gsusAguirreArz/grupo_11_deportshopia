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

// ****Utilities****

// PostProcessing of CSS
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

// Nodemon
const nodemon = require('gulp-nodemon');

// JS Utilities
// const terser = require('gulp-terser-js');
// const rename = require('gulp-rename');

/**
 * ------------------------------------
 *  PATHS
 * ------------------------------------
 */

// Source PATHS
const sourcePATHS = {
    sass: path.join(__dirname, './gulp/scss/styles.scss')
};

// Dest PATHS
const destPATHS = {
    sass: path.join(__dirname, './public/css')
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

// Watch function
async function watchFiles() {
    const SCSS_FILES = path.join(__dirname, './gulp/scss/**/*.scss');
    return watch(SCSS_FILES, SASS);
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

module.exports.default = parallel(watchFiles,startNodemon);