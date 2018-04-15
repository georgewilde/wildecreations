const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const minifyCss = require('gulp-minify-css');
const minifyJs = require('gulp-minify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const watchify = require('watchify');
const gulpUtil = require('gulp-util');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');

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

const paths = {
    source: {
        styles: [
            './src/styles/vendor/normalize.css',
            './src/styles/vendor/html5-boilerplate.css',
            './src/styles/vendor/bootstrap.css',
            './src/styles/main.scss',
        ],
        images: [
            './src/images/**',
        ],
        scripts: [
            './src/scripts/vendor/modernizr-3.5.0.min.js',
            './src/scripts/vendor/jquery-3.2.1.min.js',
        ],
        pages: [
            './src/**/*.html',
        ],
    },
    dist: {
        styles: './dist',
        images: './dist/images',
        scripts: './dist',
        pages: './dist',
    }
};

gulp.task('copy-images', () => {
    return gulp.src(paths.source.images)
        .pipe(gulp.dest(paths.dist.images));
});

gulp.task('copy-html', () => {
    return gulp.src(paths.source.pages)
        .pipe(gulp.dest(paths.dist.pages));
});

gulp.task('process-styles', () => {
    return gulp.src(paths.source.styles)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('./bundle.css'))
        .pipe(minifyCss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dist.styles));
});

gulp.task('process-vendor-scripts', () => {
    return gulp.src(paths.source.scripts)
        .pipe(sourcemaps.init())
        .pipe(concat('./vendor-bundle.js'))
        .pipe(minifyJs({
            ext: {
                min: '.js',
            },
            noSource: true,
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dist.scripts));
});

function bundleTypescriptOnDev() {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(paths.dist.scripts));
}

function bundleTypescriptOnProd() {
    return browserify(browserifyOptions)
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .on('error', (error) => {
            gulpUtil.log(gulpUtil.colors.red('[Error]'), error.toString());
        })
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dist.scripts));
}

gulp.task('prod', [
    'copy-images',
    'copy-html',
    'process-styles',
    'process-vendor-scripts',
], bundleTypescriptOnProd);

gulp.task('dev', [
    'copy-images',
    'copy-html',
    'process-styles',
    'process-vendor-scripts',
], bundleTypescriptOnDev);

watchedBrowserify.on('update', bundleTypescriptOnDev);
watchedBrowserify.on('log', gulpUtil.log);
