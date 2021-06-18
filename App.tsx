import React from 'react';
import { Provider } from 'react-redux';
import NavigationContainer from './src/screens/navigationContainer';
import { initDatabase } from './src/database/index'
import { insertRootFolder } from './src/database/actions/foldersTree'
import { useState, useEffect } from 'react';
import * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications'


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

        Permissions.getAsync(Permissions.NOTIFICATIONS).then(statusObj => {
            if (statusObj.status !== 'granted') {
                return Permissions.askAsync(Permissions.NOTIFICATIONS);
            }
            return statusObj
        }).then(statusObj => {
            if (statusObj?.status !== 'granted') {
                alert('You such a bitch')
            }
        })
    }, [])

    if (initializedDb && initializedRootFolder) {
        return <>
            <NavigationContainer />
        </>
    }
    return null;
}

