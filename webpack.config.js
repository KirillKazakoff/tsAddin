const devCerts = require('office-addin-dev-certs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const urlDev = 'https://localhost:3000/';
const urlProd = 'https://kirillkazakoff.github.io/tsAddin/'; // CHANGE THIS TO YOUR PRODUCTION DEPLOYMENT LOCATION

async function getHttpsOptions() {
    const httpsOptions = await devCerts.getHttpsServerOptions();
    return { ca: httpsOptions.ca, key: httpsOptions.key, cert: httpsOptions.cert };
}

async function getHttpsOptions() {
    const httpsOptions = await devCerts.getHttpsServerOptions();
    return { ca: httpsOptions.ca, key: httpsOptions.key, cert: httpsOptions.cert };
}

module.exports = async (env, options) => {
    const dev = options.mode === 'development';
    const config = {
        devtool: 'source-map',
        entry: {
            polyfill: ["core-js/stable", "regenerator-runtime/runtime"],
            index: ['./src/index.tsx', './src/index.html'],
            commands: './src/app/commands/commands.ts',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.html', '.js'],
        },
        module: {
            rules: [
                { test: /\.xlsx$/, loader: 'webpack-xlsx-loader' },
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-typescript'],
                        },
                    },
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: ['ts-loader'],
                },
                {
                    test: /\.html$/,
                    exclude: /node_modules/,
                    use: 'html-loader',
                },
                {
                    test: /\.(png|jpg|jpeg|gif|ico)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/[name][ext][query]',
                    },
                },
            ],
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    { from: 'assets', to: 'assets' },
                    { from: 'templates', to: 'templates' },
                    {
                        from: 'manifest*.xml',
                        to: '[name]' + '[ext]',
                        transform(content) {
                            if (dev) {
                                return content;
                            } else {
                                return content
                                    .toString()
                                    .replace(new RegExp(urlDev, 'g'), urlProd);
                            }
                        },
                    },
                ],
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/index.html',
                chunks: ['index', 'polyfill'],
            }),
            new HtmlWebpackPlugin({
                filename: 'commands.html',
                template: './src/app/commands/commands.html',
                chunks: ['commands'],
            }),
        ],
        devtool: 'inline-source-map',
        devServer: {
            historyApiFallback: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            server: {
                type: "https",
                options: env.WEBPACK_BUILD || options.https !== undefined ? options.https : await getHttpsOptions(),
            },
            // port: process.env.npm_package_config_dev_server_port || 3000,
            compress: true,
            port: 3000,
        },
        output: {
            path: '/',
        }
    };

    return config;
};
