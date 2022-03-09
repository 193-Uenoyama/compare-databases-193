"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandleRouter = void 0;
const express_1 = require("express");
exports.errorHandleRouter = (0, express_1.Router)();
exports.errorHandleRouter.use((err, req, res, next) => {
    console.log(err);
    let message = '500 server error : ' + req.path;
    console.log(message);
    res.status(500).json({ message: message });
    next();
    return;
});
exports.errorHandleRouter.use((req, res, next) => {
    let message = '404 notfound request : ' + req.path;
    console.log(message);
    res.status(404).json({ message: message });
    next();
    return;
});
