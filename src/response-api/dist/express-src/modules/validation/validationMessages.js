"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APPMSG = void 0;
exports.APPMSG = {
    User: {
        require: {
            userId: "UserID is a required field",
            firstName: "FirstName is a required field",
            lastName: "LastName is a required field",
            email: "E-mail is a required field",
        },
        regular: {
            userId: "UserID is a number",
            email: "The format of the E-mail is incorrect",
        },
        unique: {
            email: "The E-mail already exists"
        }
    },
    Group: {
        require: {
            groupId: "GroupID is a required field",
            groupName: "GroupName is a required field",
        },
        regular: {
            groupId: "GroupID is a number",
        },
    },
    Follows: {
        require: {
            followedUserId: "followedUserId is a required field",
            followerUserId: "followerUserId is a required field",
        },
        regular: {
            followedUserId: "followedUserId is a number",
            followerUserId: "followerUserId is a number",
        },
    },
    General: {
        notEvenTheMinimum: "could not find parameter to update",
        directoryNotFound: "The directory not found",
    },
};
