"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const TimeKeeper_1 = __importDefault(require("@/express-src/modules/write_logs/TimeKeeper"));
class CalculateProcessingTimeModel extends sequelize_1.Model {
    constructor(values, options) {
        super(values, options);
    }
    static create(values, options) {
        const _super = Object.create(null, {
            create: { get: () => super.create }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.create.bind(this)(values, options);
        });
    }
    static findAll(options) {
        const _super = Object.create(null, {
            findAll: { get: () => super.findAll }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let time_keeper = new TimeKeeper_1.default();
            let value = yield _super.findAll.bind(this)(options);
            time_keeper.invokeWriter({ state: "Success", name: "Read", target_table: "Users" });
            return value;
        });
    }
    static update(values, options) {
        const _super = Object.create(null, {
            update: { get: () => super.update }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.update.bind(this)(values, options);
        });
    }
}
exports.default = CalculateProcessingTimeModel;
