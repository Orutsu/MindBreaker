import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import NavigationContainer from './src/screens/navigationContainer';

export default (): React.ReactFragment => (
  <>
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  </>
);

