const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
// const { utils } = require('stylus');
const Dotenv = require("dotenv-webpack");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext]',
    },
    mode: "development",
    devtool: "source-map" ,
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
        new BundleAnalyzerPlugin(),
    ],
    devServer: {
        static: 
        {
            directory: path.join(__dirname, "dist"),
            watch: true,
        },
        watchFiles: path.join(__dirname, "./**"), //observa los cambios en todos nuestros archivos y actualiza el navegador
        compress: true,
        historyApiFallback: true,
        port: 3006,
        open: true, //Hace que se abra en el navegador
	}
}