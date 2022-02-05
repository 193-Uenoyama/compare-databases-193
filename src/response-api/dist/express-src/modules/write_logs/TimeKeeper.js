"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _modules_1 = require("@/express-src/modules/write_logs/_modules");
const WriteProcessingTimeLog_1 = __importDefault(require("@/express-src/modules/write_logs/WriteProcessingTimeLog"));
class TimeKeeper {
    constructor() {
        this.timer_start = process.hrtime();
        this.timer_db_end = _modules_1.DEFAULT_HRTIME;
        this.timer_node_end = _modules_1.DEFAULT_HRTIME;
        this.is_store_timer_db_end = false;
        this.is_store_timer_node_end = false;
        this.start_time = new Date();
        this.write_logs = new WriteProcessingTimeLog_1.default();
    }
    ;
    ;
    StoreDbEnd_IfPossibleOutLog() {
        this.timer_db_end = process.hrtime(this.timer_start);
        this.is_store_timer_db_end = true;
        this.IfPossibleOutLog();
    }
    StoreNodeEnd_IfPossibleOutLog() {
        this.timer_node_end = process.hrtime(this.timer_start);
        this.is_store_timer_node_end = true;
        this.IfPossibleOutLog();
    }
    IfPossibleOutLog() {
        // 処理時間を2つとも(node, db)取得できていなければ return
        let is_not_stored_yet = !(this.is_store_timer_node_end && this.is_store_timer_db_end);
        if (is_not_stored_yet) {
            return;
        }
        // 処理時間をログとして出力
        console.log("database access ... " + this.timer_db_end[1] + "ナノ秒 " +
            (0, _modules_1.ConvertToMsFromNs)(this.timer_db_end[1]) + "ミリ秒\n" +
            "nodejs process  ... " + this.timer_node_end[1] + "ナノ秒 " +
            (0, _modules_1.ConvertToMsFromNs)(this.timer_node_end[1]) + "ミリ秒");
        // 処理時間をログファイルに書き込み
        this.write_logs.WriteLog(this.timer_db_end, this.timer_node_end, this.start_time);
    }
}
exports.default = TimeKeeper;
