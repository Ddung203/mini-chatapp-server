import { getAllUsersExceptUsername } from "../../repository/userRepository.js";

class UserController {
  // Lấy danh sách người dùng ngoại trừ Username
  static getAllUsersExceptUsernameHandler = async (req, res) => {
    const { username } = req.user;
    try {
      const users = await getAllUsersExceptUsername(username);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default UserController;
