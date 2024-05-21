import { dataSource } from "../config/dataSource.js";

const conversationRepository = dataSource.getRepository("Conversation");

export const createConversation = async ({
  participant1Username,
  participant2Username,
  participant1publicKey,
  participant2publicKey,
}) => {
  // Kiểm tra xem cuộc trò chuyện đã tồn tại chưa
  let existingConversation = await conversationRepository.findOne({
    where: [
      { participant1Username, participant2Username },
      {
        participant1Username: participant2Username,
        participant2Username: participant1Username,
      },
    ],
  });

  if (existingConversation) {
    return existingConversation;
  }

  // Nếu cuộc trò chuyện chưa tồn tại, tạo mới
  const newConversation = conversationRepository.create({
    participant1Username,
    participant2Username,
    participant1publicKey,
    participant2publicKey,
  });

  return await conversationRepository.save(newConversation);
};

export const getConversationByUsers = async ({
  participant1Username,
  participant2Username,
}) => {
  return await conversationRepository.findOne({
    where: [
      { participant1Username, participant2Username },
      {
        participant1Username: participant2Username,
        participant2Username: participant1Username,
      },
    ],
  });
};

export const getConversations = async () => {
  const result = await conversationRepository.find();

  return result.map((item) => (item = item.id));
};
