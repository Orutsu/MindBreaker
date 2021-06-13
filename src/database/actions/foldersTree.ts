import { db, Folder } from '../index'

/**
 * @param name  name of folder
 * @param locationId id of parent folder. If null then root folder
 * @returns promise that takes id of inserted folder as resolve param
 * @example
 * await insertFolder('suka4', null).then((insertedId) => {
 *   console.log(insertedId)
 * })
 * @example
 * await insertFolder('suka4', 3).then((insertedId) => {
 *   console.log(insertedId)
 * })
 */
const insertFolder = (name: string, locationId: number | null) => {
  const promise = new Promise((resolve: (id: number) => void, reject) => {
    db.transaction((tx: { executeSql: (arg0: string, arg1: (string | number | null)[], arg2: (_: any, result: any) => void, arg3: (_: any, err: any) => boolean) => void }) => {
      tx.executeSql(
        "INSERT INTO foldersTree(name, locationId) VALUES(?, ?)",
        [name, locationId],
        (_: any, result: { insertId: number }) => {
          resolve(result.insertId)
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

/**
 * @param id folder id to update
 * @param name name to set
 * @returns promise that takes boolean(isSuccess) as resolve param
 * @example
 * await updateFolderName(2, "55").then((isSuccess) => {
 *   console.log(isSuccess)
 * })
 * @example
 * await updateFolderName(2, "55")
 */
const updateFolderName = (id: number, name: string) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx: { executeSql: (arg0: string, arg1: (string | number)[], arg2: (_: any, result: any) => void, arg3: (_: any, err: any) => boolean) => void }) => {
      tx.executeSql(
        "UPDATE foldersTree SET name = ? WHERE id = ? ",
        [name, id],
        (_: any, result: { rowsAffected: number }) => {
          resolve(result.rowsAffected === 1)
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

/**
 * @param id folder id to update
 * @param locationId locationId to set
 * @returns promise that takes boolean(isSuccess) as resolve param
 * @example
 * await updateFolderLocation(2, null).then((isSuccess) => {
 *   console.log(isSuccess)
 * })
 * @example
 * await updateFolderLocation(2, 1);
 */
const updateFolderLocation = (id: number, locationId: number | null) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx: { executeSql: (arg0: string, arg1: (number | null)[], arg2: (_: any, result: any) => void, arg3: (_: any, err: any) => boolean) => void }) => {
      tx.executeSql(
        "UPDATE foldersTree SET locationId = ? WHERE id = ? ",
        [locationId, id],
        (_: any, result: { rowsAffected: number }) => {
          resolve(result.rowsAffected === 1)
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

/**
 * @param id folder id to delete
 * @returns promise that takes boolean(isSuccess) as resolve param
 * @example
 * await deleteFolder(2).then((isSuccess) => {
 *   console.log(isSuccess)
 * })
 * @example
 * await deleteFolder(2)
 */
const deleteFolder = (id: number) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx: { executeSql: (arg0: string, arg1: number[], arg2: (_: any, result: any) => void, arg3: (_: any, err: any) => boolean) => void }) => {
      tx.executeSql(
        "DELETE FROM foldersTree WHERE id = ?",
        [id],
        (_: any, result: { rowsAffected: number }) => {
          resolve(result.rowsAffected === 1)
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

/**
 * @returns promise that takes Array as resolve param
 * Array [
 *   Object {
 *     "id",
 *     "locationId",
 *     "name"
 *   },
 *   ...
 * ]
 * @example
 * await selectFolders(2).then((folders) => {
 *   console.log(folders)
 * })
 */
const selectFolders = () => {
  const promise = new Promise((resolve: (folders: Folder[]) => void, reject) => {
    db.transaction((tx: { executeSql: (arg0: string, arg1: never[], arg2: (_: any, result: any) => void, arg3: (_: any, err: any) => boolean) => void }) => {
      tx.executeSql(
        "SELECT * FROM foldersTree",
        [],
        (_: any, result: { rows: { length: number; item: (arg0: number) => any } }) => {
          let folders = []
          for (let i = 0; i < result.rows.length; ++i) {
            let folder = result.rows.item(i);
            folders.push(folder);
          }
          resolve(folders)
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

/**
 * @param id folder id to select
 * @returns promise that takes object as resolve param
 * Object {
 *   "id",
 *   "locationId",
 *   "name"
 * }
 * @example
 * await selectFolderById(2).then((folder) => {
 *   console.log(folder)
 * })
 */
function selectFolderById(id: number) {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx: { executeSql: (arg0: string, arg1: number[], arg2: (_: any, result: any) => void, arg3: (_: any, err: any) => boolean) => void }) => {
      tx.executeSql(
        "SELECT * FROM foldersTree WHERE id = ?",
        [id],
        (_: any, result: { rows: { item: (arg0: number) => any } }) => {
          let folder = result.rows.item(0);
          resolve(folder)
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

/**
 * @param locationId parent id to select children from it. If null then selects from root folder
 * @returns promise that takes Array as resolve param
 * Array [
 *   Object {
 *     "id",
 *     "locationId",
 *     "name"
 *   },
 *   ...
 * ]
 * @example
 * await selectFoldersByLocation(2).then((folders) => {
 *   console.log(folders)
 * })
 * @example
 * await selectFoldersByLocation(null).then((folders) => {
 *   console.log(folders)
 * })
 */
function selectFoldersByLocation(locationId: number | null) {
  const whereContition = locationId == null ? "WHERE locationId IS NULL" : "WHERE locationId = ?"
  const promise = new Promise((resolve: (folders: Folder[]) => void, reject) => {
    db.transaction((tx: { executeSql: (arg0: string, arg1: (number | null)[], arg2: (_: any, result: any) => void, arg3: (_: any, err: any) => boolean) => void }) => {
      tx.executeSql(
        "SELECT * FROM foldersTree " + whereContition,
        [locationId],
        (_: any, result: { rows: { length: number; item: (arg0: number) => any } }) => {
          let folders = []
          for (let i = 0; i < result.rows.length; ++i) {
            let folder = result.rows.item(i);
            folders.push(folder);
          }
          resolve(folders)
        },
        (_: any, err: any) => {
          reject(err)
          console.log('ssssss')
          return false
        }
      )
    })
  })
  return promise
}


export {
  insertFolder,
  updateFolderName,
  updateFolderLocation,
  deleteFolder,
  selectFolders,
  selectFolderById,
  selectFoldersByLocation
};

