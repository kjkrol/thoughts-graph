const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackCleanPlugin = require('webpack-clean')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry: {
        app: './src/app.tsx',
    },
    output: {
        filename: '[name].boundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    // Enable sourcemaps for debbuging webpack's output.
    devtool: "inline-source-map",
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new WebpackCleanPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Thoughts Graph',
            template: require('html-webpack-template'),
            appMountId: 'app'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extensions will be habdled by 'ts-loader'.
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader"},

            // All files with a '.css' extensions wille be served to the 'css-loader' and the 'style-loader'.
            {
                test: /\.css$/,
                use: [
                'style-loader',
                'css-loader'
                ]
            },

            // All image files with a '.png', '.svg', '.jpg' or '.gif' exstensions will be served to the 'file-loader'
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },

            // Loading fonts usgin 'file-loader'
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },

            // Loading csv data using 'csv-loader'
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            // Loading xmk data using 'xml-loader'
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    },
    resolve: {
        // Add '.ts and '.tsx' as resolvable extensions
        extensions: [".ts", ".tsx", ".js"]
    },

    // When importing a module whose path mathces one of the following, just
    // assume a corresponding global variable exosts and use that instead.
    // This is important because it allows us to avoid  bundling all of our
    // dependencies, which allows browser to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // }
};