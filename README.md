# ts-react

타입스크립트 리액트

### 1. package.json 생성 & react, react-dom 설치

- [x] _yarn init -y_
- [x] _yarn add react react-dom_
- [x] _yarn add @types/react @types/react-dom -D_

### 2. src/ index.tsx, App.tsx & public/ index.html 연결

### 3. typescript 설치 & tsconfig.json 작성

- [x] _yarn add typescript_

```
{
  "compilerOptions": {
    "target": "ES5",
    "module": "Commonjs",
    "allowJs": true,
    "sourceMap": true,
    "jsx": "react",
    "outDir": "./build",
    "lib": ["DOM","ES2015","ES2020"],

    "strict": true,

    "esModuleInterop": true,
    "moduleResolution": "node",

    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "exclude": ["node_modules"],
  "include": ["./src/**/*"]
}
```

### 4. babel & webpack 설정

- [x] _yarn add babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript -D_
- [x] _yarn add webpack webpack-cli webpack-dev-server html-webpack-plugin ts-loader -D_
- [x] babel.config.js 작성

```
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
};
```

- [x] webpack.config.js 작성

```
const path = require('path');
const webpack = require('webpack');

const appIndex = path.resolve(__dirname, 'src', 'index.tsx');
const appHtml = path.resolve(__dirname, 'public', 'index.html');
const appBuild = path.resolve(__dirname, 'build');
const appPublic = path.resolve(__dirname, 'public');

const HtmlWebpackPlugin = require('html-webpack-plugin');

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

```

### 5. package.json script 명령어 작성

```
"scripts": {
    "dev": "webpack-dev-server --config ./webpack.config.js --mode development --open --hot",
    "build": "webpack --mode production",
    "prestart": "npm build",
    "start": "webpack --mode development"
  }
```
