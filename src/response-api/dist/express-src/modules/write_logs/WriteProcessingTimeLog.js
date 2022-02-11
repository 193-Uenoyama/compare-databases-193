"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class WriteProcessingTimeLog {
    constructor() {
        this.WRITTEN_FILE_DIRECTORY = process.env.LOG_PATH || "/home/logs/";
        this.WRITTEN_FILE_NAME = process.env.DATABASE_SYSTEM + ".log";
        this.WRITTEN_FILE_PATH = this.WRITTEN_FILE_DIRECTORY + this.WRITTEN_FILE_NAME;
    }
    WriteLog(timer_db_end, timer_node_end, created_time) {
        fs_1.default.appendFileSync(this.WRITTEN_FILE_PATH, this.Get_FullDateString(created_time) + "," +
            timer_db_end[1] + "," +
            timer_node_end[1] + "\n");
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
exports.default = WriteProcessingTimeLog;
