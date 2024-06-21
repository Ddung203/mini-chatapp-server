import { Not } from "typeorm";
import { dataSource } from "../config/dataSource.js";

const userRepository = dataSource.getRepository("User");

export const createUser = async (user) => {
  return await userRepository.save(user);
};

export const getUsers = async () => {
  return await userRepository.find();
};

export const getAllUserOnline = async () => {
  return await userRepository.find({
    where: {
      isOnline: true,
    },
  });
};

export const getAllUsersExceptUsername = async (username) => {
  return await userRepository.find({
    where: {
      username: Not(username),
      isOnline: true,
    },
  });
};

export const getUserById = async (id) => {
  return await userRepository.findOneBy({ id });
};

export const getUserByUsername = async (username) => {
  return await userRepository.findOneBy({ username });
};

export const updateUser = async (id, updatedUser) => {
  await userRepository.update(id, updatedUser);
  return await userRepository.findOneBy({ id });
};

export const deleteUser = async (id) => {
  return await userRepository.delete(id);
};

export const updateUserStatus = async (username, isOnline) => {
  await userRepository.update({ username }, { isOnline });
  return await userRepository.findOneBy({ username });
};

export const updateUserSocketId = async (username, socketId) => {
  await userRepository.update({ username }, { socketId });
  return await userRepository.findOneBy({ username });
};

export const getUserBySocketId = async (socketId) => {
  return await userRepository.findOne({ where: { socketId } });
};
