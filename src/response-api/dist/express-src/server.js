"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../express-src/app"));
const checkCommunicationPossible_1 = require("../express-src/checkCommunicationPossible");
const WriteProcessingTimeLog_1 = __importDefault(require("../express-src/modules/processingLogStore/writeLogs/WriteProcessingTimeLog"));
WriteProcessingTimeLog_1.default.reservWriteLog();
app_1.default.listen(8000, async () => {
    await (0, checkCommunicationPossible_1.checkCommunicationPossible)();
    console.log('listening on port 8000!');
});
