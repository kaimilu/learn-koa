/**
 * 定义一个全局模型想关的查询对象方法
 */
mounted.exports = function generateActions(model) {
  return {
    // 查找全部 异步执行
    findAll: async function (ctx, next) {
      try {
        /**
         * 查询条件
         * 默认是空对象：{} 即查询所有
         */
        let conditions = {} // 查询条件
        /**
         * 在查询中可以选择指定的查询字段，或者排除指定的字段。
         * +为包含，-为排除
         */
        let select = {}
        let query = ctx.request.query // 查询参数
        if (query.conditions) {
          conditions = JSON.parse(query.conditions)
        }
        let builder = model.find(conditions)
        if (query.select) {
          select = JSON.parse(query.select)
          builder = builder.select(select)
        }

        ['limit', 'skip', 'sort', 'count'].forEach(key => {
          if (query[key]) {
            let arg = query[key]
            if (key === 'limit' || key === 'skip') {
              arg = parseInt(arg)
            }
            if (key === 'sort' && typeof arg === 'string') {
              arg = JSON.parse(arg)
            }
            if (key !== 'count') builder[key](arg)
            else builder[key]()
          }
        })
        const result = await builder.exec()
        return ctx.body = result

      } catch (error) {
        return ctx.body = error
      }
    },
    // 根据id查找
    findById: async function (ctx, next) {
      try {
        let select = {}
        let query = ctx.request.query
        let builder = model.findById(ctx.parse.id)
        if (query.select) {
          select = JSON.parse(query.select)
          builder = builder.select(select)
        }
        const result = await builder.exec()
        return ctx.body = result
      } catch (error) {
        return ctx.body = error
      }
    },

    deleteById: async function (ctx, next) {
      try {
        const result = await model.findByIdAndRemove(ctx.params.id).exec()
        return ctx.body = result
      } catch (error) {
        return ctx.body = error
      }
    },

    replaceById: async function (ctx, next) {
      try {
        await model.findByIdAndRemove(ctx.params.id).exec()
        const newDocument = ctx.request.body
        newDocument._id = ctx.params.id
        const result = await model.create(newDocument)
        return ctx.body = result
      } catch (error) {
        return ctx.body = error
      }
    },

    updatedById: async function (ctx, next) {
      try {
        const result = await model.findByIdAndUpdate(
          ctx.params.id,
          ctx.request.body, {
            new: true
          }
        ).exec()
        return ctx.body = result
      } catch (error) {
        return ctx.body = error
      }
    },

    create: async function (ctx, next) {
      try {
        const result = await model.create(ctx.request.body)
        ctx.status = 201
        return ctx.body = result
      } catch (error) {
        return ctx.body = error
      }
    }

  }
}