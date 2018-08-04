"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assign = _interopRequireDefault(require("@babel/runtime/core-js/object/assign"));

var _defineProperty = _interopRequireDefault(require("@babel/runtime/core-js/object/define-property"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime/core-js/object/get-own-property-descriptor"));

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = (0, _getOwnPropertyDescriptor.default)(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && (0, _defineProperty.default)(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var antd_1 = require("antd");

var dob_react_1 = require("dob-react");

var React = require("react");

var new_store_component_1 = require("./new-store/new-store.component");

var type_1 = require("./type");

var TreeIcon = function TreeIcon(props) {
  return React.createElement(antd_1.Icon, (0, _assign.default)({
    style: {
      marginRight: 5
    }
  }, props));
};

var View =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(View, _React$Component);

  function View() {
    var _this;

    (0, _classCallCheck2.default)(this, View);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(View).apply(this, arguments));
    _this.state = new type_1.State();
    return _this;
  }

  (0, _createClass2.default)(View, [{
    key: "render",
    value: function render() {
      return React.createElement(new_store_component_1.NewStoreComponent, null);
    }
  }]);
  return View;
}(React.Component);

View.defaultProps = new type_1.Props();
View = __decorate([dob_react_1.Connect], View);
exports.default = {
  position: "menu",
  view: View
};