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

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
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

### 6. eslint 적용하기!

- [x] Eslint 설치 _yarn add eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser -D_

- [x] .eslintrc.js 생성 후 아래코드 추가

```
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": ["plugin:@typescript-eslint/recommended"]
}
```

- [x] package.json 에 스크립트 추가하였음. 그러나 auto fix 찾아보길...

```
"lint:fix": "eslint --fix './src/**/*.{ts,tsx,js,jsx}'"
```

- [x] eslint-config-airbnb로 설치하기 _yarn add install-peerdeps --dev eslint-config-airbnb_


- [x] 리액트, 리액트 훅, JSX element, import 에 해당하는 eslint 플러그인 설치 _yarn add eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-import -D_

### 7. prettier 적용하기!

- [x] prettier eslint plugin 설치 _yarn add prettier eslint-config-prettier eslint-plugin-prettier -D_

- [x] 취향에 맞게 .prettierrc 설정
```
{
  "singleQuote": true,
  "parser":"typescript",
  "semi": true,
  "useTabs": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

_.eslintrc.js_
```
module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'react-hooks'],
	extends: [
		'airbnb',
		'plugin:react/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	rules: {
		'prettier/prettier': 0,
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.ts', '.tsx', '.js', '.jsx'],
			},
		},
	},
};
```
