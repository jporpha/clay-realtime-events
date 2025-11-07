import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  clearMocks: true,
  roots: [
    '<rootDir>/apps/api/src',
    '<rootDir>/apps/worker/src',
    '<rootDir>/packages/shared/src',
  ],
  testMatch: ['**/?(*.)+(spec|test).[tj]s'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
  },
  moduleNameMapper: {
    '^shared/(.*)$': '<rootDir>/packages/shared/src/$1',
  },
};

export default config;
