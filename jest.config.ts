/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,

  coverageProvider: 'v8',

  testMatch: [
    '**/__tests__/**/*.?([mc])[jt]s?(x)',
    '**/?(*.)+(spec|test).?([mc])[jt]s?(x)'
  ],

  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest'
  },
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  moduleNameMapper: {
    '^@app$': '<rootDir>/src/app',
    '^@app/(.*)$': '<rootDir>/src/app/$1',

    '^@layouts$': '<rootDir>/src/app/layouts',
    '^@layouts/(.*)$': '<rootDir>/src/app/layouts/$1',

    '^@router$': '<rootDir>/src/app/router',
    '^@router/(.*)$': '<rootDir>/src/app/router/$1',

    '^@assets$': '<rootDir>/src/assets',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',

    '^@pages$': '<rootDir>/src/pages',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',

    '^@widgets$': '<rootDir>/src/widgets',
    '^@widgets/(.*)$': '<rootDir>/src/widgets/$1',

    '^@api$': '<rootDir>/src/api',
    '^@api/(.*)$': '<rootDir>/src/api/$1',

    '^@hooks$': '<rootDir>/src/hooks',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',

    '^@stores$': '<rootDir>/src/stores',
    '^@stores/(.*)$': '<rootDir>/src/stores/$1',

    '^@shared$': '<rootDir>/src/shared',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',

    '^@components$': '<rootDir>/src/shared/components',
    '^@components/(.*)$': '<rootDir>/src/shared/components/$1',

    '^@constants$': '<rootDir>/src/shared/constants',
    '^@constants/(.*)$': '<rootDir>/src/shared/constants/$1',

    '^@types$': '<rootDir>/src/shared/types',
    '^@types/(.*)$': '<rootDir>/src/shared/types/$1',

    '^@helpers$': '<rootDir>/src/shared/helpers',
    '^@helpers/(.*)$': '<rootDir>/src/shared/helpers/$1',

    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',

    '^.+\\.svg\\?react$': '<rootDir>/src/test/__mocks__/svgMock.tsx',
    '^.+\\.(png|jpg|jpeg|gif|webp)$': 'jest-transform-stub',
    '^.+\\.svg$': '<rootDir>/src/test/__mocks__/svgMock.tsx'
  }
};

export default config;
