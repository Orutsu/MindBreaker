import { db, Task } from '../index'

/**
 * @param name  name of item
 * @param description  description of item
 * @param folderId id of parent folder. If 0 then root folder
 * @returns promise that takes id of inserted item as resolve param
 * @description lastDateLearned setted to NULL when inserting, learnedWithoutSkip to 0, isArchived to false
 * @example
 * insertItem("s", "ssss", 0).then((insertedId) => {
 *   console.log(insertedId)
 * })
 * @example
 * insertItem("s", "ssss", 3).then((insertedId) => {
 *   console.log(insertedId)
 * })
 */
const insertItem = (name: string, description: string, folderId: number) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx: { executeSql: (arg0: string, arg1: (string | number | null | false)[], arg2: (_: any, result: any) => void, arg3: (_: any, err: any) => boolean) => void }) => {
            tx.executeSql(
                "INSERT INTO items(name, description, folderId, lastDateLearned, learnedWithoutSkip, isArchived, isGoalForToday) VALUES(?, ?, ?, NULL, 0, ?, ?)",
                [name, description, folderId, false, false],
                (_: any, result: { insertId: unknown }) => {
                    resolve(result.insertId)
                },
                (_: any, err: any) => {
                    console.log(err)
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
 * await updateItemName(2, "55").then((isSuccess) => {
 *   console.log(isSuccess)
 * })
 * @example
 * await updateItemName(2, "55")
 */
const updateItemName = (id: number, name: string) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx: { executeSql: (arg0: string, arg1: (string | number)[], arg2: (_: any, result: any) => void, arg3: (_: any, err: any) => boolean) => void }) => {
            tx.executeSql(
                "UPDATE items SET name = ? WHERE id = ? ",
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
 * @param description description to set
 * @returns promise that takes boolean(isSuccess) as resolve param
 * @example
 * await updateItemDescription(2, "55").then((isSuccess) => {
 *   console.log(isSuccess)
 * })
 * @example
 * await updateItemDescription(2, "55")
 */
const updateItemDescription = (id: number, description: string) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx: { executeSql: (arg0: string, arg1: (string | number)[], arg2: (_: any, result: any) => void, arg3: (_: any, err: any) => boolean) => void }) => {
            tx.executeSql(
                "UPDATE items SET description = ? WHERE id = ? ",
                [description, id],
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
 * @param folderId folderId to set
 * @returns promise that takes boolean(isSuccess) as resolve param
 * @example
 * await updateItemFolderId(2, 55).then((isSuccess) => {
 *   console.log(isSuccess)
 * })
 * @example
 * await updateItemFolderId(2, 0)
 */
const updateItemFolderId = (id: number, folderId: number) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx: { executeSql: (arg0: string, arg1: (number)[], arg2: (_: any, result: any) => void, arg3: (_: any, err: any) => boolean) => void }) => {
            tx.executeSql(
                "UPDATE items SET folderId = ? WHERE id = ? ",
                [folderId, id],
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
 * @param id item id to update
 * @param isArchived isArchived to set
 * @returns promise that takes boolean(isSuccess) as resolve param
 * @example
 * await updateItemIsArchived(2, true).then((isSuccess) => {
 *   console.log(isSuccess)
 * })
 * @example
 * await updateItemIsArchived(2, false);
 */
const updateItemIsArchived = (id: number, isArchived: boolean) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx: { executeSql: (arg0: string, arg1: (number | boolean)[], arg2: (_: any, result: any) => void, arg3: (_: any, err: any) => boolean) => void }) => {
            tx.executeSql(
                "UPDATE items SET isArchived = ? WHERE id = ? ",
                [isArchived, id],
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

const updateItemIsGoalForToday = (id: number, isGoalForToday: boolean) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx: { executeSql: (arg0: string, arg1: (number | boolean)[], arg2: (_: any, result: any) => void, arg3: (_: any, err: any) => boolean) => void }) => {
            tx.executeSql(
                "UPDATE items SET isGoalForToday = ? WHERE id = ? ",
                [isGoalForToday, id],
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
 * @param lastDateLearned lastDateLearned to set
 * @returns promise that takes boolean(isSuccess) as resolve param
 * @example
 * await updateItemLastDateLearned(2, '2021-06-13').then((isSuccess) => {
 *   console.log(isSuccess)
 * })
 * @example
 * await updateItemLastDateLearned(2, '2021-06-15')
 */
const updateItemLastDateLearned = (id: number, lastDateLearned: string) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx: { executeSql: (arg0: string, arg1: (string | number)[], arg2: (_: any, result: any) => void, arg3: (_: any, err: any) => boolean) => void }) => {
            tx.executeSql(
                "UPDATE items SET lastDateLearned = ? WHERE id = ? ",
                [lastDateLearned, id],
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
 * @param learnedWithoutSkip lastDateLearned to set
 * @returns promise that takes boolean(isSuccess) as resolve param
 * @example
 * await updateItemLearnedWithoutSkip(2, 2).then((isSuccess) => {
 *   console.log(isSuccess)
 * })
 * @example
 * await updateItemLearnedWithoutSkip(2, 3)
 */
const updateItemLearnedWithoutSkip = (id: number, learnedWithoutSkip: number) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx: { executeSql: (arg0: string, arg1: number[], arg2: (_: any, result: any) => void, arg3: (_: any, err: any) => boolean) => void }) => {
            tx.executeSql(
                "UPDATE items SET learnedWithoutSkip = ? WHERE id = ? ",
                [learnedWithoutSkip, id],
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
 * @param id item id to delete
 * @returns promise that takes boolean(isSuccess) as resolve param
 * @example
 * await deleteItem(2).then((isSuccess) => {
 *   console.log(isSuccess)
 * })
 * @example
 * await deleteItem(2)
 */
const deleteItem = (id: number) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx: { executeSql: (arg0: string, arg1: number[], arg2: (_: any, result: any) => void, arg3: (_: any, err: any) => boolean) => void }) => {
            tx.executeSql(
                "DELETE FROM items WHERE id = ?",
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
 *     "name",
 *     "description",
 *     "folderId",
 *     "lastDateLearned",
 *     "learnedWithoutSkip"
 *   },
 *   ...
 * ]
 * @example
 * await selectItems().then((items) => {
 *   console.log(items)
 * })
 */
const selectItems = () => {
    const promise = new Promise((resolve: (items: Task[]) => void, reject) => {
        db.transaction((tx: { executeSql: (arg0: string, arg1: never[], arg2: (_: any, result: any) => void, arg3: (_: any, err: any) => boolean) => void }) => {
            tx.executeSql(
                "SELECT * FROM items",
                [],
                (_: any, result: { rows: { length: number; item: (arg0: number) => any } }) => {
                    let items = []
                    for (let i = 0; i < result.rows.length; ++i) {
                        let item = result.rows.item(i);
                        item.isArchived = item.isArchived == 1 ? true : false
                        item.isGoalForToday = item.isGoalForToday == 1 ? true : false
                        items.push(item);
                    }
                    resolve(items)
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
 * @param id item id to select
 * @returns promise that takes Array as resolve param
 * Object {
 *   "id",
 *   "name",
 *   "description",
 *   "folderId",
 *   "lastDateLearned",
 *   "learnedWithoutSkip"
 * }
 * @example
 * selectItemById(2).then((item) => {
 *   console.log(item)
 * })
 */
const selectItemById = (id: number) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx: { executeSql: (arg0: string, arg1: number[], arg2: (_: any, result: any) => void, arg3: (_: any, err: any) => boolean) => void }) => {
            tx.executeSql(
                "SELECT * FROM items WHERE id = ?",
                [id],
                (_: any, result: { rows: { item: (arg0: number) => any } }) => {
                    let item = result.rows.item(0)
                    if (item != undefined) {
                        item.isArchived = item.isArchived == 1 ? true : false
                        item.isGoalForToday = item.isGoalForToday == 1 ? true : false
                    }
                    resolve(item)
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
 * @param folderId folder id to select items from it. If null then selects from root folder
 * @returns promise that takes Array as resolve param
 * Array [
 *   Object {
 *     "id",
 *     "name",
 *     "description",
 *     "folderId",
 *     "lastDateLearned",
 *     "learnedWithoutSkip"
 *   },
 *   ...
 * ]
 * @example
 * selectItemsFromFolder(2).then((items) => {
 *   console.log(items)
 * })
 */
const selectItemsFromFolder = (folderId: number) => {
    const promise = new Promise((resolve: (items: Task[]) => void, reject) => {
        db.transaction((tx: { executeSql: (arg0: string, arg1: (number)[], arg2: (_: any, result: any) => void, arg3: (_: any, err: any) => boolean) => void }) => {
            tx.executeSql(
                "SELECT * FROM items WHERE folderId = ?",
                [folderId],
                (_: any, result: { rows: { length: number; item: (arg0: number) => any } }) => {
                    let items = []
                    for (let i = 0; i < result.rows.length; ++i) {
                        let item = result.rows.item(i);
                        item.isArchived = item.isArchived == 1 ? true : false
                        item.isGoalForToday = item.isGoalForToday == 1 ? true : false
                        items.push(item);
                    }
                    resolve(items)
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

export {
    insertItem,
    updateItemName,
    updateItemDescription,
    updateItemFolderId,
    updateItemIsArchived,
    updateItemLastDateLearned,
    updateItemLearnedWithoutSkip,
    deleteItem,
    selectItems,
    selectItemById,
    selectItemsFromFolder,
};
