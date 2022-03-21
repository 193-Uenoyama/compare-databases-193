"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WriteProcessingTimeLog_1 = __importDefault(require("../../../../express-src/modules/processingLogStore/writeLogs/WriteProcessingTimeLog"));
class TimeKeeper {
    constructor(req_log_detail) {
        this.timer_start_time = process.hrtime.bigint();
        this.req_log_detail = req_log_detail;
    }
    static async calculateProcessingTime(func, req_log_detail, process_detail) {
        const processTimer = new TimeKeeper(req_log_detail);
        let value = await func();
        processTimer.invokeWriter(process_detail);
        return value;
    }
    // writerにログを書かせる
    invokeWriter(process_detail) {
        let timer_time_now = process.hrtime.bigint();
        WriteProcessingTimeLog_1.default.decideLogMethod(this.req_log_detail, process_detail, timer_time_now - this.timer_start_time);
    }
}
exports.default = TimeKeeper;
