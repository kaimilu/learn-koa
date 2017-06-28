/**
 * https://elemefe.github.io/restc/intro/
 * restc 是一个 HTTP 服务器中间件
 */
const restc = require('restc')

module.exports = class {
  async beforeUseRoutes({
    app
  }) {
    app.use(restc.koa2())
  }
}