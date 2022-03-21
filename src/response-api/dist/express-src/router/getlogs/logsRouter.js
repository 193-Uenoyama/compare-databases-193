"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogsRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const fs_1 = __importDefault(require("fs"));
const validationMessages_1 = require("../../../express-src/modules/validation/validationMessages");
const processingLogModules_1 = require("../../../express-src/modules/processingLogStore/processingLogModules");
const ReadLogs_1 = __importDefault(require("../../../express-src/modules/processingLogStore/readLogs/ReadLogs"));
exports.getLogsRouter = (0, express_1.Router)();
/** send log file names ************************************
 *
 * ログファイルディレクトリの一覧を送信する
 *
 **********************************************************/
exports.getLogsRouter.get('/', async function (req, res, next) {
    let read_dirs;
    try {
        read_dirs = fs_1.default.readdirSync(processingLogModules_1.ProcessingTimeLogFileDetail.logs_home_dir);
    }
    catch (err) {
        console.log(err);
        next();
        return;
    }
    res.status(200).json(read_dirs);
    next();
});
/***********************************************************
 *
 * 指定されたディレクトリ内のログの詳細を返却する
 *
 * @param req.params.dir: string // ディレクトリの名前
 *
 **********************************************************/
exports.getLogsRouter.get('/:dir', (0, express_validator_1.param)('dir')
    .custom(value => {
    try {
        return fs_1.default.readdirSync(processingLogModules_1.ProcessingTimeLogFileDetail.logs_home_dir).includes(value);
    }
    catch (err) {
        console.log(err);
        return;
    }
})
    .withMessage(validationMessages_1.APPMSG.General.directoryNotFound), async function (req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const records = [];
    const read_logs = new ReadLogs_1.default(req.params.dir);
    res.status(200).json(read_logs.completelyLogDetail());
    next();
});
