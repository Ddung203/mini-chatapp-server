import {
  getAllUsersExceptUsername,
  updateUserStatus,
} from "../../repository/userRepository.js";

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

  static setStatusUserHandler = async (req, res) => {
    const user = await updateUserStatus(req.body.username, req.body.isOnline);
    return res.status(200).json(user);
  };
}

export default UserController;
