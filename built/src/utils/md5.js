"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var crypto = require("crypto");

function md5(str) {
  return crypto.createHash("md5").update(str, "utf8").digest("hex");
}

exports.md5 = md5;