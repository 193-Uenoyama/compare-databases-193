"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCommunicationPossible = void 0;
const defineSequelize_1 = require("../sequelize-src/defineSequelize");
async function checkCommunicationPossible() {
    // shellでdockerの操作を自動化するため、
    // データベースと通信が可能になったかの判定に必要。
    // (mariadbなどはコンテナが立ち上がってもすぐには通信ができない。)
    let i = 0;
    const checkCommunicationInterval = setInterval(async () => {
        if (i >= 60) {
            console.log('time out...');
            clearInterval(checkCommunicationInterval);
            return;
        }
        try {
            await defineSequelize_1.sequelize.authenticate();
            console.log('Ready to go communication to database');
            clearInterval(checkCommunicationInterval);
            return;
        }
        catch (err) {
            console.log('not yet');
        }
        i++;
    }, 1000);
}
exports.checkCommunicationPossible = checkCommunicationPossible;
