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
exports.psqlRouter = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../../sequelize/models/index"));
exports.psqlRouter = express_1.default.Router();
exports.psqlRouter.get('/', function (req, res, next) {
    create_users(1);
    console.log(find_all_users().then((all_users) => {
        return all_users;
    }));
    res.status(200).json(find_all_users().then((all_users) => {
        return all_users;
    }));
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
function find_all_users() {
    return __awaiter(this, void 0, void 0, function* () {
        let all_users;
        all_users = yield index_1.default.Users.findAll({}).then((instances) => {
            return instances;
        });
        return all_users;
    });
}
