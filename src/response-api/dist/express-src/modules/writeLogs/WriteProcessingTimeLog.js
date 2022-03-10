"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class ProcessingTimeLogWriter {
    constructor(request_id, request_time) {
        this.WRITTEN_FILE_DIRECTORY = process.env.LOG_PATH || "/home/logs/new/";
        this.WRITTEN_FILE_NAME = process.env.DATABASE_SYSTEM + "_" +
            process.env.NODE_ENV + ".log";
        this.WRITTEN_FILE_PATH = this.WRITTEN_FILE_DIRECTORY + this.WRITTEN_FILE_NAME;
        this.request_id = request_id;
        this.request_time = request_time;
        this.ifNotExist_CreateDirectory();
    }
    WriteNodeLog(process_state, request_name, processing_time) {
        try {
            fs_1.default.appendFileSync(this.WRITTEN_FILE_PATH, process_state + "," +
                this.request_time + "," +
                this.request_id + "," +
                request_name + "," +
                processing_time + "\n");
        }
        catch (err) {
            console.log(err);
        }
    }
    WriteDbLog(process_state, request_name, target_table, processing_time) {
        try {
            fs_1.default.appendFileSync(this.WRITTEN_FILE_PATH, process_state + "," +
                this.request_time + "," +
                this.request_id + "," +
                "DB" + "," +
                request_name + "," +
                target_table + "," +
                processing_time + "\n");
        }
        catch (err) {
            console.log(err);
        }
    }
    ifNotExist_CreateDirectory() {
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
