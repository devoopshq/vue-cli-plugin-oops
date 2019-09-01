module.exports = (api, opts) => {
  api.extendPackage({
    dependencies: {
      'vue-oops': '^1.0.0-alpha'
    },
  });
  let release = opts.release || process.env.npm_package_name + ':' + process.env.npm_package_version
  const oopsLines = `\n
    import oops from 'vue-ops';\n\n
    Vue.use({\n
      release: ${release},\n
      token: ${opts.token}\n
    });`

  api.onCreateComplete(() => {
    // inject to main.js
    const fs = require('fs')
    const ext = api.hasPlugin('typescript') ? 'ts' : 'js'
    const mainPath = api.resolve(`./src/main.${ext}`)

    // get content
    const contentMain = fs.readFileSync(mainPath, { encoding: 'utf-8' })
    const lines = contentMain.split(/\r?\n/g).reverse()

    // inject import
    const lastImportIndex = lines.findIndex(line => line.match(/^import/))
    lines[lastImportIndex] += oopsLines


    // modify app
    contentMain = lines.reverse().join('\n')
    fs.writeFileSync(mainPath, contentMain, { encoding: 'utf-8' })
  })
}
