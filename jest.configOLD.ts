import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  clearMocks: true,
  // Rutas base de tu monorepo
  roots: [
    '<rootDir>/apps/api/src',
    '<rootDir>/apps/worker/src',
    '<rootDir>/packages/shared/src',
  ],
  // Archivos de test
  testMatch: ['**/?(*.)+(spec|test).[tj]s'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  // Transpilación TS
  transform: {
    '^.+\\.ts$': ['ts-jest', { isolatedModules: true }],
  },
  // Ignorar compilaciones y dependencias
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],
  moduleNameMapper: {
    // Permitir imports absolutos si algún paquete lo usa
    '^@shared/(.*)$': '<rootDir>/packages/shared/src/$1',
  },
  // Limpiar cache de mocks entre tests
  resetMocks: true,
  restoreMocks: true,

  globals: {
  'ts-jest': {
    tsconfig: 'tsconfig.jest.json',
  },
},
};

export default config;
