module.exports = ({ name }) => ({
  errorOnDeprecated: true,
  globals: {
    'ts-jest': {
      tsConfig: './tests/tsconfig.json',
    },
  },
  moduleNameMapper: {
    [`${name}`]: '<rootDir>/src',
    [`${name}/dist/(.*)`]: '<rootDir>/src/$1',
  },
  rootDir: '.',
  testMatch: [
    '<rootDir>/tests/**/*.test.ts',
  ],
  preset: 'ts-jest',
});
