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
