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
    Get_FullDateString(target) {
        target.setTime(target.getTime() + 1000 * 60 * 60 * 9);
        let year = this.AdjustDigits(target.getFullYear(), 4);
        let month = this.AdjustDigits((target.getMonth() + 1), 2);
        let date = this.AdjustDigits(target.getDate(), 2);
        let hours = this.AdjustDigits(target.getHours(), 2);
        let minutes = this.AdjustDigits(target.getMinutes(), 2);
        let seconds = this.AdjustDigits(target.getSeconds(), 2);
        return year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds;
    }
    AdjustDigits(target, digits) {
        return (Array(digits + 1).join('0') + target.toString()).slice(-digits);
    }
}
exports.default = WriteProcessingTimeLog;
