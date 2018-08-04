"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fs = require("fs-extra");

var _ = require("lodash");

var path = require("path");

var prettier = require("prettier");

var pri_1 = require("pri");

function addStore(_x, _x2) {
  return _addStore.apply(this, arguments);
}

function _addStore() {
  _addStore = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(projectRootPath, options) {
    var camelName, camelUpperFirstName, kebabName, fileFullPath;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            camelName = _.camelCase(options.name);
            camelUpperFirstName = _.upperFirst(camelName);
            kebabName = _.kebabCase(options.name);
            fileFullPath = path.join(projectRootPath, pri_1.storesPath.dir, kebabName) + ".tsx";

            if (!fs.existsSync(fileFullPath)) {
              _context.next = 6;
              break;
            }

            throw Error("".concat(kebabName, " already exist!"));

          case 6:
            fs.outputFileSync(fileFullPath, prettier.format("\n    import { observable, inject, Action } from \"dob\"\n\n    @observable\n    export class ".concat(camelUpperFirstName, "Store {\n      ").concat(options.withDemo ? "public testValue = 1" : "", "\n    }\n\n    export class ").concat(camelUpperFirstName, "Action {\n      @inject(").concat(camelUpperFirstName, "Store) public ").concat(camelName, "Store: ").concat(camelUpperFirstName, "Store\n\n      ").concat(options.withDemo ? "\n        @Action public test() {\n          this.".concat(camelName, "Store.testValue++\n        }\n      ") : "", "\n    }\n  "), {
              semi: false,
              parser: "typescript"
            }));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _addStore.apply(this, arguments);
}

exports.addStore = addStore;