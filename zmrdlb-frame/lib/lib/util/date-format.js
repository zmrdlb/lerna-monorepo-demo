"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = dateFormat;

/**
 * 日期格式化
 * @param date 要格式化的日期
 * @param format 进行格式化的模式字符串
 *     支持的模式字母有：
 *     y:年,
 *     M:年中的月份(1-12),
 *     d:月份中的天(1-31),
 *     h:小时(0-23),
 *     m:分(0-59),
 *     s:秒(0-59),
 *     S:毫秒(0-999),
 *     q:季度(1-4)
 * @example
 *      return DateFormat(new Date().getTime(),'yy.MM.dd hh:mm')
 */

/**
 * format date
 * @param  {Number|String} date
 * any value which can be passed to new Date function.
 *   {Number}
 *         Date.now()
 *         new Date().getTime()
 *   {String}
 *         '2019-07-01 01:32:00'
 *         '2019/07/01 01:32:00'
 * @param  {[type]} format [description]
 * @return {[type]}        [description]
 */
function dateFormat(date, format) {
  date = new Date(date);
  var map = {
    "M": date.getMonth() + 1,
    //月份
    "d": date.getDate(),
    //日
    "h": date.getHours(),
    //小时
    "m": date.getMinutes(),
    //分
    "s": date.getSeconds(),
    //秒
    "q": Math.floor((date.getMonth() + 3) / 3),
    //季度
    "S": date.getMilliseconds() //毫秒

  };
  format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
    var v = map[t];

    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v;
        v = v.substr(v.length - 2);
      }

      return v;
    } else if (t === 'y') {
      return (date.getFullYear() + '').substr(4 - all.length);
    }

    return all;
  });
  return format;
}

;