var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (options) {
    var appFolder = options.appFolder ? options.appFolder : 'src'; //folder
    var appPath = path.join(__dirname, '..', appFolder);
    var context = appPath;
    var entry = {
        main: options.entry ? options.entry : "./index.js" //file
    };
    var devtool = options.devtool ? options.devtool : 'eval';
    var outputFolder = options.outputFolder ? options.outputFolder : 'dist';
    var outputPath = path.join(__dirname, '..', outputFolder);
    var output = {
        path: outputPath,
        filename: options.entryFilename ? options.entryFilename : '[name].bundle.js',
        chunkFilename: options.chunkFilename ? options.chunkFilename : '[name].chunk.js',
        pathinfo: options.pathinfo ? options.pathinfo : false
    };
    var resolve = {
        alias: {
            common: path.join(__dirname, '..', 'src/common'),
            components: path.join(__dirname, '..', 'src/components')
        }
    };
    var loaders = [
        { test: /\.html$/, loader: 'html' },
        { test: /\.json$/, loader: 'json' },
        { test: /\.css$/, loader: 'style!css' },
        { test: /\.js$/, loader: 'ng-annotate' },
        { test: /\*.scss$/, loader: 'style!css!sass' },
        { test: /\.less$/, loader: 'style!css!less' },
        { test: /\.(ttf|eot|svg|png|gif|jpg|jpeg|woff|woff2)(.*)$/, loader: 'url?limit=10000' }
    ];
    var debug = options.debug ? options.debug : false;
    var plugins = [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html'
        })
    ];

    if (options.minify) {
        plugins.push(new webpack.optimize.CommonsChunkPlugin({
            children: true,
            minChunks: 2
        }));
        plugins.push(new webpack.optimize.DedupePlugin());
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }));
    }

    if (options.test) {
        plugins.push(new webpack.DefinePlugin({
            'typeof window': JSON.stringify('object')
        }));
    }

    return {
        context: context,
        entry: entry,
        devtool: devtool,
        output: output,
        resolve: resolve,
        module: {
            loaders: loaders
        },
        debug: debug,
        plugins: plugins
    };
};
