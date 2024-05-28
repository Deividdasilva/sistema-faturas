// module.exports = {
//     preset: 'ts-jest',
//     testEnvironment: 'node',
//     setupFilesAfterEnv: ['./jest.setup.ts'],  // Caminho para o arquivo de setup
//     roots: ['<rootDir>/src'],
//     testMatch: ['**/?(*.)+(spec|test).ts'],
//     moduleNameMapper: {
//       '^@/(.*)$': '<rootDir>/src/$1'
//     }
//   };
  
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"],
//   testMatch: [
//     "**/__tests__/**/*.[jt]s?(x)",
//     "**/?(*.)+(spec|test).[tj]s?(x)",
//     "**/tests/**/*.[jt]s?(x)"  // Este padrão deve capturar seu arquivo de teste
//   ],
//   globals: {
//     'ts-jest': {
//       tsconfig: '<rootDir>/../tsconfig.json'
//     }
//   }
// };

// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
//   testMatch: [
//     "**/__tests__/**/*.[jt]s?(x)",
//     "**/?(*.)+(spec|test).[tj]s?(x)",
//     "**/tests/**/*.[jt]s?(x)"
//   ],
//   transform: {
//     "^.+\\.(t|j)sx?$": ["ts-jest", {
//       tsconfig: '<rootDir>/../tsconfig.json'
//     }]
//   }
// };

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"], // Caminho atualizado
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)",
    "**/tests/**/*.[jt]s?(x)"
  ],
  transform: {
    "^.+\\.(t|j)sx?$": ["ts-jest", {
      tsconfig: '<rootDir>/tsconfig.json' // Assegure-se de que este caminho também esteja correto
    }]
  }
};
