module.exports = {
    source: {
        styles: [
            './src/styles/vendor/normalize.css',
            './src/styles/vendor/html5-boilerplate.css',
            './src/styles/vendor/fontello-embedded.css',
            './src/styles/main.scss',
        ],
        images: [
            './src/images/**',
        ],
        videos: [
            './src/videos/**',
        ],
        fonts: [
            './src/fonts/**',
        ],
        scripts: [
            './src/scripts/vendor/modernizr-3.5.0.min.js',
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/bootstrap/dist/js/bootstrap.js'
        ],
        pages: [
            './src/**/*.html',
            './site.webmanifest'
        ],
    },
    dist: {
        styles: './dist',
        images: './dist/images',
        videos: './dist/videos',
        fonts: './dist/fonts',
        scripts: './dist',
        pages: './dist',
    }
};
