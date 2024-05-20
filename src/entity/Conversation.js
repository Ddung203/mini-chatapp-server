import { EntitySchema } from "typeorm";

export const Conversation = new EntitySchema({
  name: "Conversation",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    participant1Username: {
      type: "varchar",
    },
    participant2Username: {
      type: "varchar",
    },
  },
});
