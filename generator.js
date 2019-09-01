const { readFileSync, writeFileSync } = require('fs')

module.exports = (api, opts) => {
  const oopsLines = `
import oops from 'vue-cli-plugin-oops'

Vue.use(oops, {
  release: '${opts.addRelease}',
  token: '${opts.addToken}'
})`

  api.onCreateComplete(() => {
    // Inject to main.js
    const ext = api.hasPlugin('typescript') ? 'ts' : 'js'
    const mainPath = api.resolve(`./src/main.${ext}`)

    // Get content
    let contentMain = readFileSync(mainPath, { encoding: 'utf-8' })
    let lines = contentMain.split(/\r?\n/g).reverse()

    // Inject import
    const lastImportIndex = lines.findIndex(line => line.match(/^import/))
    lines[lastImportIndex] += oopsLines


    // Modify app
    contentMain = lines.reverse().join('\n')
    writeFileSync(mainPath, contentMain, { encoding: 'utf-8' })
  })
}
