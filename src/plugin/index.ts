import * as fs from 'fs-extra';
import * as _ from 'lodash';
import * as normalizePath from 'normalize-path';
import * as path from 'path';
import { pri, storesPath, tempJsEntryPath, tempTypesPath } from 'pri';
import { addStore } from './methods';

const LAYOUT_TEMP = 'LayoutTempComponent';
const LAYOUT = 'LayoutComponent';

const MARKDOWN_LAYOUT_TEMP = 'MarkdownLayoutTempComponent';
const MARKDOWN_LAYOUT = 'MarkdownLayoutComponent';

const safeName = (str: string) => _.upperFirst(_.camelCase(str));

interface IResult {
  projectAnalyseDob: {
    storeFiles: Array<{
      name: string;
      file: path.ParsedPath;
    }>;
  };
}

export const entry = (instance: typeof pri) => {
  const storeFilePath = path.join(instance.projectRootPath, tempTypesPath.dir, 'stores.ts');
  const storeFilePathInfo = path.parse(storeFilePath);

  instance.build.pipeConfig(buildConfig => {
    if (!buildConfig.resolve.alias) {
      buildConfig.resolve.alias = {};
    }

    buildConfig.resolve.alias['pri/stores'] = storeFilePath;

    return buildConfig;
  });

  const whiteList = ['src/stores'];
  instance.project.whiteFileRules.add(file => {
    return whiteList.some(whiteName => path.format(file) === path.join(instance.projectRootPath, whiteName));
  });

  // src/stores/**
  instance.project.whiteFileRules.add(file => {
    const relativePath = path.relative(instance.projectRootPath, file.dir);
    return relativePath.startsWith('src/stores');
  });

  instance.project.onAnalyseProject(files => {
    return {
      projectAnalyseDob: {
        storeFiles: files
          .filter(file => {
            if (file.isDir) {
              return false;
            }

            const relativePath = path.relative(instance.projectRootPath, path.join(file.dir, file.name));

            if (!relativePath.startsWith(storesPath.dir)) {
              return false;
            }

            return true;
          })
          .map(file => {
            return {
              file,
              name: safeName(file.name)
            };
          })
      }
    } as IResult;
  });

  instance.project.onCreateEntry(async (analyseInfo: IResult, entryInfo) => {
    if (analyseInfo.projectAnalyseDob.storeFiles.length === 0) {
      if (fs.existsSync(storeFilePath)) {
        fs.removeSync(storeFilePath);
      }

      return;
    }

    // Connect normal pages
    entryInfo.pipe.set('normalPagesImportEnd', importEnd => {
      return `
        ${importEnd}.then(component => Connect()(component.default))
      `;
    });

    // Connect layout
    entryInfo.pipe.set('analyseLayoutImportName', text => LAYOUT_TEMP);
    entryInfo.pipe.set('analyseLayoutBody', body => {
      return `
        ${body}
        const ${LAYOUT} = Connect()(${LAYOUT_TEMP})
      `;
    });

    // Connect markdown layout
    entryInfo.pipe.set('analyseMarkdownLayoutImportName', text => MARKDOWN_LAYOUT_TEMP);
    entryInfo.pipe.set('analyseMarkdownLayoutBody', body => {
      return `
      ${body}
      const ${MARKDOWN_LAYOUT} = Connect()(${MARKDOWN_LAYOUT_TEMP})
    `;
    });

    const entryRelativeToHelper = ensureStartWithWebpackRelativePoint(
      path.relative(path.join(tempJsEntryPath.dir), path.join(storeFilePathInfo.dir, storeFilePathInfo.name))
    );

    entryInfo.pipeAppHeader(header => {
      return `
        ${header}
        import { useStrict } from "dob"
        import { Connect, Provider } from "dob-react"
        import { stores } from "${normalizePath(entryRelativeToHelper)}"
      `;
    });

    entryInfo.pipeAppBody(body => {
      return `
        ${body}
        useStrict()
      `;
    });

    entryInfo.pipeAppRouter(router => {
      return `
        <Provider {...stores}>
          ${router}
        </Provider>
      `;
    });

    const storesHelper = `
      import { combineStores } from "dob"

      ${analyseInfo.projectAnalyseDob.storeFiles
        .map(storeFile => {
          const importAbsolutePath = path.join(storeFile.file.dir, storeFile.file.name);
          const importRelativePath = ensureStartWithWebpackRelativePoint(
            path.relative(storeFilePathInfo.dir, importAbsolutePath)
          );
          return `import { ${storeFile.name}Action, ${storeFile.name}Store } from "${normalizePath(
            importRelativePath
          )}"`;
        })
        .join('\n')}

      const stores = combineStores({${analyseInfo.projectAnalyseDob.storeFiles
        .map(storeFile => {
          return `${storeFile.name}Action, ${storeFile.name}Store`;
        })
        .join(',')}})

      export { stores }
    `;

    const prettier = await import('prettier');

    // If has stores, create helper.ts
    fs.outputFileSync(
      storeFilePath,
      prettier.format(getHelperContent(storesHelper), {
        semi: false,
        parser: 'typescript'
      })
    );
  });

  // Register service
  instance.devService.on('addStore', async data => {
    await addStore(instance.projectRootPath, data);
  });
};

function getHelperContent(str: string) {
  return `
    /**
     * Do not edit this file.
     * This file is automatic generated to get type help.
     */
    ${str}
  `;
}

export function ensureStartWithWebpackRelativePoint(str: string) {
  if (str.startsWith('/')) {
    throw Error(`${str} is an absolute path!`);
  }

  if (!str.startsWith('./') && !str.startsWith('../')) {
    return './' + str;
  } else {
    return str;
  }
}