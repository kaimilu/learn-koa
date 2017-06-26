global.Promise = require('bluebird') // 引用蓝鸟异步机制

const log = require('./utils/log')
const Koa = require('koa')
const koaRouter = require('koa-router')
const mongoRest = require('./mongoRest')
const models = require('./model/mongo')
const redis = require('./model/redis')
const config = require('./conf/config')

const configName = process.env.NODE_ENV === '"development"' ? 'dev' : 'prod' // 引用对应的配制文件
const blogpackConfig = require(`./build/blogpack.${configName}.config`)
blogpackConfig.models = models
blogpackConfig.redis = redis
const Blogpack = require('./blogpack')
const laosu = global.laosu = new Blogpack(blogpackConfig)


const app = new Koa()
const router = koaRouter()

module.exports = (async() => {
  try {
    await laosu.beforeUseRoutes({
      config: laosu.config,
      app,
      router,
      models,
      redis
    })

    const beforeRestfulRoutes = laosu.getBeforeRestfulRoutes()
    const afterRestfulRoutes = laosu.getafterRestfulRoutes()

    const middlewareRoutes = await laosu.getMiddlewareRoutes()

    for (const item of middlewareRoutes) {
      const middlewares = [...item.middleware]
      // unshift() 方法可向数组的开头添加一个或更多元素,并返回新的长度
      item.needBeforeRoutes && middlewares.unshift(...beforeRestfulRoutes)
      item.needAfterRoutes && middlewares.push(...afterRestfulRoutes)
      /**
       * 路由
       * 类型与'./mongoRest/routes
       * router.get(path,...beforeRestfulRoutes,item.middleware,...afterRestfulRoutes)
       */
      router[item.method](item.path, ...middlewares)
    }

    Object.keys(models).map(name => models[name]).forEach(model => {
      mongoRest(router, model, '/api', {
        beforeRestfulRoutes,
        afterRestfulRoutes
      })
    })


    app.use(router.routes())

    const beforeServerStartArr = laosu.getBeforeServerStartFuncs()
    for (const middleware of beforeServerStartArr) {
      await middleware()
    }

    app.listen(config.serverPort, () => {
      log.info(`Koa2 is running at ${config.serverPort}`)
    })

  } catch (err) {
    log.error(err)
  }
})()