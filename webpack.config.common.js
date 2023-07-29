const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: {
        popup:path.resolve('./src/popup.tsx'),
        options:path.resolve('./src/options.tsx'),
        background:path.resolve('./src/scripts/background.ts'),
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.tsx?$/,
                exclude: /node_modules/,
            },
            {
                use: ['style-loader', 'css-loader',
                        {
                            loader: 'postcss-loader',
                            options:{
                                postcssOptions: {
                                    idents:'postcss',
                                    plugins: [tailwindcss, autoprefixer],
                                },
                            }
                        }
                     ],
                test: /\.css?$/,
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
                from: path.resolve('src/assets/tailwind.css'),
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