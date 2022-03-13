"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../express-src/app"));
const WriteProcessingTimeLog_1 = __importDefault(require("../express-src/modules/writeLogs/WriteProcessingTimeLog"));
WriteProcessingTimeLog_1.default.reservWriteLog();
app_1.default.listen(8000, () => console.log('listening on port 8000!'));
