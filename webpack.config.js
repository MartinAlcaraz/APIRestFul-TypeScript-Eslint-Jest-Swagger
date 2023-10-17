const path = require('path')
const nodeExtrenals = require('webpack-node-externals')
const CopyFiles = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        index: './index.ts'
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new CopyFiles({
            patterns: [
                { from: './public', to: './public' } // copia la carpeta public en la carpeta dist
            ]
        })
    ],

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    externals: [nodeExtrenals()]
}
