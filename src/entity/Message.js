import { EntitySchema } from "typeorm";

export const Message = new EntitySchema({
  name: "Message",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    conversationId: {
      type: "int",
    },
    senderUsername: {
      type: "varchar",
    },
    receiverUsername: {
      type: "varchar",
    },
    content: {
      type: "text",
    },
    sentAt: {
      type: "timestamp",
      nullable: true,
      default: () => "CURRENT_TIMESTAMP",
    },
  },
});
