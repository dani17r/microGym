/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e65hd8nn4w10t6v")

  collection.listRule = "@request.auth.verified = true && @collection.users.id = @request.auth.id\n"
  collection.viewRule = "@request.auth.verified = true && @collection.users.id = @request.auth.id\n"
  collection.createRule = "@request.auth.verified = true && @collection.users.id = @request.auth.id\n"
  collection.updateRule = "@request.auth.verified = true && @collection.users.id = @request.auth.id\n"
  collection.deleteRule = "@request.auth.verified = true && @collection.users.id = @request.auth.id\n"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e65hd8nn4w10t6v")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
