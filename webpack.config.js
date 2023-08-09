const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./client/index.html", 
  filename: "./index.html"
});

module.exports = {
  entry: "./client/index.js",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "bundle.js"
  },
  devtool: 'eval-source-map',
  plugins: [htmlPlugin],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        }
      },
      {
        test: /.(css|scss)$/,
        include: path.resolve(__dirname, "./client"),
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
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  },
  mode: 'development',
  devServer: {
    host: 'localhost',
    port: 8080,
    // match the output path
    static: {
      directory: path.join(__dirname, './client'),
      publicPath: "/",
    },
    // enable HMR on the devServer
    hot: true,
    // fallback to root for other urls
    historyApiFallback: true,
    proxy: {
        "/api": {
          target: "http://localhost:3000", //redirects requests to 3000 from 8080 if in dev
          pathRewrite: { "^/api": "" }, //do not call localhost:3000 directly, so make all fetch reqs to /api first
          changeOrigin: true,
        },
      },
    },
};