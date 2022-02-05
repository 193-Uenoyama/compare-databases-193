"use strict";
module.exports = {
    development: {
        username: "root",
        password: "password",
        database: "database",
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_SYSTEM,
        timezone: '+09:00'
    },
    test: {
        username: "root",
        password: "password",
        database: "database",
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_SYSTEM,
        timezone: '+09:00'
    },
    production: {
        username: "root",
        password: "password",
        database: "database",
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_SYSTEM,
        timezone: '+09:00'
    }
};
