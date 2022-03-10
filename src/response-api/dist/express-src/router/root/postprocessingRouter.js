"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postprocessingRouter = void 0;
const express_1 = require("express");
exports.postprocessingRouter = (0, express_1.Router)();
exports.postprocessingRouter.use('/', function (req, res, next) {
    if (res.statusCode == 200) {
        req.time_keeper.invokeWriter({ state: "Success", name: "Node" });
        return;
    }
    else {
        req.time_keeper.invokeWriter({ state: "Error", name: "Node" });
        return;
    }
});
