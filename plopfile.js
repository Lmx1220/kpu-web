const fs = require('node:fs')

module.exports = function (plop) {
  plop.setWelcomeMessage('请选择需要创建的模式：')
  fs.readdirSync('./plop-templates').forEach((item) => {
    if (item === '.DS_Store') {
      return
    }
    plop.setGenerator(item, require(`./plop-templates/${item}/prompt`))
  })
}
