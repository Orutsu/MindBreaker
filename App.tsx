import React from 'react';
import { Provider } from 'react-redux';
import NavigationContainer from './src/screens/navigationContainer';
import { initDatabase } from './src/database/index'
import { insertRootFolder } from './src/database/actions/foldersTree'
import { useState, useEffect } from 'react';


export default (): React.ReactFragment => {
  const [initializedDb, setinItializedDb] = useState(false)
  const [initializedRootFolder, setInitializedRootFolder] = useState(false)
  useEffect(() => {

    initDatabase().then(() => {
      setinItializedDb(true)

      insertRootFolder().then(() => {
        setInitializedRootFolder(true)
      })
    })
  }, [])

  if (initializedDb && initializedRootFolder) {
    return <>
      <NavigationContainer />
    </>
  }
  return null;
}

