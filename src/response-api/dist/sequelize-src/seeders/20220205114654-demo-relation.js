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
const index_1 = __importDefault(require("@/sequelize-src/models/index"));
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            yield index_1.default.Users.findAll({}).then((rows) => {
                data = rows;
            });
            let now = new Date();
            return queryInterface.bulkInsert('Relations', [{
                    followedUserId: data[0].userId,
                    followingUserId: data[2].userId,
                    createdAt: now,
                }, {
                    followedUserId: data[1].userId,
                    followingUserId: data[2].userId,
                    createdAt: now,
                }]);
        });
    },
    down() {
        return __awaiter(this, void 0, void 0, function* () {
            yield index_1.default.Relations.destroy({
                truncate: true
            });
        });
    }
};
