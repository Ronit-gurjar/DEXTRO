const path = require('path')
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: {
        popup:path.resolve('./src/assets/popup.tsx'),
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.tsx?$/,
                exclude: /node_modules/,
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css?$/,
            }
        ]
    },
    "plugins": [
        new CopyPlugin({
            patterns: [
            {
                from: path.resolve('src/static/manifest.json'),
                to: path.resolve('dist')
            },
            {
                from: path.resolve('src//static/images'),
                to: path.resolve('dist')
            },
            {
                from: path.resolve('src/assets/popup.css'),
                to: path.resolve('dist')
            }
        ]
        }),
        new HtmlPlugin({
            title:'React Chrome-ext Boilerplate',
            filename: 'popup.html',
            chunks: ['popup']
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    output: {
        filename: '[name].js',
    }
}
