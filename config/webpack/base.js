const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// https://blog.csdn.net/smallsfe/article/details/54917185
// https://github.com/miaomiaozhou/vue2-cli
module.exports = {
    entry: {
        app: path.resolve(__dirname, '../../src/web/entry/app.ts'),
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx', '.vue', '.json'],
        alias: {
            // this isn't technically needed, since the default `vue` entry for bundlers
            // is a simple `export * from '@vue/runtime-dom`. However having this
            // extra re-export somehow causes webpack to always invalidate the module
            // on the first HMR update and causes the page to reload.
            'vue': '@vue/runtime-dom',
            '@': path.resolve(__dirname, '../../src/web')
        }
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true
                        }
                    },
                    'css-loader',
                    'less-loader'

                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            }
            
        ]
    }, 
    plugins: [
        new VueLoaderPlugin(),
        // copy custom static assets
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, '../../src/web/assets/icons/*'),
                // to: 'icons/[name].[contenthash].[ext]',
                to: 'icons/[name].[ext]',
            },{
                from: path.resolve(__dirname, '../../src/web/assets/lib/*'),
                to: 'lib/[name].[ext]',
            }],
            options: {
                concurrency: 100,
            },
        })
    ],
}
