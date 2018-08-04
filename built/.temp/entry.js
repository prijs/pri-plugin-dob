"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var ReactDOM = require("react-dom");

var app_1 = require("./app");

var ROOT_ID = 'root'; // Create entry div if not exist.

if (!document.getElementById(ROOT_ID)) {
  var rootDiv = document.createElement('div');
  rootDiv.id = ROOT_ID;
  document.body.appendChild(rootDiv);
}

if (window.enableSsr) {
  ReactDOM.hydrate(React.createElement(app_1.default, null), document.getElementById(ROOT_ID));
} else {
  ReactDOM.render(React.createElement(app_1.default, null), document.getElementById(ROOT_ID));
}