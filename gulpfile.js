const { series, watch, src, dest } = require('gulp');
const sass = require('gulp-sass');
const tildeImporter = require('node-sass-tilde-importer');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const minifyCss = require('gulp-minify-css');
const minifyJs = require('gulp-minify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const watchify = require('watchify');
const gulpUtil = require('gulp-util');
const uglify = require('gulp-uglify-es').default;
const buffer = require('vinyl-buffer');
const autoprefixer = require('gulp-autoprefixer');
const paths = require('./build/paths');

const browserifyOptions = {
  basedir: '.',
  debug: true,
  entries: ['src/scripts/main.ts'],
  cache: {},
  packageCache: {},
};

const watchedBrowserify = watchify(browserify(browserifyOptions)
  .plugin(tsify)
  .transform('babelify', {
    extensions: ['.ts']
  }));

function copyImages() {
  return src(paths.source.images)
    .pipe(dest(paths.dist.images));
}

function copyVideos() {
  return src(paths.source.videos)
    .pipe(dest(paths.dist.videos));
}

function copyFonts() {
  return src(paths.source.fonts)
    .pipe(dest(paths.dist.fonts));
}

function copyHtml() {
  return src(paths.source.pages)
    .pipe(dest(paths.dist.pages));
}

function processStyles() {
  return src(paths.source.styles)
    .pipe(sourcemaps.init())
    .pipe(sass({
      importer: tildeImporter,
    })
      .on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
    }))
    .pipe(concat('./bundle.css'))
    .pipe(minifyCss())
    .pipe(sourcemaps.write('./'))
    .pipe(dest(paths.dist.styles));
}

function processVendorScripts() {
  return src(paths.source.scripts)
    .pipe(sourcemaps.init())
    .pipe(concat('./vendor-bundle.js'))
    .pipe(minifyJs({
      ext: {
        min: '.js',
      },
      noSource: true,
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(dest(paths.dist.scripts));
}

function bundleTypescriptOnDev() {
  return watchedBrowserify
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(dest(paths.dist.scripts));
}

function bundleTypescriptOnProd() {
  return browserify(browserifyOptions)
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .on('error', (error) => {
      gulpUtil.log(gulpUtil.colors.red('[Error]'), error.toString());
    })
    .pipe(sourcemaps.write('./'))
    .pipe(dest(paths.dist.scripts));
}

function watchHtml() {
  watch(paths.source.pages, series(copyHtml))
}

function watchStyles() {
  watch('./src/styles/*.scss', series(processStyles))
}

watchedBrowserify.on('update', bundleTypescriptOnDev);
watchedBrowserify.on('log', gulpUtil.log);

exports.default = series(
  copyImages,
  copyVideos,
  copyFonts,
  copyHtml,
  processStyles,
  processVendorScripts,
  bundleTypescriptOnDev,
  watchHtml,
  watchStyles
);

exports.dev = series(
  copyImages,
  copyVideos,
  copyFonts,
  copyHtml,
  processStyles,
  processVendorScripts,
  bundleTypescriptOnDev
);

exports.prod = series(
  copyImages,
  copyVideos,
  copyFonts,
  copyHtml,
  processStyles,
  processVendorScripts,
  bundleTypescriptOnProd
);
