"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
const express_1 = require("express");
exports.rootRouter = (0, express_1.Router)();
exports.rootRouter.all('/', 
// HTMLのエスケープ処理をする
function (req, res, next) {
    Object.keys(req.body).forEach(key => {
        req.body[key] = escapeHTML(req.body[key]);
    });
    next();
}
// TimeKeeperを設定
// function(req: Request, res: Response, next: NextFunction) {
//   req.body.time_keeper = new TimeKeeper();
//   next();
// }
);
function escapeHTML(reqString) {
    return reqString.replace(/\&/g, '&amp;')
        .replace(/\</g, '&lt;')
        .replace(/\>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/\'/g, '&#x27');
}
