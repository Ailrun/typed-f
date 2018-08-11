module.exports = {
  errorOnDeprecated: true,
  globals: {
    'ts-jest': {
      tsConfigFile: './config/tsconfig/tsconfig.test.json',
    },
  },
  moduleFileExtensions: [
    'js', 'jsx', 'json', 'ts', 'tsx',
  ],
  moduleNameMapper: {
    '\\$/(.*)': '<rootDir>/src/$1',
  },
  rootDir: '../../',
  testMatch: [
    '<rootDir>/test/behaviour/**/*.test.ts',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
