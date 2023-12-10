/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5cq6zoaulsjg1mz")

  collection.viewRule = "@request.auth.verified = true && @collection.users.id = @request.auth.id"
  collection.createRule = "@request.auth.verified = true && @collection.users.id = @request.auth.id"
  collection.updateRule = "@request.auth.verified = true && @collection.users.id = @request.auth.id"
  collection.deleteRule = "@request.auth.verified = true && @collection.users.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5cq6zoaulsjg1mz")

  collection.viewRule = "@collection.users.id = @request.auth.id"
  collection.createRule = "@request.auth.verified = true"
  collection.updateRule = "@request.auth.verified = true"
  collection.deleteRule = "@request.auth.verified = true"

  return dao.saveCollection(collection)
})
