"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _map = _interopRequireDefault(require("@babel/runtime/core-js/map"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var createBrowserHistory_1 = require("history/createBrowserHistory");

var client_1 = require("pri/client");

var React = require("react");

var react_router_dom_1 = require("react-router-dom");

client_1.setEnvProd();
exports.pageLoadableMap = new _map.default();
exports.customHistory = createBrowserHistory_1.default({
  basename: '/'
});

var App =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2.default)(App, _React$PureComponent);

  function App() {
    (0, _classCallCheck2.default)(this, App);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(App).apply(this, arguments));
  }

  (0, _createClass2.default)(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      return React.createElement(react_router_dom_1.Router, {
        history: exports.customHistory
      }, React.createElement(react_router_dom_1.Switch, null));
    }
  }]);
  return App;
}(React.PureComponent);

exports.default = App;