import { dataSource } from "../config/dataSource.js";

export const createUser = async (user) => {
  const userRepository = dataSource.getRepository("User");
  return await userRepository.save(user);
};

export const getUsers = async () => {
  const userRepository = dataSource.getRepository("User");
  return await userRepository.find();
};

export const getUserById = async (id) => {
  const userRepository = dataSource.getRepository("User");
  return await userRepository.findOneBy({ id });
};

export const getUserByUsername = async (username) => {
  const userRepository = dataSource.getRepository("User");
  return await userRepository.findOneBy({ username });
};

export const updateUser = async (id, updatedUser) => {
  const userRepository = dataSource.getRepository("User");
  await userRepository.update(id, updatedUser);
  return await userRepository.findOneBy({ id });
};

export const deleteUser = async (id) => {
  const userRepository = dataSource.getRepository("User");
  return await userRepository.delete(id);
};
