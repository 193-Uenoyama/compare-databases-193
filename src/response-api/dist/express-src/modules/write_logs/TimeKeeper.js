"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WriteProcessingTimeLog_1 = __importDefault(require("@/express-src/modules/write_logs/WriteProcessingTimeLog"));
class TimeKeeper {
    constructor() {
        this.timer_start = process.hrtime();
        this.timer_split_or_end = [-1, -1];
        this.request_id = Math.random().toString(32).substring(2);
        this.start_time = this.Get_FullDateString(new Date());
        this.writer = new WriteProcessingTimeLog_1.default(this.request_id, this.start_time);
    }
    invokeWriter(process_detail) {
        this.timer_split_or_end = process.hrtime(this.timer_start);
        if (process_detail.name == "Node") {
            this.writer.WriteNodeLog(process_detail.state, process_detail.name, this.timer_split_or_end);
        }
        else {
            this.writer.WriteDbLog(process_detail.state, process_detail.name, process_detail.target_table, this.timer_split_or_end);
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
