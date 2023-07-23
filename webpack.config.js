const path = require('path')
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: {
        index: [path.resolve('./src/static/index.tsx'),path.resolve('./src/static/index.css')]
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
                from: path.resolve('src/images'),
                to: path.resolve('dist')
            },
            {
                from: path.resolve('src/static/index.css'),
                to: path.resolve('dist')
            }
        ]
        }),
        new HtmlPlugin({
            title:'React Chrome-ext Boilerplate',
            filename: 'index.html',
            chunks: ['index']
        })
    ],
    resolve: {
        extensions: ['.tsx', '.js', '.ts']
    },
    output: {
        filename: '[name].js',
    }
}
