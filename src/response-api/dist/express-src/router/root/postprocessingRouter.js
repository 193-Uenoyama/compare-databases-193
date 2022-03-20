"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postprocessingRouter = void 0;
const express_1 = require("express");
exports.postprocessingRouter = (0, express_1.Router)();
exports.postprocessingRouter.use('/', function (req, res, next) {
    console.log(res.statusCode);
    if (res.statusCode == 200 || res.statusCode == 304) {
        req
            .process_logging
            .time_keeper
            .invokeWriter({ state: "Success", name: "Node" });
        return;
    }
    else {
        req
            .process_logging
            .time_keeper
            .invokeWriter({ state: "Error", name: "Node" });
        next();
        return;
    }
});
