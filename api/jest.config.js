module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"],
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)",
    "**/tests/**/*.[jt]s?(x)"
  ],
  transform: {
    "^.+\\.(t|j)sx?$": ["ts-jest", {
      tsconfig: '<rootDir>/tsconfig.json'
    }]
  }
};
