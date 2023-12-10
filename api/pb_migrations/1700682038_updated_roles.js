/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5cq6zoaulsjg1mz")

  collection.listRule = "@request.auth.verified = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5cq6zoaulsjg1mz")

  collection.listRule = "@collection.users.id = @request.auth.id"

  return dao.saveCollection(collection)
})
