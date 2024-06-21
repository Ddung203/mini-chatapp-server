import bcrypt from "bcrypt";
import {
  createUser,
  getUserByUsername,
  getUsers,
} from "../../repository/userRepository.js";

import {
  savePublicKey,
  getUserPublicKey,
} from "../../repository/keyRepository.js";

import { generateJWTToken, verifyJWTToken } from "../../utils/token.js";

class AuthController {
  // Lấy danh sách người dùng (dùng cho mục đích test)
  static getUsersHandler = async (req, res) => {
    try {
      const users = await getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Đăng ký người dùng mới
  static registerHandler = async (req, res) => {
    try {
      const { username, password } = req.body;

      // Kiểm tra xem người dùng đã tồn tại chưa
      const existingUser = await getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Băm mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);

      // Tạo người dùng mới

      const newUser = {
        username,
        password: hashedPassword,
      };

      const savedUser = await createUser(newUser);
      res.status(201).json({
        status: "success",
        savedUser,
      });
    } catch (error) {
      // console.log("error :>> ", error);
      res.status(500).json({ message: error.message });
    }
  };

  // Đăng nhập người dùng
  static loginHandler = async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await getUserByUsername(username);

      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      // Kiểm tra mật khẩu
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      // Tạo token JWT
      const token = generateJWTToken({ id: user.id, username: user.username });
      const keyObject = await getUserPublicKey(username);

      res.status(200).json({
        status: "success",
        username: user.username,
        token,
        publicKey: keyObject.publicKey,
        privateKeyHash: keyObject.privateKeyHash,
      });
    } catch (error) {
      console.log("error :>> ", error);
      res.status(500).json({ message: error.message });
    }
  };

  // Route được bảo vệ
  static protectedRouteHandler = (req, res) => {
    res.status(200).json({ message: "You have accessed a protected route!" });
  };

  // SAVE public key
  static savePublicKeyHandler = async (req, res) => {
    const username = req.body.username;
    const publicKey = req.body.publicKey;
    const privateKeyHash = req.body.privateKeyHash;

    try {
      const newKeyRecord = await savePublicKey({
        username,
        publicKey,
        privateKeyHash,
      });

      return res.status(200).json({
        status: "success",
        data: { username, publicKey },
        metadata: newKeyRecord,
        message: "Lưu public key thành công!",
      });
    } catch (error) {
      console.log("error :>> ", error);
      return res.status(400).json({ message: "Có lỗi khi lưu public key!" });
    }
  };

  static getReceiverPublicKeyHandler = async (req, res) => {
    console.log("req.query.receiver :>> ", req.query.receiver);
    const user = await getUserPublicKey(req.query.receiver);
    // console.log("publicKey:: ", user.publicKey);
    return res.status(200).json(user?.publicKey);
  };
}

export default AuthController;
