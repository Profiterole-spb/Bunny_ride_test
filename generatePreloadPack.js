const fs = require('fs');

fs.readdir('src/assets/', (err, files) => {
  const imports = files.map((f) => {
    const name = f.slice(0, f.indexOf('.'))
    return `import ${name} from 'src/assets/${f}'`
  })
  console.log('imports', imports)

  const names = files.map((f) => f.slice(0, f.indexOf('.')))

  const exp = `export const preloadPack = {${names.join(',\n')}\n}`

  fs.writeFile('src/js/display/preloadPack.js', `${imports.join(';\n')}\n\n${exp}`, () => {})
})
