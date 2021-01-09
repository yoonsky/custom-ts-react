const path = require('path');
const webpack = require('webpack');

const appIndex = path.resolve(__dirname, 'src', 'index.tsx');
const appHtml = path.resolve(__dirname, 'public', 'index.html');
const appBuild = path.resolve(__dirname, 'build');
const appPublic = path.resolve(__dirname, 'public');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

module.exports = (webpackEnv) => {
  const isDev = process.env.NODE_ENV === 'development';
  const isProd = process.env.NODE_ENV === 'production';

  return {
    mode: webpackEnv,
    devtool: isProd
      ? shouldUseSourceMap
        ? 'inline-source-map'
        : false
      : isDev && 'cheap-module-source-map',
    entry: appIndex,
    devServer: {
      historyApiFallback: true,
      contentBase: appPublic,
      inline: true,
      port: 3000,
      hot: true,
      overlay: true,
      stats: 'errors-only',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'ts-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    output: {
      path: appBuild,
      filename: isProd ? '[name].[contenthash].js' : '[name].bundle.js',
    },
    plugins: [
      new webpack.ProvidePlugin({
        React: 'react',
      }),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: appHtml,
      }),
    ],
  };
};
