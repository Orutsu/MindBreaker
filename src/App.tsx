import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import NavigationContainer from './screens/navigationContainer';

export default (): React.ReactFragment => (
  <>
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  </>
);
