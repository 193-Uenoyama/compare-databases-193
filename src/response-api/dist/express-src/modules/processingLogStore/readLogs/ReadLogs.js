"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const processingLogModules_1 = require("../../../../express-src/modules/processingLogStore/processingLogModules");
class ReadLogs {
    constructor(dir) {
        this.wanted_dir = dir;
        this.wanted_dir_path =
            processingLogModules_1.ProcessingTimeLogFileDetail.logs_home_dir +
                this.wanted_dir + "/";
    }
    completelyLogDetail() {
        const log_files = this.getTargetFiles();
        let completelyLogData = {};
        log_files.forEach((log_file) => {
            const log_file_path = this.wanted_dir_path + log_file;
            completelyLogData[log_file] = this.csvFileConvertToArray(log_file_path);
        });
        return completelyLogData;
    }
    csvFileConvertToArray(log_file_path) {
        const log_content = fs_1.default.readFileSync(log_file_path);
        const log_content_lines = log_content.toString().split('\n');
        const records = [];
        for (const line of log_content_lines) {
            records.push(line.split(','));
        }
        return records;
    }
    getTargetFiles() {
        let read_files = [];
        try {
            read_files = fs_1.default.readdirSync(this.wanted_dir_path);
        }
        catch (err) {
            console.log(err);
        }
        return read_files;
    }
}
exports.default = ReadLogs;
