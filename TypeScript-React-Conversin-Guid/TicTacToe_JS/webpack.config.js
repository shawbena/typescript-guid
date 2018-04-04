let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    devtool: 'source-map',
    devServer: {
        contentBase: './'
    },
    entry: {
        app: './src/app.jsx'
    },
    output: {
        filename: './dist/[name].bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {loader: 'babel-loader'}
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },{
                enforce: 'pre',
                test: /\.jsx?$/,
                loader: 'source-map-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'TicTacToe_JS',
            filename: './index.html',
            template: './src/index.ejs'
        })
    ]
};