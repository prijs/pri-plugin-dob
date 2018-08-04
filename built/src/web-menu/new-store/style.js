"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _assign = _interopRequireDefault(require("@babel/runtime/core-js/object/assign"));

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 14px;\n  color: #666;\n  border-right: 1px solid #eee;\n  padding: 0 10px;\n  cursor: pointer;\n  transition: background-color 0.2s;\n  &:hover {\n    background-color: whitesmoke;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

var antd_1 = require("antd");

var React = require("react");

var styled_components_1 = require("styled-components");

exports.MenuIcon = function (props) {
  return React.createElement(antd_1.Icon, (0, _assign.default)({
    style: {
      fontSize: 15,
      marginRight: 10
    }
  }, props));
};

exports.Container = styled_components_1.default.div(_templateObject());
exports.Button = styled_components_1.default.div(_templateObject2());