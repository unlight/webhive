const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = async (options) => ({
    entry: {
        app: `${__dirname}/app/main.ts`,
        // about: `${__dirname}/page.about/page.about.ts`,
    },
    output: {
        path: `${__dirname}/dist`,
        filename: '[name].js',
    },
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                use: 'source-map-loader',
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: { transpileOnly: true },
                }
            },
            {
                test: /\.html$/,
                use: [
                    { loader: 'html-loader', options: { minimize: false } },
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    devServer: {
        contentBase: `${__dirname}/dist`,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${__dirname}/app/index.html`,
            filename: 'index.html',
        }),
    ]
});
