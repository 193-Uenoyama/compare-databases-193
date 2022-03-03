"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
const express_1 = require("express");
const TimeKeeper_1 = __importDefault(require("../../express-src/modules/write_logs/TimeKeeper"));
exports.rootRouter = (0, express_1.Router)();
exports.rootRouter.use('/', 
// TimeKeeperを設定
function (req, res, next) {
    req.time_keeper = new TimeKeeper_1.default();
    req.is_return_res = false;
    next();
}, 
// HTMLのエスケープ処理をする
function (req, res, next) {
    Object.keys(req.body).forEach(key => {
        if (typeof req.body[key] == "number") {
            req.body[key] = String(req.body[key]);
        }
        req.body[key] = escapeHTML(req.body[key]);
    });
    next();
});
function escapeHTML(reqString) {
    return reqString.replace(/\&/g, '&amp;')
        .replace(/\</g, '&lt;')
        .replace(/\>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/\'/g, '&#x27');
}
