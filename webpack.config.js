const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var AssetsPlugin = require("assets-webpack-plugin");
var assetsPluginInstance = new AssetsPlugin();
var LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
var BrowserSyncPlugin = require("browser-sync-webpack-plugin");

var _ = require("lodash");

module.exports = {
  entry: {
    vendor: ["jquery"],
    account: "./assets/js/account.js"
  },
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: path.basename(__dirname) + "/dist/",
    filename: "[name].js",
    pathinfo: process.env.NODE_ENV === "development"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true, importLoaders: 1 }
          },
          { loader: "sass-loader", options: { sourceMap: true } }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      },
      {
        test: /\.svg/,
        use: {
          loader: "svg-url-loader",
          options: {}
        }
      }
    ]
  },

  resolve: {
    extensions: [".js"],
    alias: {
      jquery: "jquery/src/jquery"
    }
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      // <-- key to reducing React's size
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      },
     
    }),
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: "localhost",
      port: 3000,
      server: { baseDir: ['./'] }
    }),
  
    

    new MiniCssExtractPlugin({ filename: "[name].css" }),

    // new UglifyJSPlugin(),
    new AssetsPlugin({
      fullPath: false,
      prettyPrint: true,
      processOutput: function(assets) {
       /* const addbject = _.pick(assets, "critical");
        const removebject = _.omit(assets, "critical");
        const newObject = Object.assign(addbject, removebject);*/
        const add1Object = _.pick(assets, "vendor");
        const remove1Object = _.omit(assets, "vendor");
        const new1Object = Object.assign(add1Object, remove1Object);

        return JSON.stringify(new1Object);
      }
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require("cssnano"),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    }),
   
  ],
  devtool: process.env.NODE_ENV === "development" ? "eval" : "source-map"
};
