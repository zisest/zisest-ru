// Creates new component
const path = require('path')
const fs = require('fs')

const COMPONENTS_DIR = path.join(__dirname, 'src', 'components')

const componentName = process.argv[2] // Should be in PascalCase
if (!componentName) throw new Error('No component name provided')

const COMPONENT_DIR = path.join(COMPONENTS_DIR, componentName)


const indexFileContent = `export * from './${componentName}'
export { default } from './${componentName}'`

const componentFileContent = `function ${componentName} ({  }) {
  return (
    <div></div>
  )
}

export default ${componentName}`


fs.mkdir(COMPONENT_DIR, { recursive: true }, function (err) {
  if (err) throw new Error(err)

  fs.writeFileSync(path.join(COMPONENT_DIR, componentName + '.tsx'), componentFileContent)
  fs.writeFileSync(path.join(COMPONENT_DIR, 'index.ts'), indexFileContent)
})
