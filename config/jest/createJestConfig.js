module.exports = ({ name }) => ({
  errorOnDeprecated: true,
  globals: {
    'ts-jest': {
      tsConfigFile: './tsconfig.json',
    },
  },
  moduleFileExtensions: [
    'js', 'jsx', 'json', 'ts', 'tsx',
  ],
  moduleNameMapper: {
    [`${name}`]: '<rootDir>/src',
    [`${name}/dist/(.*)`]: '<rootDir>/src/$1',
  },
  rootDir: '.',
  testMatch: [
    '<rootDir>/tests/**/*.test.ts',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
});
