const path = require('path')
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: {
        popup: path.resolve('./src/static/index.tsx')
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.tsx?$/,
                exclude: /node_modules/,
            },
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
