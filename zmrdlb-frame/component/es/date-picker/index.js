import {dateFormat} from '@zmrdlb-frame/lib/lib/util'

export default function DatePicker() {
    // 输出当前日期
    var currentDateTime = dateFormat(Date.now(),'yyyy.MM.dd hh:mm:ss');
    console.log(`当前日期时间是${currentDateTime}`);
}
