var path = require('path');

module.exports = {
    /**
     * Path from which all relative webpack paths will be resolved.
     */
    context: path.resolve(__dirname),
    /**
     * Entry point to the application, webpack will bundle all imported modules.
     */
    entry: './src/index.ts',
    /**
     * Rule for which files should be transpiled via typescript loader.
     */
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{
                    loader: 'ts-loader'
                }]
            }
        ]
    },
    resolve: {
        /**
         * Resolve the following extensions when requiring/importing modules.
         */
        extensions: ['.ts', '.js']
    },
    /**
     * Specify output as an UMD library.
     */
    output: {
        path: 'build/dist',
        filename: 'baasic-sdk-angular.js',
        library: 'baasicSdkAngular',
        libraryTarget: 'umd'
    },
    /**
     * Make angular an external dependency, won't be bundled but will be required from the environment 
     * (e.g. in nodejs through require, in browser on window object etc.)
     */
    externals: 'angular'
}