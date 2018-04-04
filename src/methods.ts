import * as fs from "fs-extra"
import * as _ from "lodash"
import * as path from "path"
import * as prettier from "prettier"
import { storesPath } from "pri"

export async function addStore(
  projectRootPath: string,
  options: {
    name: string
    withDemo: boolean
  }
) {
  const camelName = _.camelCase(options.name)
  const camelUpperFirstName = _.upperFirst(camelName)
  const kebabName = _.kebabCase(options.name)
  const fileFullPath = path.join(projectRootPath, storesPath.dir, kebabName) + ".tsx"

  if (fs.existsSync(fileFullPath)) {
    throw Error(`${kebabName} already exist!`)
  }

  fs.outputFileSync(
    fileFullPath,
    prettier.format(
      `
    import { observable, inject, Action } from "dob"

    @observable
    export class ${camelUpperFirstName}Store {
      ${options.withDemo ? `public testValue = 1` : ""}
    }

    export class ${camelUpperFirstName}Action {
      @inject(${camelUpperFirstName}Store) public ${camelName}Store: ${camelUpperFirstName}Store

      ${
        options.withDemo
          ? `
        @Action public test() {
          this.${camelName}Store.testValue++
        }
      `
          : ""
      }
    }
  `,
      {
        semi: false,
        parser: "typescript"
      }
    )
  )
}
