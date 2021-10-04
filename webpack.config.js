const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path')

const plugins = [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/templates/index.html'
    }),
    new HtmlWebpackPlugin({
        filename: 'contact.html',
        template: './src/templates/contact.html'
    }),
    new HtmlWebpackPlugin({
        filename: 'blogs.html',
        template: './src/templates/blogs.html'
    }),
    new HtmlWebpackPlugin({
        filename: 'about.html',
        template: './src/templates/about.html'
    }),
    new HtmlWebpackPlugin({
        filename: 'projects.html',
        template: './src/templates/projects.html'
    }),
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin({
        patterns: [
            {
                from: path.resolve(__dirname, "src", "img"),
                to: 'assets'
            }
        ]
    })
];

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: "js/bundle.js"
    },
    devServer: {
        static: path.join(__dirname, 'public'),
        compress: true,
        port: 9000,
     },
    mode: "development",
    watch: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    "css-loader",
                ],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    // Disables attributes processing
                    sources: false,
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                //test: /\.(png|jpg|gif)$/i,
                //type: 'asset'
            }
        ]
    },
    plugins
};
