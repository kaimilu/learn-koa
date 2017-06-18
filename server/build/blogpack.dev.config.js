/**
 * 开发环境配制
 */

const base = require('./blogpack.base.config')
const userRoutePrefix = '../plugins/beforeUseRoutes'
const serverStartPrefix = '../plugins/beforeServerStart'
const env = process.env
/**
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 * 方法用于将所有可枚举的属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
 */
const config = Object.assign({}, base)

const BodyParserPlugin = require(`${useRoutesPrefix}/bodyParser`)