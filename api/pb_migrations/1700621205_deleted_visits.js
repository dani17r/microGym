/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("kay2gu5rqprpp1x");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "kay2gu5rqprpp1x",
    "created": "2023-11-22 02:44:54.700Z",
    "updated": "2023-11-22 02:44:54.700Z",
    "name": "visits",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ixk85bvd",
        "name": "user_id",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
