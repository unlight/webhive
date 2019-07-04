const path = require('path');

module.exports = async (options = {}) => ({
    entry: {
        'app': `${__dirname}/app.component/src/main.ts`,
        'header': `${__dirname}/header.component/src/header.component.ts`,
        'nav': `${__dirname}/nav.component/src/nav.component.ts`,
        'entry-list': `${__dirname}/entry-list.component/src/entry-list.component.tsx`,
    },
    output: {
        path: `${__dirname}/dist`,
        chunkFilename: `[name]${options.prod ? '-[hash:6]' : ''}.js`,
        filename: `[name]${options.prod ? '-[hash:6]' : ''}.js`,
    },
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                include: path.join(__dirname, 'node_modules'),
                test: /\.(js|css)$/,
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
                        test: /[^\.\-]style\.css$/i,
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
        contentBase: [`${__dirname}/dist`],
        historyApiFallback: false,
    },
    plugins: [
        (() => {
            const HtmlWebpackPlugin = require('html-webpack-plugin');
            return new HtmlWebpackPlugin({
                template: `${__dirname}/app.component/src/index.html`,
                filename: 'index.html',
                inject: true,
                chunks: ['app'],
                config: { ...options },
            });
        })(),
    ]
});
