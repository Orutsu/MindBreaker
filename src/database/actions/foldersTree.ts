import { db } from '../index'

/**
 * @param name  name of folder
 * @param locationId id of parent folder. If null then root folder
 * @returns promise that takes id of inserted folder as resolve param
 * @description isArchived setted to false when inserting
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
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO foldersTree(name, locationId, isArchived) VALUES(?, ?, false)",
        [name, locationId],
        (_, result) => {
          resolve(result.insertId)
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
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE foldersTree SET name = ? WHERE id = ? ",
        [name, id],
        (_, result) => {
          resolve(result.rowsAffected === 1)
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
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE foldersTree SET locationId = ? WHERE id = ? ",
        [locationId, id],
        (_, result) => {
          resolve(result.rowsAffected === 1)
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

/**
 * @param id folder id to update
 * @param locationId locationId to set
 * @returns promise that takes boolean(isSuccess) as resolve param
 * @example
 * await updateFolderIsArchived(2, true).then((isSuccess) => {
 *   console.log(isSuccess)
 * })
 * @example
 * await updateFolderIsArchived(2, false);
 */
const updateFolderIsArchived = (id: number, isArchived: boolean) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE foldersTree SET isArchived = ? WHERE id = ? ",
        [isArchived, id],
        (_, result) => {
          resolve(result.rowsAffected === 1)
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
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM foldersTree WHERE id = ?",
        [id],
        (_, result) => {
          resolve(result.rowsAffected === 1)
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
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM foldersTree",
        [],
        (_, result) => {
          let folders = []
          for (let i = 0; i < result.rows.length; ++i) {
            let folder = result.rows.item(i);
            folder.isArchived = folder.isArchived == 1 ? true : false
            folders.push(folder);
          }
          resolve(folders)
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
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM foldersTree WHERE id = ?",
        [id],
        (_, result) => {
          let folder = result.rows.item(0);
          if (folder != undefined) {
            folder.isArchived = folder.isArchived == 1 ? true : false
          }
          resolve(folder)
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
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM foldersTree " + whereContition,
        [locationId],
        (_, result) => {
          let folders = []
          for (let i = 0; i < result.rows.length; ++i) {
            let folder = result.rows.item(i);
            folder.isArchived = folder.isArchived == 1 ? true : false
            folders.push(folder);
          }
          resolve(folders)
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


export {
  insertFolder,
  updateFolderName,
  updateFolderLocation,
  updateFolderIsArchived,
  deleteFolder,
  selectFolders,
  selectFolderById,
  selectFoldersByLocation
};

