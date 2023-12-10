/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5cq6zoaulsjg1mz")

  collection.listRule = "@collection.users.id = @request.auth.id"
  collection.viewRule = "@collection.users.id = @request.auth.id"
  collection.createRule = "@request.auth.verified = true"
  collection.updateRule = "@request.auth.verified = true"
  collection.deleteRule = "@request.auth.verified = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5cq6zoaulsjg1mz")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
