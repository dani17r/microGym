/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

    // update
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "y0xud1nd",
        name: "cedula",
        type: "number",
        required: false,
        presentable: false,
        unique: false,
        options: {
          min: null,
          max: null,
          noDecimal: true,
        },
      }),
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

    // update
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "y0xud1nd",
        name: "cedula",
        type: "number",
        required: false,
        presentable: false,
        unique: false,
        options: {
          min: 7,
          max: 8,
          noDecimal: true,
        },
      }),
    );

    return dao.saveCollection(collection);
  },
);
