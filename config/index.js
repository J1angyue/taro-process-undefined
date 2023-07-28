import ComponentsPlugin from 'unplugin-vue-components/webpack'
import AutoImportPlugin from 'unplugin-auto-import/webpack'
import NutUIResolver from '@nutui/nutui-taro/dist/resolver'
import path from 'path'

function resolve() {
  return path.resolve(__dirname, '..', ...arguments)
}

const config = {
  projectName: '转贷系统小程序',
  date: '2023-7-27',
  designWidth (input) {
    // 配置 NutUI 375 尺寸
    if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
      return 375
    }
    // 全局使用 Taro 默认的 750 尺寸
    return 750
  },
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  alias: {
    '@/a': resolve('src/api'),
    '@/c': resolve('src/components'),
    '@/u': resolve('src/utils'),
    '@/s': resolve('src/stores'),
    '@/p': resolve('src/pages'),
    '@/i': resolve('src/images'),
    '@/h': resolve('src/hooks'),
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['@tarojs/plugin-html'],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'vue3',
  compiler: 'webpack5',
  cache: {
    enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  sass: {
    data: `@import "@nutui/nutui-taro/dist/styles/variables-jdt.scss";`
  },
  mini: {
    webpackChain (chain) {
      chain.merge({
        module: {
          rule: {
            mjsScript: {
              test: /\.mjs$/,
              include: [/pinia/],
              use: {
                babelLoader: {
                  loader: require.resolve('babel-loader')
                }
              }
            }
          }
        }
      })

      chain.plugin('unplugin-vue-components').use(ComponentsPlugin({
        resolvers: [NutUIResolver({taro: true})]
      }))

      chain.plugin('unplugin-auto-import').use(AutoImportPlugin({
        imports: [
          'vue',
          {
            // '@tarojs/taro': [
            //   'showToast', 'hideToast', 'request'
            // ],
            '@/u/request': ['request'],
            '@/u/toast': ['toast'],
            '@/s/user': ['useUserStore']
          }
        ],
      }))
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    // webpackChain(chain) {
    //   chain.plugin('unplugin-vue-components').use(ComponentsPlugin({
    //     resolvers: [NutUIResolver({taro: true})]
    //   }))
    // }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
