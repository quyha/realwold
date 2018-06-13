const path = require('path');

var config = {
    entry: [
        './src/client/index.jsx'
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        contentBase: './dist',
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                use: [
                    'style-loader',
                    'css-loader'
                ],
                test: '/\.css$/'
            }
        ]
    }
};

module.exports = config;