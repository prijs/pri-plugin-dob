"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _assign = _interopRequireDefault(require("@babel/runtime/core-js/object/assign"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _keys = _interopRequireDefault(require("@babel/runtime/core-js/object/keys"));

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

var FormItem = antd_1.Form.Item;
var formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 8
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 16
    }
  }
};
var tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

function hasErrors(fieldsError) {
  return (0, _keys.default)(fieldsError).some(function (field) {
    return fieldsError[field];
  });
}

var FormComponent =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2.default)(FormComponent, _React$PureComponent);

  function FormComponent() {
    var _this;

    (0, _classCallCheck2.default)(this, FormComponent);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FormComponent).apply(this, arguments));
    _this.state = new new_store_type_1.State();

    _this.handleSubmit =
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(e) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.preventDefault();
                _context.next = 3;
                return _this.props.ApplicationAction.addStore(_this.props.form.getFieldsValue());

              case 3:
                _this.props.onSuccess();

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    return _this;
  }

  (0, _createClass2.default)(FormComponent, [{
    key: "render",
    value: function render() {
      return React.createElement(antd_1.Form, {
        onSubmit: this.handleSubmit
      }, React.createElement(FormItem, (0, _assign.default)({}, formItemLayout, {
        label: "Name"
      }), this.props.form.getFieldDecorator("name", {
        initialValue: "application",
        rules: [{
          type: "string",
          message: "Name must be string!"
        }, {
          required: true,
          message: "Name is required!"
        }]
      })(React.createElement(antd_1.Input, null))), React.createElement(FormItem, (0, _assign.default)({}, formItemLayout, {
        label: "With demo"
      }), this.props.form.getFieldDecorator("withDemo", {
        initialValue: true,
        valuePropName: "checked"
      })(React.createElement(antd_1.Switch, null))), React.createElement(FormItem, (0, _assign.default)({}, tailFormItemLayout), React.createElement(antd_1.Button, {
        type: "primary",
        htmlType: "submit",
        disabled: hasErrors(this.props.form.getFieldsError())
      }, "Ok")));
    }
  }]);
  return FormComponent;
}(React.PureComponent);

FormComponent.defaultProps = new new_store_type_1.Props();
FormComponent = __decorate([dob_react_1.Connect], FormComponent);
exports.default = antd_1.Form.create()(FormComponent);