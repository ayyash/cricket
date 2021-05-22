const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'none',
    entry: { en: './server.ts', ar: './server.ar.ts' },
    resolve: { extensions: ['.js', '.ts'], mainFields: [ 'main', 'module'] },
    target: 'node',
    // this makes sure we include node_modules and other 3rd party libraries
    externals: [/(node_modules|main\..*\.js)/],
    output: {
        path: path.join(__dirname, '../cricket.host/server'),
        filename: '[name].js'
    },
    module: {
        rules: [{ test: /\.ts$/, loader: 'ts-loader' }]
    },
    plugins: [
        // Temporary Fix for issue: https://github.com/angular/angular/issues/11580
        // for "WARNING Critical dependency: the request of a dependency is an expression"
        new webpack.ContextReplacementPlugin(
            /(.+)?angular(\\|\/)core(.+)?/,
            path.join(__dirname, 'src'), // location of your src
            {} // a map of your routes
        ),
        // workaround for https://github.com/angular/angular-cli/issues/9975
        new webpack.ContextReplacementPlugin(
            /(.+)?angular(\\|\/)common(\\|\/)locales/,
            /(ar)$/
        ),
        new webpack.ContextReplacementPlugin(/(.+)?express(\\|\/)(.+)?/, path.join(__dirname, 'src'), {}),

    ]
};
