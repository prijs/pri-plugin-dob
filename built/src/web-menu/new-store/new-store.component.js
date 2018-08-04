"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

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

var new_store_type_1 = require("./new-store.type");

var S = require("./style");

var form_1 = require("./form");

var NewStoreComponent =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2.default)(NewStoreComponent, _React$PureComponent);

  function NewStoreComponent() {
    var _this;

    (0, _classCallCheck2.default)(this, NewStoreComponent);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(NewStoreComponent).apply(this, arguments));
    _this.state = new new_store_type_1.State();

    _this.showModal = function () {
      _this.setState({
        visible: true
      });
    };

    _this.handleOk = function () {
      _this.setState({
        visible: false
      });
    };

    _this.handleCancel = function () {
      _this.setState({
        visible: false
      });
    };

    return _this;
  }

  (0, _createClass2.default)(NewStoreComponent, [{
    key: "render",
    value: function render() {
      return React.createElement(S.Container, null, React.createElement(S.Button, {
        onClick: this.showModal
      }, React.createElement(S.MenuIcon, {
        type: "plus"
      }), "New Store"), React.createElement(antd_1.Modal, {
        title: "New Store",
        visible: this.state.visible,
        footer: null,
        onOk: this.handleOk,
        onCancel: this.handleCancel
      }, React.createElement(form_1.default, {
        onSuccess: this.handleCancel
      })));
    }
  }]);
  return NewStoreComponent;
}(React.PureComponent);

NewStoreComponent.defaultProps = new new_store_type_1.Props();
NewStoreComponent = __decorate([dob_react_1.Connect], NewStoreComponent);
exports.NewStoreComponent = NewStoreComponent;