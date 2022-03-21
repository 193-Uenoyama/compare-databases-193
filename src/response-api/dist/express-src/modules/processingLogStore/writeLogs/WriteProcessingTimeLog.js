"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const processingLogModules_1 = require("../../../../express-src/modules/processingLogStore/processingLogModules");
class ProcessingTimeLogWriter {
    static decideLogMethod(log_detail, process_detail, processing_time) {
        if (process_detail.name == "Node") {
            this.WriteNodeLog(process_detail.state, log_detail.request_id, log_detail.request_start_time, process_detail.name, processing_time);
        }
        else {
            this.WriteDbLog(process_detail.state, log_detail.request_id, log_detail.request_start_time, process_detail.name, process_detail.target_table, processing_time);
        }
    }
    static WriteNodeLog(process_state, request_id, request_time, process_name, processing_time) {
        try {
            fs_1.default.appendFileSync(processingLogModules_1.ProcessingTimeLogFileDetail.path(), (this.isNecessaryLineFeed() ? "\n" : "") +
                process_state + "," +
                request_time + "," +
                request_id + "," +
                process_name + "," +
                processing_time);
        }
        catch (err) {
            console.log(err);
        }
    }
    static WriteDbLog(process_state, request_id, request_time, process_name, target_table, processing_time) {
        try {
            fs_1.default.appendFileSync(processingLogModules_1.ProcessingTimeLogFileDetail.path(), (this.isNecessaryLineFeed() ? "\n" : "") +
                process_state + "," +
                request_time + "," +
                request_id + "," +
                "DB" + "," +
                process_name + "," +
                target_table + "," +
                processing_time);
        }
        catch (err) {
            console.log(err);
        }
    }
    // ログを格納するためのディレクトリを用意する (サーバーが立ち上がるとき)
    static reservWriteLog() {
        try {
            if (!fs_1.default.existsSync(processingLogModules_1.ProcessingTimeLogFileDetail.current_log_dir)) {
                fs_1.default.mkdirSync(processingLogModules_1.ProcessingTimeLogFileDetail.current_log_dir);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    // 改行が必要かどうか判断
    static isNecessaryLineFeed() {
        // データが書き込まれるときにファイルが作成されるので
        // 存在の確認で十分
        let is_exist_file = false;
        try {
            is_exist_file = fs_1.default.existsSync(processingLogModules_1.ProcessingTimeLogFileDetail.path());
        }
        catch (err) {
            console.log(err);
        }
        return is_exist_file;
    }
}
exports.default = ProcessingTimeLogWriter;
