module.exports = {
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
      'axios': 'axios/dist/node/axios.cjs',

    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    transform: {
      '^.+\\.jsx?$': 'babel-jest'
    },
    testEnvironment: "jsdom",
  };
  
  // transformIgnorePatterns: [
  //   'node_modules/(?!(@react)/)',
  // ],