module.exports = (api, opts) => {
  const oopsLines = `
import oops from 'vue-cli-plugin-oops'

Vue.use(oops, {
  release: '${opts.addRelease}',
  token: '${opts.token || 123456}'
})`

  api.onCreateComplete(() => {
    // inject to main.js
    const fs = require('fs')
    const ext = api.hasPlugin('typescript') ? 'ts' : 'js'
    const mainPath = api.resolve(`./src/main.${ext}`)

    // get content
    let contentMain = fs.readFileSync(mainPath, { encoding: 'utf-8' })
    let lines = contentMain.split(/\r?\n/g).reverse()

    // inject import
    const lastImportIndex = lines.findIndex(line => line.match(/^import/))
    lines[lastImportIndex] += oopsLines


    // modify app
    contentMain = lines.reverse().join('\n')
    fs.writeFileSync(mainPath, contentMain, { encoding: 'utf-8' })
  })
}
