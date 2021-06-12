import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import NavigationContainer from './src/screens/navigationContainer';
import { initDatabase } from './src/database/index'

initDatabase()

export default (): React.ReactFragment => (
  <>
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  </>
);

