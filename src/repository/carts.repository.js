import dao from "../dao/factory.js";

export default class CartsRepository {
  constructor() {
    this.model = new dao.Cart();
  }
  create = async (data, next) => {
    try {
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
  getBy = async (id, next) => {
    try {
      return await this.model.getBy(id, next);
    } catch (error) {
      error.where = "repository";
      return next(error);
    }
  };
  addProductToCart = async (cid,pid,user,next) => {
    try {
      return await this.model.addProductToCart(cid,pid,user,next);
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
  deleteProductFromCart = async (cid,pid, next) => {
    try {
      return await this.model.deleteProductFromCart(cid,pid, next);
    } catch (error) {
      error.where = "repository";
      return next(error);
    }
  };
}
