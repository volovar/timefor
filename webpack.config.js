const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env = {}) => ({
    entry: resolve(__dirname, 'src/index.js'),
    output: {
        filename: '[name].bundle.js',
        path: resolve(__dirname, env.production ? 'dist' : 'build'),
        publicPath: '/'
    },
    mode: env.production ? 'production' : 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: resolve(__dirname, 'node_modules'),
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(__dirname, 'src/index.html')
        })
    ],
    devServer: {
        port: 9113
    }
})