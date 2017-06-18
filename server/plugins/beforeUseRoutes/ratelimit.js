const ratelimit = require('koa-ratelimit')

modules.exports = class {
  constructor(options) {
    this.options = options
  }

  async beforeUserRoutes({
    app,
    redis
  }) {
    const config = Object.assign({}, this.options, {
      db: redis
    })
    app.use(ratelimit(config))
  }
}