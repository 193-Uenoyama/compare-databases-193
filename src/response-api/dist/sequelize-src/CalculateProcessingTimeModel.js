"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const TimeKeeper_1 = __importDefault(require("../express-src/modules/writeLogs/TimeKeeper"));
class CalculateProcessingTimeModel extends sequelize_1.Model {
    constructor(values, options) {
        super(values, options);
    }
    static async calculateTimeOfCreate(req_log_detail, values, options) {
        return await TimeKeeper_1.default.calculateProcessingTime(() => { return super.create.bind(this)(values, options); }, req_log_detail, { state: "Success", name: "Create", target_table: this.name });
    }
    static async calculateTimeOfFindAll(req_log_detail, options) {
        return await TimeKeeper_1.default.calculateProcessingTime(() => { return super.findAll.bind(this)(options); }, req_log_detail, { state: "Success", name: "Read", target_table: this.name });
    }
    static async calculateTimeOfUpdate(req_log_detail, values, options) {
        return await TimeKeeper_1.default.calculateProcessingTime(() => { return super.update.bind(this)(values, options); }, req_log_detail, { state: "Success", name: "Update", target_table: this.name });
    }
    static async calculateTimeOfDelete(req_log_detail, options) {
        return await TimeKeeper_1.default.calculateProcessingTime(() => { return super.destroy.bind(this)(options); }, req_log_detail, { state: "Success", name: "Delete", target_table: this.name });
    }
}
exports.default = CalculateProcessingTimeModel;
