import { dataSource } from "../config/dataSource.js";

// Tạo repository cho Message entity
const messageRepository = dataSource.getRepository("Message");

// Hàm để tạo và lưu tin nhắn mới
export const createMessage = async ({
  conversationId,
  senderUsername,
  receiverUsername,
  content,
}) => {
  const message = messageRepository.create({
    conversationId,
    senderUsername,
    receiverUsername,
    content,
  });
  return await messageRepository.save(message);
};

// Hàm để lấy tất cả tin nhắn của một cuộc trò chuyện
export const getMessagesByConversationId = async (conversationId) => {
  return await messageRepository.find({
    where: { conversationId },
    order: { sentAt: "ASC" },
  });
};

// Hàm để lấy tất cả tin nhắn giữa hai người dùng
export const getMessagesByUsers = async ({
  senderUsername,
  receiverUsername,
}) => {
  return await messageRepository.find({
    where: [
      { senderUsername, receiverUsername },
      { senderUsername: receiverUsername, receiverUsername: senderUsername },
    ],
    order: { sentAt: "ASC" },
  });
};
