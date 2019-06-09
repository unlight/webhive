const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = async (options = {}) => ({
    entry: {
        app: `${__dirname}/app/main.ts`,
        header: `${__dirname}/header.component/header.component.ts`,
        nav: `${__dirname}/nav.component/nav.component.ts`,
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
            {
                test: /\.css$/i,
                oneOf: [
                    {
                        test: /style\.css$/i,
                        use: [
                            { loader: 'style-loader/url', options: { hmr: false } },
                            { loader: 'file-loader', options: { name: `[name]${options.prod ? '-[hash:6]' : ''}.[ext]` } },
                        ],
                    },
                    { use: 'css-loader' },
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json'],
    },
    devServer: {
        contentBase: `${__dirname}/dist`,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${__dirname}/app/index.html`,
            filename: 'index.html',
            inject: false,
        }),
    ]
});
