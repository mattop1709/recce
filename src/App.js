import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import configStore from './redux/config';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import Main from './screens/main';

const App = () => {
  return (
    <Provider {...{ store: configStore() }}>
      <SafeAreaView {...{ style: { backgroundColor: Colors.white, flex: 1 } }}>
        <StatusBar {...{ barStyle: 'dark-content' }} />
        <Main />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
