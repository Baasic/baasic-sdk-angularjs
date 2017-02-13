var commonConfig = require('./webpack.common');
var webpackMerge = require('webpack-merge');

module.exports = webpackMerge(commonConfig, {
    /**
     * Developer tool to enhance debugging
     *
     * See: http://webpack.github.io/docs/configuration.html#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    devtool: 'cheap-module-eval-source-map'
});
