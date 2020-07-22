const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const tsImportPluginFactory = require('ts-import-plugin')
const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'

const materialUiPlugin = tsImportPluginFactory({
  libraryName: '@material-ui/core',
  libraryDirectory: '',
  camel2DashComponentName: false
})

const lodashPlugin = tsImportPluginFactory({
  style: false,
  libraryName: 'lodash',
  libraryDirectory: null,
  camel2DashComponentName: false
})

module.exports = {
  entry: './src/index.tsx',
  output: {
    publicUrl: process.env.POI_APP_PUBLIC_URL
  },
  plugins: [
    {
      resolve: '@poi/plugin-typescript',
      options: {
        babel: false,
        loaderOptions: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [lodashPlugin, materialUiPlugin]
          }),
          compilerOptions: {
            module: 'es2015'
          },
          happyPackMode: true
        },
        tscheckerOptions: {
          vue: false,
          checkSyntacticErrors: true
        }
      }
    },
    {
      resolve: '@poi/bundle-report',
      options: {}
    }
  ],
  babel: {
    configFile: false,
    babelrc: false
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.worker\.js$/,
          use: { loader: 'worker-loader' }
        }
      ]
    },
    plugins: isDevelopment
      ? [new AntdDayjsWebpackPlugin(), new ReactRefreshWebpackPlugin()]
      : [new AntdDayjsWebpackPlugin()]
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization'
    },
    port: 9000
  }
}
