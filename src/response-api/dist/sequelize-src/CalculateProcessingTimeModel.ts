"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class CalculateProcessingTimeModel extends sequelize_1.Model {
    constructor(values, options) {
        super(values, options);
    }
    static async calculateTimeOfCreate(time_keeper, values, options) {
        return await time_keeper.calculateProcessingTime(() => { return super.create.bind(this)(values, options); }, { state: "Success", name: "Create", target_table: this.name });
    }
    static async calculateTimeOfFindAll(time_keeper, options) {
        return await time_keeper.calculateProcessingTime(() => { return super.findAll.bind(this)(options); }, { state: "Success", name: "Read", target_table: this.name });
    }
    static async calculateTimeOfUpdate(time_keeper, values, options) {
        return await time_keeper.calculateProcessingTime(() => { return super.update.bind(this)(values, options); }, { state: "Success", name: "Update", target_table: this.name });
    }
    static async calculateTimeOfDelete(time_keeper, options) {
        return await time_keeper.calculateProcessingTime(() => { return super.destroy.bind(this)(options); }, { state: "Success", name: "Delete", target_table: this.name });
    }
}
exports.default = CalculateProcessingTimeModel;
