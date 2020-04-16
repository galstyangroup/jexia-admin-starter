module.exports = {
    plugins: [
        require('precss'),
        require('postcss-viewport-height-correction'),
        require('cssnano'),
        // require('oldie'),
        require('autoprefixer')
    ],
}