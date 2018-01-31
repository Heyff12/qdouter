// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

const isOnline = process.argv[2] === 'production'
// console.log('process');
// console.log(process);
// console.log('process.argv');
// console.log(process.argv);
// console.log('process.argv[2]');
// console.log(process.argv[2]);

// 在这定义七牛云的地址
const qiNiuAssets = '//s.qfpay.com.cn/fe_qudao_portal/'

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    // assetsSubDirectory: '',
    // assetsPublicPath: '/qudao/v1/static/',
    assetsSubDirectory: 'static',
    assetsPublicPath: isOnline ? qiNiuAssets : '/qudao/v1/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8087,
    ip: '192.168.0.161',//本机ip
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/qudao/v1/api/**':{
            target:'http://192.168.0.7:8002'
        },
        // '/qudao/v1/api/**':{
        //     target:'http://192.168.0.7:17202'
        // },
        '/qudao/adv/**':{
            target:'http://192.168.0.7:8184'
        }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
