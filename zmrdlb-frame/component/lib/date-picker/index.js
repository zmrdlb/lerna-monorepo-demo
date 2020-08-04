"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = DatePicker;

var _util = require("@zmrdlb-frame/lib/lib/util");

function DatePicker() {
  // 输出当前日期
  var currentDateTime = (0, _util.dateFormat)(Date.now(), 'yyyy.MM.dd hh:mm:ss');
  console.log("\u5F53\u524D\u65E5\u671F\u65F6\u95F4\u662F".concat(currentDateTime));
}