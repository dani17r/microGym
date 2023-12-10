/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "hgdqcddb",
        name: "phone",
        type: "number",
        required: true,
        presentable: false,
        unique: false,
        options: {
          min: 11,
          max: 13,
          noDecimal: true,
        },
      }),
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

    // remove
    collection.schema.removeField("hgdqcddb");

    return dao.saveCollection(collection);
  },
);
