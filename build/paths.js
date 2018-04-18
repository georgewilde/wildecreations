module.exports = {
    source: {
        styles: [
            './src/styles/vendor/normalize.css',
            './src/styles/vendor/html5-boilerplate.css',
            './src/styles/main.scss',
        ],
        images: [
            './src/images/**',
        ],
        fonts: [
            './src/fonts/**',
        ],
        scripts: [
            './src/scripts/vendor/modernizr-3.5.0.min.js',
            './node_modules/jquery/dist/jquery.min.js',
        ],
        pages: [
            './src/**/*.html',
        ],
    },
    dist: {
        styles: './dist',
        images: './dist/images',
        fonts: './dist/fonts',
        scripts: './dist',
        pages: './dist',
    }
};
