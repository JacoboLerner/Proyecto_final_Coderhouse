import __dirname from "../dirname.js";
import ProductsService from "../services/products.service.js";
import CustomError from "../config/CustomError.js";
import errors from "../config/errors.js";

const createProduct = async (req, res, next) => {
  try {
    let data = req.body;
    let result = await new ProductsService().create(data, next);
    return res.status(201).json({ status: "success", payload: result });
  } catch (error) {
    error.where = "controller";
    return next(error);
  }
};


const getAllProducts = async (req, res, next) => {
  try {
    let queries = {
      page: 1,
      limit: 4,
      skip: 0,
      adopted: false,
    };
    req.query.page && (queries.page = req.query.page);
    req.query.limit && (queries.limit = Number(req.query.limit));
    req.query.adopted && (queries.adopted = req.query.adopted);
    queries.skip = (queries.page - 1) * queries.limit;
    let result = await new ProductsService().getAll(queries, next);
    if (result.pets.length > 0) {
      return res.status(200).json({ status: "success", payload: result });
    }
    return CustomError.newError(errors.notFound);
  } catch (error) {
    error.where = "controller";
    return next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    let { pid } = req.params;
    let result = await new ProductsService().getBy(pid, next);
    if (result) {
      return res.status(200).json({ status: "success", payload: result });
    }
    return CustomError.newError(errors.notFound);
  } catch (error) {
    error.where = "controller";
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    let pid = req.params.pid;
    let data = req.body;
    let result = await new ProductsService().update(pid, data, next);
    if (result) {
      return res.status(200).json({ status: "success", payload: result._id });
    }
    return CustomError.newError(errors.notFoundOne);
  } catch (error) {
    error.where = "controller";
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    let pid = req.params.pid;
    let result = await new ProductsService().delete(pid, next);
    if (result) {
      return res.status(200).json({ status: "success", payload: result._id });
    }
    return CustomError.newError(errors.notFoundOne);
  } catch (error) {
    error.where = "controller";
    return next(error);
  }
};

export { createProduct, getAllProducts, getOne, updateProduct, deleteProduct };
