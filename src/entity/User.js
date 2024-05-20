import { EntitySchema } from "typeorm";

export const User = new EntitySchema({
  name: "User",
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
    password: {
      type: "text",
    },
    publicKey: {
      type: "text",
      nullable: true,
    },
    privateKey: {
      type: "text",
      nullable: true,
    },
  },
});
