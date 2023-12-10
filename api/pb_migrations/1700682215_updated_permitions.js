/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("08rxm48ld1c3q9m")

  collection.listRule = "@request.auth.verified = true && @collection.users.id = @request.auth.id"
  collection.viewRule = "@request.auth.verified = true && @collection.users.id = @request.auth.id"
  collection.createRule = "@request.auth.verified = true && @collection.users.id = @request.auth.id"
  collection.updateRule = "@request.auth.verified = true && @collection.users.id = @request.auth.id\n"
  collection.deleteRule = "@request.auth.verified = true && @collection.users.id = @request.auth.id\n"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("08rxm48ld1c3q9m")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
