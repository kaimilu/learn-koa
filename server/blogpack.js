/**
 * 全局的博客类
 * 
 * @class blogpack
 */
class blogpack {
  // 构造函数
  constructor(option) {
    this.config = option.config || {}
    this.plugins = option.plugins || {}
    this.models = option.models
    this.redis = option.redis
  }

  /**
   * 循环所有plugins(中间件) 并调用其beforeUserRoutes方法
   * 
   * @param {any} args 扩展参数
   * @memberof blogpack
   */
  async beforeUseRoutes(...args) {
    for (const plugin of this.plugins) {
      plugin.beforeUseRoutes && await plugin.beforeUseRoutes(...args)
    }
  }

  /**
   *  filter() map() 方法介绍：
   *  http://www.cnblogs.com/xiao-hong/p/3194027.html
   */
  async getMiddlewareRoutes(...args) {
    /**
     * 对plugins对象中的每个元素都执行一次plugin函数，其返回plugin['mountingRoute']
     */
    const plugins = this.plugins.filter(plugin => plugin['mountingRoute'])
    const result = []

    // 循环上面过滤后台的对象数组
    for (const plugin of plugins) {
      // 异步调用plugin.mountingRoute 方法
      const routeObj = await plugin.mountingRoute()
      // 将对象组合插入到result 数组中
      result.push(Object.assign({}, routeObj, {
        needBeforeRoutes: routeObj.needBeforeRoutes || false,
        needAfterRoutes: routeObj.needAfterRoutes || false
      }))
    }
    return result
  }

  /**
   * filter 过滤后 map 执行
   * 
   */
  getBeforeRestfulRoutes() {
    return this.plugins
      .filter(plugin => plugin['beforeRestful'])
      .map(plugin => plugin['beforeRestful'])
  }

  getAfterRestfulRoutes() {
    return this.plugins
      .filter(plugin => plugin['afterRestful'])
      .map(plugin => plugin['afterRestful'])
  }

  getBeforeServerStartFuncs() {
    return this.plugins
      .filter(plugin => plugin['beforeServerStart'])
      .map(plugin => plugin['beforeServerStart'])
  }
}

module.exports = blogpack