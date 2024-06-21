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
    await conversationRepository.update(
      { id: existingConversation.id },
      { participant1publicKey, participant2publicKey }
    );

    return await conversationRepository.findOneBy({
      id: existingConversation.id,
    });

    // return existingConversation;
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

export const getConversationID = async (username1, username2) => {
  let existingConversation = await conversationRepository.findOne({
    where: [
      { participant1Username: username1, participant2Username: username2 },
      { participant1Username: username2, participant2Username: username1 },
    ],
  });

  if (existingConversation) {
    return existingConversation.id;
  }

  const newConversation = conversationRepository.create({
    participant1Username: username1,
    participant2Username: username2,
  });

  const savedConversation = await conversationRepository.save(newConversation);

  return savedConversation.id;
};
