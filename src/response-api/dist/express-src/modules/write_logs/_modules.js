"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertToMsFromNs = void 0;
// ナノ秒をミリ秒に変換
function ConvertToMsFromNs(ns) {
    return Math.trunc(ns * 0.000001);
}
exports.ConvertToMsFromNs = ConvertToMsFromNs;
