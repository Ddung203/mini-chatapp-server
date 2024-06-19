import {
  createConversation,
  getConversationByUsers,
  getConversationID,
  getConversations,
} from "../../repository/conversationRepository.js";

class ConversationController {
  static createConversationHandler = async (req, res) => {
    const {
      participant1Username,
      participant2Username,
      participant1publicKey,
      participant2publicKey,
    } = req.body;

    try {
      const newConversation = {
        participant1Username,
        participant2Username,
        participant1publicKey: participant1publicKey,
        participant2publicKey: participant2publicKey,
      };

      const savedConversation = await createConversation(newConversation);

      return res.status(201).json(savedConversation);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  static getConversationHandler = async (req, res) => {
    const { participant1Username, participant2Username } = req.body;

    try {
      const findConversation = { participant1Username, participant2Username };

      const savedConversation = await getConversationByUsers(findConversation);

      return res.status(201).json(savedConversation);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  static getAllConversationHandler = async (req, res) => {
    try {
      const savedConversations = await getConversations();

      return res.status(201).json(savedConversations);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  static getConversationIDHandler = async (req, res) => {
    try {
      const conversationID = await getConversationID(
        req.body.username,
        req.body.partnerUsername
      );

      console.log("conversationID :>> ", conversationID);

      return res.status(201).json({
        status: "success",
        roomID: conversationID,
      });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
}

export default ConversationController;
