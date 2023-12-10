/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

    // remove
    collection.schema.removeField("uei1qv6g");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "ab6cyopm",
        name: "pin",
        type: "number",
        required: false,
        presentable: false,
        unique: false,
        options: {
          min: 4,
          max: 4,
          noDecimal: true,
        },
      }),
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "uei1qv6g",
        name: "pin",
        type: "text",
        required: false,
        presentable: false,
        unique: false,
        options: {
          min: 4,
          max: 4,
          pattern: "",
        },
      }),
    );

    // remove
    collection.schema.removeField("ab6cyopm");

    return dao.saveCollection(collection);
  },
);
