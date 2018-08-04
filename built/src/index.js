"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fs = require("fs-extra");

var _ = require("lodash");

var normalizePath = require("normalize-path");

var path = require("path");

var prettier = require("prettier");

var pri_1 = require("pri");

var methods_1 = require("./methods");

var LAYOUT_TEMP = 'LayoutTempComponent';
var LAYOUT = 'LayoutComponent';
var MARKDOWN_LAYOUT_TEMP = 'MarkdownLayoutTempComponent';
var MARKDOWN_LAYOUT = 'MarkdownLayoutComponent';

var safeName = function safeName(str) {
  return _.upperFirst(_.camelCase(str));
};

exports.default =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(instance) {
    var storeFilePath, storeFilePathInfo, whiteList;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            storeFilePath = path.join(instance.projectRootPath, pri_1.tempTypesPath.dir, 'stores.ts');
            storeFilePathInfo = path.parse(storeFilePath);
            instance.build.pipeConfig(function (config) {
              if (!config.resolve.alias) {
                config.resolve.alias = {};
              }

              config.resolve.alias['pri/stores'] = storeFilePath;
              return config;
            });
            whiteList = ['src/stores'];
            instance.project.whiteFileRules.add(function (file) {
              return whiteList.some(function (whiteName) {
                return path.format(file) === path.join(instance.projectRootPath, whiteName);
              });
            }); // src/stores/**

            instance.project.whiteFileRules.add(function (file) {
              var relativePath = path.relative(instance.projectRootPath, file.dir);
              return relativePath.startsWith('src/stores');
            });
            instance.project.onAnalyseProject(function (files) {
              return {
                projectAnalyseDob: {
                  storeFiles: files.filter(function (file) {
                    if (file.isDir) {
                      return false;
                    }

                    var relativePath = path.relative(instance.projectRootPath, path.join(file.dir, file.name));

                    if (!relativePath.startsWith(pri_1.storesPath.dir)) {
                      return false;
                    }

                    return true;
                  }).map(function (file) {
                    return {
                      file: file,
                      name: safeName(file.name)
                    };
                  })
                }
              };
            });
            instance.project.onCreateEntry(function (analyseInfo, entry) {
              if (analyseInfo.projectAnalyseDob.storeFiles.length === 0) {
                if (fs.existsSync(storeFilePath)) {
                  fs.removeSync(storeFilePath);
                }

                return;
              } // Connect normal pages


              entry.pipe.set('normalPagesImportEnd', function (importEnd) {
                return "\n        ".concat(importEnd, ".then(component => Connect()(component.default))\n      ");
              }); // Connect layout

              entry.pipe.set('analyseLayoutImportName', function (text) {
                return LAYOUT_TEMP;
              });
              entry.pipe.set('analyseLayoutBody', function (body) {
                return "\n        ".concat(body, "\n        const ").concat(LAYOUT, " = Connect()(").concat(LAYOUT_TEMP, ")\n      ");
              }); // Connect markdown layout

              entry.pipe.set('analyseMarkdownLayoutImportName', function (text) {
                return MARKDOWN_LAYOUT_TEMP;
              });
              entry.pipe.set('analyseMarkdownLayoutBody', function (body) {
                return "\n      ".concat(body, "\n      const ").concat(MARKDOWN_LAYOUT, " = Connect()(").concat(MARKDOWN_LAYOUT_TEMP, ")\n    ");
              });
              var entryRelativeToHelper = ensureStartWithWebpackRelativePoint(path.relative(path.join(pri_1.tempJsEntryPath.dir), path.join(storeFilePathInfo.dir, storeFilePathInfo.name)));
              entry.pipeAppHeader(function (header) {
                return "\n        ".concat(header, "\n        import { useStrict } from \"dob\"\n        import { Connect, Provider } from \"dob-react\"\n        import { stores } from \"").concat(normalizePath(entryRelativeToHelper), "\"\n      ");
              });
              entry.pipeAppBody(function (body) {
                return "\n        ".concat(body, "\n        useStrict()\n      ");
              });
              entry.pipeAppRouter(function (router) {
                return "\n        <Provider {...stores}>\n          ".concat(router, "\n        </Provider>\n      ");
              });
              var storesHelper = "\n      import { combineStores } from \"dob\"\n\n      ".concat(analyseInfo.projectAnalyseDob.storeFiles.map(function (storeFile) {
                var importAbsolutePath = path.join(storeFile.file.dir, storeFile.file.name);
                var importRelativePath = ensureStartWithWebpackRelativePoint(path.relative(storeFilePathInfo.dir, importAbsolutePath));
                return "import { ".concat(storeFile.name, "Action, ").concat(storeFile.name, "Store } from \"").concat(normalizePath(importRelativePath), "\"");
              }).join('\n'), "\n\n      const stores = combineStores({").concat(analyseInfo.projectAnalyseDob.storeFiles.map(function (storeFile) {
                return "".concat(storeFile.name, "Action, ").concat(storeFile.name, "Store");
              }).join(','), "})\n\n      export { stores }\n    "); // If has stores, create helper.ts

              fs.outputFileSync(storeFilePath, prettier.format(getHelperContent(storesHelper), {
                semi: false,
                parser: 'typescript'
              }));
            }); // Register service

            instance.devService.on('addStore',
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee(data) {
                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return methods_1.addStore(instance.projectRootPath, data);

                      case 2:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

function getHelperContent(str) {
  return "\n    /**\n     * Do not edit this file.\n     * This file is automatic generated to get type help.\n     */\n    ".concat(str, "\n  ");
}

function ensureStartWithWebpackRelativePoint(str) {
  if (str.startsWith('/')) {
    throw Error("".concat(str, " is an absolute path!"));
  }

  if (!str.startsWith('./') && !str.startsWith('../')) {
    return './' + str;
  } else {
    return str;
  }
}

exports.ensureStartWithWebpackRelativePoint = ensureStartWithWebpackRelativePoint;