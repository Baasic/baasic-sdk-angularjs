var webpackDev = require('./webpack.dev');
var webpackMerge = require('webpack-merge');

module.exports = webpackMerge(webpackDev, {
    watch: true,
    watchOptions: {
        aggregateTimeout: 500,
        ignored: /node_modules/
    }
});