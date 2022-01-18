module.exports = {
  preset: 'react-native',

  /* add due to facilitate testing for navigation */
  timers: 'fake',
  testEnvironment: 'jsdom',

  /* add this if error show unexpected token from jest */
  transformIgnorePatterns: [
    `node_modules/(?!@react-native|react-native|@react-navigation)`,
  ],
};
