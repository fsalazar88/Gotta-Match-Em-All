const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        src: '/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Development',
        template: '/index.html'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?/,  //this is slightly differenet in video: /.js$/
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.s?css/,
                //exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },


        ///////////////////////////////NEW STUFF AFTER COMPLETING FRONTEND

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    devServer: {
        static: {
          publicPath: '/build',
          directory: path.resolve(__dirname, 'build')
        },
        //compress: true,
        //port: 8080,
        proxy: {
            '/api': 'http://localhost:3000'
        }

        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:3000',
        //         pathRewrite: {'^/api': ''}
        //     }
        // }
      },
}