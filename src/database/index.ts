import * as SQLite from 'expo-sqlite';

// when app is installed db is created. Next lounch time we are connecting to existing db
const db = SQLite.openDatabase('MindBreaker.db');


const activateForeignKeys = () => {
  const promise = new Promise((resolve, reject) => {
    db.exec(
      [{ sql: 'PRAGMA foreign_keys = ON;', args: [] }],
      false,
      () => resolve('Foreign keys turned on'),
    );
  })
  return promise
}


const dropFoldersTreeTable = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx: { executeSql: (arg0: string, arg1: never[], arg2: (_: any, result: any) => void, arg3: (_: any, err: any) => boolean) => void; }) => {
      tx.executeSql(
        "DROP TABLE IF EXISTS foldersTree",
        [],
        (_: any, result: any) => {
          resolve("FoldersTree table dropped")
        },
        (_: any, err: any) => {
          reject(err)
          return false
        }
      )
    })
  })
  return promise
}

const dropItemsTable = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx: { executeSql: (arg0: string, arg1: never[], arg2: (_: any, result: any) => void, arg3: (_: any, err: any) => boolean) => void; }) => {
      tx.executeSql(
        "DROP TABLE IF EXISTS items",
        [],
        (_: any, result: any) => {
          resolve("Items table dropped")
        },
        (_: any, err: any) => {
          reject(err)
          return false
        }
      )
    })
  })
  return promise
}

const createFoldersTreeTable = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx: { executeSql: (arg0: string, arg1: never[], arg2: (_: any, result: any) => void, arg3: (_: any, err: any) => boolean) => void; }) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS foldersTree (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, locationId INTEGER, FOREIGN KEY(locationId) REFERENCES foldersTree(id))",
        [],
        (_: any, result: any) => {
          resolve("FoldersTree table created")
        },
        (_: any, err: any) => {
          reject(err)
          return false
        }
      )
    })
  })
  return promise
}

const createItemsTable = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx: { executeSql: (arg0: string, arg1: never[], arg2: (_: any, result: any) => void, arg3: (_: any, err: any) => boolean) => void; }) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, description TEXT, isArchived BOOLEAN NOT NULL, folderId INTEGER, lastDateLearned DATE, learnedWithoutSkip number NOT NULL, FOREIGN KEY(folderId) REFERENCES foldersTree(id))",
        [],
        (_: any, result: any) => {
          resolve("Items table created")
        },
        (_: any, err: any) => {
          reject(err)
          return false
        }
      )
    })
  })
  return promise
}

const initDatabase = async () => {
  await activateForeignKeys().then((info) => {
    console.log(info)
  });
  
  // await dropFoldersTreeTable().then((info) => {
  //   console.log(info)
  // });
  // await dropItemsTable().then((info) => {
  //   console.log(info)
  // });
  await createFoldersTreeTable().then((info) => {
    console.log(info)
  });
  await createItemsTable().then((info) => {
    console.log(info)
  });

}

export type Task = {
  id: number,
  name: string,
  description: string,
  folderId: number,
  isArchived: boolean,
  lastDateLearned: string, // 'yyyy-mm-dd'
  learnedWithoutSkip: number
}

export type Folder = {
  id: number,
  name: string,
  locationId: number,
}

export {
  db,
  initDatabase,
};