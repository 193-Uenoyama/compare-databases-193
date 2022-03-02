"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WriteProcessingTimeLog_1 = __importDefault(require("../../../express-src/modules/write_logs/WriteProcessingTimeLog"));
class TimeKeeper {
    constructor() {
        this.timer_start_time = process.hrtime.bigint();
        this.timer_split_start_time = -1n;
        this.timer_time_now = -1n;
        this.request_id = Math.random().toString(32).substring(2);
        this.start_time = this.Get_FullDateString(new Date());
        this.writer = new WriteProcessingTimeLog_1.default(this.request_id, this.start_time);
    }
    async calculateProcessingTime(func, process_detail) {
        this.timerSplit();
        let value = await func();
        this.invokeWriter(process_detail);
        return value;
    }
    timerSplit() {
        this.timer_split_start_time = process.hrtime.bigint();
    }
    // witerにログを書かせる
    invokeWriter(process_detail) {
        this.timer_time_now = process.hrtime.bigint();
        if (process_detail.name == "Node") {
            this.writer.WriteNodeLog(process_detail.state, process_detail.name, this.timer_time_now - this.timer_start_time);
        }
        else {
            this.writer.WriteDbLog(process_detail.state, process_detail.name, process_detail.target_table, this.timer_time_now - this.timer_split_start_time);
        }
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
exports.default = TimeKeeper;
