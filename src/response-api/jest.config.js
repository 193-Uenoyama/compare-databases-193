/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: "./src/",

  // reactの方でmodulesをインストールすると動かなくなる
  // moduleNameMapper: {
  //   "@/(.*)": "src/$1"
  // },
  moduleNameMapper: {
    "@/(.*)": "/home/response-api/src/$1"
  },
  resolver: undefined
};
