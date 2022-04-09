"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pretreatmentRouter = void 0;
const express_1 = require("express");
const TimeKeeper_1 = __importDefault(require("../../../express-src/modules/processingLogStore/writeLogs/TimeKeeper"));
const ReqDetailHolderForLog_1 = __importDefault(require("../../../express-src/modules/processingLogStore/writeLogs/ReqDetailHolderForLog"));
exports.pretreatmentRouter = (0, express_1.Router)();
exports.pretreatmentRouter.use('/', 
// TimeKeeperを設定
function (req, res, next) {
    const is_unneed_calculate = req.body.is_unneed_calculate || false;
    const req_log_detail = new ReqDetailHolderForLog_1.default(is_unneed_calculate).transferReqDetail();
    req.process_logging = {
        log_detail: req_log_detail,
        time_keeper: new TimeKeeper_1.default(req_log_detail)
    };
    req.is_return_res = false;
    next();
}, 
// HTMLのエスケープ処理をする
// TODO 特定フィールドのみに絞る
// function(req: Request, res: Response, next: NextFunction) {
//   Object.keys(req.body).forEach(key => {
//     if(typeof req.body[key] == "number") {
//       req.body[key] = String(req.body[key]);
//     }
//     req.body[key] = escapeHTML(req.body[key]);
//   });
//   next();
// },
// ステータスコードを0に設定。
function (req, res, next) {
    res.statusCode = 0;
    next();
});
function escapeHTML(reqString) {
    return reqString.replace(/\&/g, '&amp;')
        .replace(/\</g, '&lt;')
        .replace(/\>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/\'/g, '&#x27');
}
