import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import configStore from './redux/config';

import Main from './screens/main';

const App = () => {
  return (
    <Provider {...{ store: configStore() }}>
      <StatusBar {...{ barStyle: 'dark-content' }} />
      <Main />
    </Provider>
  );
};

export default App;
