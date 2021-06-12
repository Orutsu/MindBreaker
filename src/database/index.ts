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
    db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE IF EXISTS foldersTree",
        [],
        (_, result) => {
          resolve("FoldersTree table dropped")
        },
        (_, err) => {
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
    db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE IF EXISTS items",
        [],
        (_, result) => {
          resolve("Items table dropped")
        },
        (_, err) => {
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
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS foldersTree (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, locationId INTEGER, FOREIGN KEY(locationId) REFERENCES foldersTree(id))",
        [],
        (_, result) => {
          resolve("FoldersTree table created")
        },
        (_, err) => {
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
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, description TEXT, isArchived BOOLEAN NOT NULL, folderId INTEGER, lastDateLearned DATE, learnedWithoutSkip number NOT NULL, FOREIGN KEY(folderId) REFERENCES foldersTree(id))",
        [],
        (_, result) => {
          resolve("Items table created")
        },
        (_, err) => {
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

let item: {
  id: number,
  name: string,
  description: string,
  folderId: number | null,
  isArchived: boolean,
  lastDateLearned: string, // 'yyyy-mm-dd'
  learnedWithoutSkip: number
}

let folder: {
  id: number,
  name: string,
  locationId: number | null,
}


export {
  db,
  initDatabase,
};