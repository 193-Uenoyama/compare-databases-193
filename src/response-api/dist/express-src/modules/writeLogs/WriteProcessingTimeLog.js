"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
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
            fs_1.default.appendFileSync(this.WRITTEN_FILE_PATH, process_state + "," +
                request_time + "," +
                request_id + "," +
                process_name + "," +
                processing_time + "\n");
        }
        catch (err) {
            console.log(err);
        }
    }
    static WriteDbLog(process_state, request_id, request_time, process_name, target_table, processing_time) {
        try {
            fs_1.default.appendFileSync(this.WRITTEN_FILE_PATH, process_state + "," +
                request_time + "," +
                request_id + "," +
                "DB" + "," +
                process_name + "," +
                target_table + "," +
                processing_time + "\n");
        }
        catch (err) {
            console.log(err);
        }
    }
    static reservWriteLog() {
        try {
            if (!fs_1.default.existsSync(this.WRITTEN_FILE_DIRECTORY)) {
                fs_1.default.mkdirSync(this.WRITTEN_FILE_DIRECTORY);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.default = ProcessingTimeLogWriter;
_a = ProcessingTimeLogWriter;
ProcessingTimeLogWriter.WRITTEN_FILE_DIRECTORY = process.env.LOG_PATH || "/home/logs/new/";
ProcessingTimeLogWriter.WRITTEN_FILE_NAME = process.env.DATABASE_SYSTEM + "_" +
    process.env.NODE_ENV + ".log";
ProcessingTimeLogWriter.WRITTEN_FILE_PATH = _a.WRITTEN_FILE_DIRECTORY + _a.WRITTEN_FILE_NAME;
