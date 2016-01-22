module.exports = require('./webpack.make-config.js')({
    entryFilename: '[name].[hash].bundle.js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    devtool: 'source-map',
    minify: true
});
