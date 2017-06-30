/**
 * 返回一个匿名函数，
 * @prama router 路由
 * @prama modeName 模型
 * @prama actions 行为
 * @prama prefix  路径别名
 * @prama {}  中间件： 执行行为动作的前后路由插件
 * 
 * return 给对应的模型返回相应的请求事件
 */
module.exports = (router, modelName, actions, prefix, {
  beforeRestfulRoutes,
  afterRestfulRoutes
}) => {
  const modelUrl = `${prefix}/${modelName}`
  const itemUrl = `${prefix}/${modelName}/:id`


  router.get(modelUrl, ...beforeRestfulRoutes, actions.findAll, ...afterRestfulRoutes)
  router.get(itemUrl, ...beforeRestfulRoutes, actions.findById, ...afterRestfulRoutes)
  router.post(modelUrl, ...beforeRestfulRoutes, actions.create, ...afterRestfulRoutes)
  router.post(itemUrl, ...beforeRestfulRoutes, actions.updateById, ...afterRestfulRoutes)
  router.del(itemUrl, ...beforeRestfulRoutes, actions.deleteById, ...afterRestfulRoutes)
  router.put(modelUrl, ...beforeRestfulRoutes, actions.create, ...afterRestfulRoutes)
  router.put(itemUrl, ...beforeRestfulRoutes, actions.replaceById, ...afterRestfulRoutes)
  router.patch(itemUrl, ...beforeRestfulRoutes, actions.updateById, ...afterRestfulRoutes)
}