// import { Not } from "typeorm";
import { dataSource } from "../config/dataSource.js";

const keyRepository = dataSource.getRepository("Key");

export const savePublicKey = async (key) => {
  if (!!key === false) return null;

  const keyExist = await keyRepository.findOneBy({ username: key.username });
  if (keyExist) {
    return await keyRepository.update(
      { username: key.username },
      { publicKey: key.publicKey },
      { privateKeyHash: key.privateKeyHash }
    );
  }

  await keyRepository.save(key);
  return await keyRepository.findOneBy({ username: key.username });
};

export const getUserPublicKey = async (username) => {
  if (!!username === false) return null;

  return await keyRepository.findOneBy({ username });
};

// export const getKeys = async () => {
//   return await keyRepository.find();
// };
