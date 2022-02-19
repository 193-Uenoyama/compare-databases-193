"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cutUndefinedOutOfAnArgument = void 0;
function cutUndefinedOutOfAnArgument(argument) {
    for (const key in argument) {
        if (argument[key] === undefined) {
            delete argument[key];
        }
    }
    return argument;
}
exports.cutUndefinedOutOfAnArgument = cutUndefinedOutOfAnArgument;
