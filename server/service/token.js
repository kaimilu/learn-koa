const jwt = require('jsonwebtoken')
const config = require('../conf/config')

let secret = config.tokenSecret // 密钥
let expiresIn = config.tokenExpiresIn // 过期时间

module.exports = {
  // 创建token
  createToken(userinfo) {
    let token = jwt.sign(userinfo, secret, {
      expiresIn
    })
    return token
  },

  // 校验 token
  verifyToken(token) {
    if (!token) {
      return false
    }

    try {
      let result = jwt.verify(token, secret)
      return result
    } catch (error) {
      return false
    }
  },

  // 失效时间 expiresIn: expiresIn (es6)
  expiresIn

}