import bcrypt from "bcrypt";
import {
  createUser,
  getUserByUsername,
  getUserPublicKey,
  getUsers,
  updateUserPublicKey,
} from "../../repository/userRepository.js";
import RSA from "../../public/rsa/rsaMD.js";
import { generateJWTToken, verifyJWTToken } from "../../utils/token.js";

class AuthController {
  // Lấy danh sách người dùng (dùng cho mục đích test)
  static getUsersHandler = async (req, res) => {
    try {
      const users = await getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Đăng ký người dùng mới
  static registerHandler = async (req, res) => {
    try {
      const { username, password } = req.body;

      // Kiểm tra xem người dùng đã tồn tại chưa
      const existingUser = await getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Băm mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);

      // Tạo người dùng mới
      // const newUser = {
      //   username,
      //   password: hashedPassword,
      //   publicKey: JSON.stringify(RSA.sinhKhoaRSA().publicKey),
      //   privateKey: JSON.stringify(RSA.sinhKhoaRSA().privateKey),
      // };
      const newUser = {
        username,
        password: hashedPassword,
        publicKey: "",
        privateKey: "",
      };

      const savedUser = await createUser(newUser);
      res.status(201).json(savedUser);
    } catch (error) {
      // console.log("error :>> ", error);
      res.status(500).json({ error: error.message });
    }
  };

  // Đăng nhập người dùng
  static loginHandler = async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await getUserByUsername(username);
      if (!user) {
        return res.status(400).json({ error: "Invalid username or password" });
      }

      // Kiểm tra mật khẩu
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid username or password" });
      }

      // Tạo token JWT
      const token = generateJWTToken({ id: user.id, username: user.username });
      res.status(200).json({
        username: user.username,
        token,
      });
    } catch (error) {
      // console.log("error :>> ", error);
      res.status(500).json({ error: error.message });
    }
  };

  // Route được bảo vệ
  static protectedRouteHandler = (req, res) => {
    res.status(200).json({ message: "You have accessed a protected route!" });
  };

  // SAVE public key
  static savePublicKeyHandler = async (req, res) => {
    const username = req.user.username;
    console.log(
      "🚀 ~ AuthController ~ savePublicKeyHandler= ~ username:",
      username
    );
    const publicKey = JSON.stringify(req.body.publicKey);
    console.log(
      "🚀 ~ AuthController ~ savePublicKeyHandler= ~ publicKey:",
      publicKey
    );

    const newUser = await updateUserPublicKey(username, publicKey);
    return res.status(200).json(newUser);
  };

  static getReceiverPublicKeyHandler = async (req, res) => {
    const user = await getUserPublicKey(req.query.receiver);
    return res.status(200).json(user.publicKey);
  };
}

export default AuthController;
