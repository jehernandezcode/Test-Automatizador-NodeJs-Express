module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  coverageDirectory: './coverage',
  collectCoverageFrom: ['src/**/*.{ts,js}', '!src/**/*.d.ts'],
  setupFiles: ['<rootDir>/tests/setupEnv.ts'],
};
