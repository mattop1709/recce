module.exports = {
  preset: 'react-native',

  /* add due to facilitate testing for navigation */
  timers: 'fake',
  testEnvironment: 'jsdom',

  /* all mocking inside this setup */
  setupFiles: ['./src/services/jest.setup.js'],

  /* add this if error show unexpected token from jest */
  transformIgnorePatterns: [
    `node_modules/(?!@react-native|react-native|@react-navigation)`,
  ],

  setupFilesAfterEnv: ['@react-native-mapbox-gl/maps/setup-jest'],
};
