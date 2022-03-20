"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessingTimeLogFileDetail = exports.ConvertToMsFromNs = void 0;
// ナノ秒をミリ秒に変換
function ConvertToMsFromNs(ns) {
    return Math.trunc(ns * 0.000001);
}
exports.ConvertToMsFromNs = ConvertToMsFromNs;
// 書き込むログファイルの場所 processing time log file detail
exports.ProcessingTimeLogFileDetail = {
    logs_home_dir: "/home/logs/",
    current_log_dir: process.env.LOG_PATH || "/home/logs/new",
    name: process.env.DATABASE_SYSTEM + "_" + process.env.NODE_ENV + ".log",
    path: () => {
        let self = exports.ProcessingTimeLogFileDetail;
        return self.current_log_dir + self.name;
    }
};
