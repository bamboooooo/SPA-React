const webpack = require('webpack')
const HtmlWebpackPlugin=require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
module.exports = {
    entry: {
        main: path.join(__dirname, 'src/index'),
        vendor: ['react', 'react-dom', 'react-router', 'antd']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename:  'js/[name].[hash].js',
        chunkFilename: 'js/[name].chunk.js'
    },
    devServer: {
        hot: true,
        port: 8088,
        inline: true,
        open: true,
        progress: true
    },
    module: {
           rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude:path.resolve(__dirname, "node_modules"),
                include: path.resolve(__dirname, "src"),
                options:{
                    cacheDirectory: true
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'asset/media/[name].[hash:8].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2|pdf|swf|xap)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
             {
		        test: /\.css$/,
		        use: ExtractTextPlugin.extract({
		          fallback: "style-loader",
		          use:["css-loader"]
		        })
		     }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
}
if (process.env.NODE_ENV !== 'production') {
    module.exports = {
        devtool: 'source-map',
        entry: {
            main: path.join(__dirname, 'src/index'),
            vendor: ['react', 'react-dom', 'react-router', 'antd']
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename:  'js/[name].[hash].js',
            chunkFilename: 'js/[name].chunk.js'
        },
        devServer: {
            hot: true,
            port: 8088,
            inline: true,
            open: true,
            progress: true
        },
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    loader: 'babel-loader',
                    exclude:path.resolve(__dirname, "node_modules"),
                    include: path.resolve(__dirname, "src"),
                    options:{
                        cacheDirectory: true
                    }

                },
                {
                    test: /\.(jpe?g|png|gif|svg|ico)/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                name: 'asset/media/[name].[hash:8].[ext]',
                            }
                        }
                    ]
                },
                {
                    test: /\.(ttf|eot|svg|woff|woff2|pdf|swf|xap)/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {}
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin()
        ]
    }
}else {

    module.exports.plugins = [
        new HtmlWebpackPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity
        }),
        new ExtractTextPlugin("css/[name].[hash].css")
    ]

}
