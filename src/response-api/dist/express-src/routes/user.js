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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("@/sequelize-src/models/index"));
const TimeKeeper_1 = __importDefault(require("@/express-src/modules/write_logs/TimeKeeper"));
exports.userRouter = express_1.default.Router();
exports.userRouter.get('/', function (req, res, next) {
    let return_data = {};
    let time_keeper = new TimeKeeper_1.default();
    create_users(1);
    find_all_users(time_keeper)
        .then((all_users) => {
        res.status(200).json(all_users);
        time_keeper.StoreNodeEnd_IfPossibleOutLog();
    })
        .catch((err) => {
        res.status(500).json({ msg: err, mymsg: 'えらーだよ' });
    });
});
/**
 * insert a randomly named user into the user table in amount of "size" param
 * @param size number of inserts into users table
 */
function create_users(size) {
    for (let i = 0; i < size; i++) {
        let firstName = Math.random().toString(32).substring(2);
        let lastName = Math.random().toString(32).substring(2);
        let email = Math.random().toString(32).substring(2);
        index_1.default.Users.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {});
    }
}
/**
 *
 */
// TODO why return promise?
function find_all_users(time_keeper) {
    return __awaiter(this, void 0, void 0, function* () {
        let all_users;
        yield index_1.default.Users.findAll({})
            .then((instances) => {
            all_users = instances;
            time_keeper.StoreDbEnd_IfPossibleOutLog();
        })
            // TODO err の型調べる
            .catch((err) => {
            console.log(err);
            throw new Error("エラーだよ。");
        });
        return all_users;
    });
}
