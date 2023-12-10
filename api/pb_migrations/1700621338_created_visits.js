/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "e65hd8nn4w10t6v",
    "created": "2023-11-22 02:48:58.899Z",
    "updated": "2023-11-22 02:48:58.899Z",
    "name": "visits",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rbkei7pz",
        "name": "user",
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
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("e65hd8nn4w10t6v");

  return dao.deleteCollection(collection);
})
