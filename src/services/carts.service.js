import CartsRepository from "../repository/carts.repository.js";

export default class CartsService {
  constructor() {
    this.repository = new CartsRepository();
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
  getBy = async (id, next) => {
    try {
      return await this.repository.getBy(id, next);
    } catch (error) {
      error.where = "service";
      return next(error);
    }
  };
  addProductToCart = async (cid,pid,next) => {
    try {
      return await this.repository.addProductToCart(cid,pid,next);
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
  deleteProductFromCart = async (cid,pid, next) => {
    try {
      return await this.repository.deleteProductFromCart(cid,pid, next);
    } catch (error) {
      error.where = "service";
      return next(error);
    }
  };
}
