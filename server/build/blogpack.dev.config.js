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
const LogTimePlugin = require(`${useRoutesPrefix}/logTime`)
const RestcPlugin = require(`${useRoutesPrefix}/restc`)

const InitOptionPlugin = require(`${serverStartPrefix}/initOption`)
const InstallThemePlugin = require(`${serverStartPrefix}/installTheme`)
const InitUserPlugin = require(`${serverStartPrefix}/initUser`)

const CheckAuthPlugin = require('../plugins/beforeRestful/checkAuth')

const QiniuUploadPlugin = require('../plugins/mountingRoute/qiniu')
const LoginPlugin = require('../plugins/mountingRoute/login')
const LogoutPlugin = require('../plugins/mountingRoute/logout')

config.plugins.push(
  // beforeUseRoutes
  new BodyParserPlugin(),
  new LogTimePlugin(),
  new RestcPlugin(),

  // beforeRestful
  new CheckAuthPlugin(),

  // moutingRoute
  new QiniuUploadPlugin({
    qiniuAccessKey: env.qiniuAccessKey || '',
    qiniuSecretKey: env.qiniuSecretKey || '',
    qiniuBucketHost: env.qiniuBucketHost || '',
    qiniuBucketName: env.qiniuBucketName || '',
    qiniuPipeline: env.qiniuPipeline || ''
  }),
  new LoginPlugin(),
  new LogoutPlugin(),

  // beforeServerStart
  new InitUserPlugin(),
  new InstallThemePlugin(),
  new InitOptionPlugin()
)

module.exports = config