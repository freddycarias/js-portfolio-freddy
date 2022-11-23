const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
// const { utils } = require('stylus');
const Dotenv = require("dotenv-webpack");


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext]',
    },
    mode: "development",
    resolve: {
        extensions: ['.js'],
        alias: {
            "@utils": path.resolve(__dirname,"src/utils/"),
            "@templates": path.resolve(__dirname,"src/templates/"),
            "@styles": path.resolve(__dirname,"src/styles/"),
            "@images": path.resolve(__dirname,"src/assets/images/")

        }
    },
    module: {
        rules: [
            {
                // Test declara que extensión de archivos aplicara el loader
                test: /\.js$/,
                // Use es un arreglo u objeto donde dices que loader aplicaras
                use: {
                loader: "babel-loader"
                },
                // Exclude permite omitir archivos o carpetas especificas
                exclude: /node_modules/
            },
            {
                test:/\.css|.styl$/i,
                use:
                [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            { 
                test: /\.(woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                        filename: 'assets/fonts/[hash][ext][query]',
                    },
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            inject:true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "assets/[name][contenthash].css"
        }),
        new CopyPlugin({
            patterns:[
                {
                from: path.resolve(__dirname,"src","assets/images")
                ,to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
    ],
    optimization: {
        minimize: true
    }
}