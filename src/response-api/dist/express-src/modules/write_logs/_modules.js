"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertToMsFromNs = exports.DEFAULT_HRTIME = void 0;
// hrtime 変数の初期値
exports.DEFAULT_HRTIME = [-1, -1];
// ナノ秒をミリ秒に変換
function ConvertToMsFromNs(ns) {
    return Math.trunc(ns * 0.000001);
}
exports.ConvertToMsFromNs = ConvertToMsFromNs;
