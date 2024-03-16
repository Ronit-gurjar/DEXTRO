const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: {
        popup:path.resolve('./src/app/popup.tsx'),
        options:path.resolve('./src/app/options.tsx'),
        background:path.resolve('./src/app/scripts/background.ts'),
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.tsx?$/,
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },
    "plugins": [
        new CopyPlugin({
            patterns: [
            {
                from: path.resolve('src/static'),
                to: path.resolve('dist')
            },
            {
                from: path.resolve('src/assets'),
                to: path.resolve('dist')
            }
        ]
        }),
        ...getHtmlPlugins([
            'popup',
            'options',
        ])
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    output: {
        filename: '[name].js',
        assetModuleFilename: 'images/[hash][ext][query]'
    },
    optimization: {
        splitChunks:{
            chunks: 'all',
        }
    }
}

function getHtmlPlugins(chunks) {
    return chunks.map(chunk => new HtmlPlugin({
        title: 'React Chrome-ext Boilerplate',
        filename: `${chunk}.html`,
        chunks: [chunk]
    }))
}
