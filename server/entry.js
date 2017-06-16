/**
 * http://www.ruanyifeng.com/blog/2016/01/babel.html
 * 
 * babel-register模块改写require命令，为它加上一个钩子。
 * 此后，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用Babel进行转码
 */
require('babel-register')({
  plugins: ['transform-async-to-generator'], //异步转换babel插件
  ignore: function (filename) { // 忽略指filename 路径包括‘node_modules'的文件
    if (filename.includes('koa-ratelimit')) return false
    if (filename.includes('node_modules')) return true
    return false
  }
})

require('./app.js')