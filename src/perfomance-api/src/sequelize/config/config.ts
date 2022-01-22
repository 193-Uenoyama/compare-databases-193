module.exports = {
  development: {
    username: "root",
    password: "password",
    database: "database",
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_SYSTEM
  },
  production: {
    username: "root",
    password: "password",
    database: "database",
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_SYSTEM
  }
};
