"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReqLogDetailHolder {
    constructor() {
        this.request_id = Math.random().toString(32).substring(2);
        this.start_time = this.Get_FullDateString(new Date());
    }
    transferReqDetail() {
        return {
            request_id: this.request_id,
            request_start_time: this.start_time
        };
    }
    // 日付データ(now)を文字列に変換する
    Get_FullDateString(now) {
        now.setTime(now.getTime() + 1000 * 60 * 60 * 9);
        let year = this.AdjustDigits(now.getFullYear(), 4);
        let month = this.AdjustDigits((now.getMonth() + 1), 2);
        let date = this.AdjustDigits(now.getDate(), 2);
        let hours = this.AdjustDigits(now.getHours(), 2);
        let minutes = this.AdjustDigits(now.getMinutes(), 2);
        let seconds = this.AdjustDigits(now.getSeconds(), 2);
        return year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds;
    }
    // target の 桁数が digits より小さかったらその分だけ0を入れる
    AdjustDigits(target, digits) {
        return (Array(digits + 1).join('0') + target.toString()).slice(-digits);
    }
}
exports.default = ReqLogDetailHolder;
