import UsersRepository from "../repository/users.repository.js";

export default class UsersService {
  constructor() {
    this.repository = new UsersRepository();
  }
  create = async (data, next) => {
    try {
      return await this.repository.create(data, next);
    } catch (error) {
      error.where = "service";
      return next(error);
    }
  };
  getAll = async (queries, next) => {
    try {
      return await this.repository.getAll(queries, next);
    } catch (error) {
      error.where = "service";
      return next(error);
    }
  };
  getBy = async (params, next) => {
    try {
      return await this.repository.getBy(params, next);
    } catch (error) {
      error.where = "service";
      return next(error);
    }
  };
  getUserByEmail = async (email, next) => {
    try {
      return await this.repository.getUserByEmail(email, next);
    } catch (error) {
      error.where = "service";
      return next(error);
    }
  };
  getUserById = async (id, next) => {
    try {
      return await this.repository.getUserById(id, next);
    } catch (error) {
      error.where = "service";
      return next(error);
    }
  };
  update = async (id, data, next) => {
    try {
      return await this.repository.update(id, data, next);
    } catch (error) {
      error.where = "service";
      return next(error);
    }
  };
  delete = async (id, next) => {
    try {
      return await this.repository.delete(id, next);
    } catch (error) {
      error.where = "service";
      return next(error);
    }
  };
}
