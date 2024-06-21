import {
  createMessage,
  getMessagesByConversationId,
  getMessagesByUsers,
} from "../../repository/messageRepository.js";

class MessageController {
  static createMessageHandler = async (req, res) => {
    const { conversationId, senderUsername, receiverUsername, content } =
      req.body;

    try {
      const newMessage = {
        conversationId,
        senderUsername,
        receiverUsername,
        content,
      };

      const savedMessage = await createMessage(newMessage);

      return res.status(201).json(savedMessage);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  static getMessagesByConversationIdHandler = async (req, res) => {
    const { conversationId } = req.params;

    try {
      const savedMessage = await getMessagesByConversationId(conversationId);

      return res.status(201).json(savedMessage);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  static getMessagesByUsersHandler = async (req, res) => {
    const { senderUsername, receiverUsername } = req.query;

    try {
      const savedMessage = await getMessagesByUsers({
        senderUsername,
        receiverUsername,
      });

      return res.status(200).json(savedMessage);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
}

export default MessageController;
