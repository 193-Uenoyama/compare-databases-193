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
        fs_1.default.appendFileSync(this.WRITTEN_FILE_PATH, created_time.toDateString() + "," +
            timer_db_end[1] + "," +
            timer_node_end[1] + "\n");
    }
}
exports.default = WriteProcessingTimeLog;
