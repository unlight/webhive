const path = require('path');
const buildPath = path.join(__dirname, 'dist');
const context = __dirname;
const title = 'Web Hive';

const defaultOptions = {
    libs: false,
    style: false,
    test: false,
    coverage: false,
    prod: process.argv.includes('--env.mode=production'),
    nomin: false,
    debug: false,
    get dev() {
        return !this.prod;
    },
    get minimize() {
        return !this.nomin;
    },
    get devtool() {
        return ('webpack_devtool' in process.env) ? process.env.webpack_devtool : 'cheap-source-map';
    },
    get sourceMap() {
        const devtool = this.devtool;
        return (!devtool || devtool === '0') ? false : true;
    },
    get mode() {
        return this.prod ? 'production' : 'development';
    }
};

module.exports = (options = {}) => {
    options = { ...defaultOptions, ...options };
    for (const [key, value] of Object.entries(options)) process.stdout.write(`${key}:${value} `);
    let config = {
        entry: {
            'app': `${__dirname}/app.component/src/main`,
            'header': `${__dirname}/header.component/src/header.component`,
            'nav': `${__dirname}/nav.component/src/nav.component`,
            'entry-list': `${__dirname}/entry-list.component/src/entry-list.component`,
            'search-page': `${__dirname}/search.page`,
        },
        output: {
            path: `${__dirname}/dist`,
            chunkFilename: `[name].js`,
            filename: `[name].js`,
        },
        mode: options.mode,
        devtool: (() => {
            if (options.test) return 'inline-source-map';
            if (options.prod) return 'source-map';
            return options.devtool;
        })(),
        resolve: {
            extensions: ['.js', '.ts', '.tsx', '.json'],
            modules: [
                `${__dirname}/app_modules`,
                'node_modules',
            ],
        },
        devServer: {
            contentBase: [buildPath],
            historyApiFallback: false,
            proxy: {
                '/api': {
                    target: 'http://webhive.herokuapp.com',
                    changeOrigin: true,
                    logLevel: 'info',
                }
            },
        },
        module: {
            rules: [
                { parser: { amd: false } },
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
                            test: /style\.css$/i,
                            use: [
                                { loader: 'style-loader/url', options: { hmr: false } },
                                { loader: 'file-loader', options: { name: `[name]${options.prod ? '-[hash:6]' : ''}.[ext]` } },
                            ],
                        },
                        {
                            test: /\.link\.css$/i,
                            use: [
                                {
                                    loader: 'file-loader',
                                    options: { name: `[name]${options.prod ? '-[hash:6]' : ''}.[ext]` },
                                },
                                'extract-loader',
                                'css-loader',
                            ],
                        },
                        { use: 'css-loader' },
                    ],
                },
            ]
        },
        plugins: [
            ...(() => {
                const HtmlWebpackPlugin = require('html-webpack-plugin');
                const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
                return [
                    new HtmlWebpackPlugin({
                        template: `${__dirname}/app.component/src/index.xhtml`,
                        filename: 'index.html',
                        inject: 'head',
                        chunks: ['app'],
                        config: { ...options },
                        xhtml: true,
                        title,
                    }),
                    new ScriptExtHtmlWebpackPlugin({
                        defaultAttribute: 'defer',
                    }),
                ]
            })(),
        ],
        optimization: {
            minimizer: [
                (options.minimize ? () => {
                    const TerserPlugin = require('terser-webpack-plugin');
                    return new TerserPlugin({
                        terserOptions: {
                            output: {
                                comments: false,
                            },
                        },
                    });
                } : () => undefined)(),
            ].filter(Boolean),
        },
    };

    return config;
}

