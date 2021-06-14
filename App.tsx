import React from 'react';
import { Provider } from 'react-redux';
import NavigationContainer from './src/screens/navigationContainer';
import { initDatabase } from './src/database/index'
import { insertRootFolder } from './src/database/actions/foldersTree'

initDatabase()
insertRootFolder()

export default (): React.ReactFragment => (
  <>
      <NavigationContainer />
  </>
);

