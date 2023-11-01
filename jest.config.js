/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    'jest-localstorage-mock'
  ],
  collectCoverage: true,
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '\\.(jpg|jpeg|png||svg|ttf|woff|woff2)$':
      '<rootDir>/fileTransformer.js',
  },
};
