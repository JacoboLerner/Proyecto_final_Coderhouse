import dao from "../dao/factory.js";

export default class ProductsRepository {
  constructor() {
    this.model = new dao.Product();
  }
  create = async (data, next) => {
    try {
      return this.model.create(data, next);
    } catch (error) {
      error.where = "repository";
      return next(error);
    }
  };
  getAll = async (queries, next) => {
    try {
      return this.model.getAll(queries, next);
    } catch (error) {
      error.where = "repository";
      return next(error);
    }
  };
  getBy = async (id, next) => {
    try {
      return this.model.getBy(id, next);
    } catch (error) {
      error.where = "repository";
      return next(error);
    }
  };
  update = async (id, data,user, next) => {
    try {
      return this.model.update(id, data,user, next);
    } catch (error) {
      error.where = "repository";
      return next(error);
    }
  };
  delete = async (id, next) => {
    try {
      return this.model.delete(id, next);
    } catch (error) {
      error.where = "repository";
      return next(error);
    }
  };
}
