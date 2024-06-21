import { EntitySchema } from "typeorm";

export const Key = new EntitySchema({
  name: "Key",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    username: {
      type: "varchar",
      unique: true,
    },
    publicKey: {
      type: "text",
      nullable: true,
    },
    privateKeyHash: {
      type: "text",
      nullable: true,
      default: "",
    },
  },
});
