import dao from "../dao/factory.js";
import UserDTO from "../dto/users.dto.js";

export default class UsersRepository {
  constructor() {
    this.model = new dao.User();
  }
  create = async (data, next) => {
    try {
    data = await UserDTO.getUserInputFrom(data);
      return await this.model.create(data, next);
    } catch (error) {
      error.where = "repository";
      return next(error);
    }
  };
  getAll = async (queries, next) => {
    try {
      return await this.model.getAll(queries, next);
    } catch (error) {
      error.where = "repository";
      return next(error);
    }
  };
  getBy = async (params, next) => {
    try {
      return await this.model.getBy(params, next);
    } catch (error) {
      error.where = "repository";
      return next(error);
    }
  };
  getUserByEmail = async (email, next) => {
    try {
      return await this.model.getBy({ email }, next);
    } catch (error) {
      error.where = "repository";
      return next(error);
    }
  };
  getUserById = async (id, next) => {
    try {
      return await this.model.getBy({ _id: id }, next);
    } catch (error) {
      error.where = "repository";
      return next(error);
    }
  };
  update = async (id, data, next) => {
    try {
      return await this.model.update(id, data, next);
    } catch (error) {
      error.where = "repository";
      return next(error);
    }
  };
  delete = async (id, next) => {
    try {
      return await this.model.delete(id, next);
    } catch (error) {
      error.where = "repository";
      return next(error);
    }
  };
}
