/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "^@errors(.*)$": "<rootDir>/src/errors$1",
    "^@utils(.*)$": "<rootDir>/src/utils$1",
    "^@nodes(.*)$": "<rootDir>/src/nodes$1",
  }
};