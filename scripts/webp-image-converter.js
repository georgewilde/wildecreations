var imagemin = require("imagemin"),
    webp = require("imagemin-webp"),
    outputFolder = "./img",
    PNGImages = "../src/images/*.png",
    JPEGImages = "../src/images/*.jpg";

imagemin([PNGImages], outputFolder, {
    plugins: [webp({
        lossless: true
    })]
});

imagemin([JPEGImages], outputFolder, {
    plugins: [webp({
        quality: 65
    })]
});
