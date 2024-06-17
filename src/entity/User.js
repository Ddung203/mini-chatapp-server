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
    isOnline: {
      type: "boolean",
      default: false,
      nullable: true,
    },
  },
});
