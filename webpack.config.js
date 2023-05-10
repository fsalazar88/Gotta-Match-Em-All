const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './index.js'
    ,
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Development',
        template: './index.html'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env", "@babel/preset-react"],
                },
              },
              {
                test: /.(css|scss)$/,
                include: path.resolve(__dirname, "components"),
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", "sass-loader"],
              },
              {
                test: /\.(png|jpe?g|gif)$/i, //image loader for logo
                use: [
                  {
                    loader: "file-loader",
                  },
                ],
              },
        ]
    },
    devServer: {
        static: {
          directory: path.join(__dirname, "dist"),
        },
        compress: true,
        port: 8080,
        proxy: {
          "/api": {
            target: "http://localhost:3000", //redirects requests to 3000 from 8080 if in dev
            pathRewrite: { "^/api": "" }, //do not call localhost:3000 directly, so make all fetch reqs to /api first
            changeOrigin: true,
          },
        },
        hot: true,
        open: true,
        historyApiFallback: true,
        // devtool: 'eval-source-map'
      },


        ///////////////////////////////NEW STUFF AFTER COMPLETING FRONTEND


    // devServer: {
    //     static: {
    //       publicPath: '/build',
    //       directory: path.resolve(__dirname, 'build')
    //     },
    //     compress: true,
    //     port: 8080,
    //     proxy: {
    //         '/api': 'http://localhost:3000'
    //     }

    //     // proxy: {
    //     //     '/api': {
    //     //         target: 'http://localhost:3000',
    //     //         pathRewrite: {'^/api': ''}
    //     //     }
    //     // }
    //   },
}