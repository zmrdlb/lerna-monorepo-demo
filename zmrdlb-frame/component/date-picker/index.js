const Lib = require('@zmrdlb-frame/lib');

// 可以像这样，只引用单个需要的 module
// const DateFormat = require('@zmrdlb-frame/lib/util/date-format');

module.exports = function() {
    // 输出当前日期
    var currentDateTime = Lib.DateFormat(Date.now(),'yyyy.MM.dd hh:mm');
    console.log(`当前日期时间是${currentDateTime}`);
}
