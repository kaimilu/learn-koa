global.Promise = require('bluebird') // 引用蓝鸟异步机制

const log = require('./utils/log')
const Koa = require('koa')
const koaRouter = require('koa-router')
const config = require('./conf/config')

const configName = process.env.NODE_ENV === '"development"' ? 'dev' : 'prod' // 引用对应的配制文件
const blogpackConfig = require(`./build/blogpack.${configName}.config`)



const app = new Koa()
const router = koaRouter()

module.exports = (async() => {
  try {

    app.use(router.routes())

    app.listen(config.serverPort, () => {
      log.info(`Koa2 is running at ${config.serverPort}`)
    })

  } catch (err) {
    log.error(err)
  }
})()