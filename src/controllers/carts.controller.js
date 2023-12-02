import CartsService from "../services/carts.service.js";
import CustomError from "../config/CustomError.js";
import errors from "../config/errors.js";
import ProductModel from "../dao/mongo/models/product.model.js";

const createCart = async (req, res, next) => {
  try {
    let { uid, pid } = req.params;
    const product = await ProductModel.findById(pid)
    let data = { owner: uid, products: {product:product._id, quantity:1} };
    let response = await new CartsService().create(data, next);
    return res.status(201).json({ status: "success", payload: response });
  } catch (error) {
    error.where = "controller";
    return next(error);
  }
};

const getAllCarts = async (req, res, next) => {
  try {
    let queries = {
      page: 1,
      limit: 4,
      skip: 0,
    };
    req.query.page && (queries.page = req.query.page);
    req.query.limit && (queries.limit = Number(req.query.limit));
    queries.skip = (queries.page - 1) * queries.limit;
    let response = await new CartsService().getAll(queries, next);
    if (response.adoptions.length > 0) {
      return res.status(200).json({ status: "success", payload: response });
    }
    return CustomError.newError(errors.notFound);
  } catch (error) {
    error.where = "controller";
    return next(error);
  }
};

const getCart = async (req, res, next) => {
  try {
    let { aid } = req.params;
    let response = await new CartsService().getBy(aid, next);
    if (response) {
      return res.status(200).json({ status: "success", payload: response });
    }
    return CustomError.newError(errors.notFoundOne);
  } catch (error) {
    error.where = "controller";
    return next(error);
  }
};

const updateCart = async (req, res, next) => {
    try {
      let cid = req.params.pid;
      let data = req.body;
      let result = await new CartsService().update(cid, data, next);
      if (result) {
        return res.status(200).json({ status: "success", payload: result._id });
      }
      return CustomError.newError(errors.notFoundOne);
    } catch (error) {
      error.where = "controller";
      return next(error);
    }
  };

const deleteCart = async (req, res, next) => {
    try {
      let pid = req.params.pid;
      let result = await new CartsService().delete(pid, next);
      if (result) {
        return res.status(200).json({ status: "success", payload: result._id });
      }
      return CustomError.newError(errors.notFoundOne);
    } catch (error) {
      error.where = "controller";
      return next(error);
    }
  };//addProductToCart
  const addProductToCart= async (req, res,next) => {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const result = await CartsService.addProductToCart(cid, pid, next);
      if (result) {
        return res.status(200).json({ status: "success", payload: result._id });
      }
      return CustomError.newError(errors.notFoundOne);
    } catch (error) {
      error.where = "controller";
      return next(error);
    }
  };

   const deleteProductFromCart= async (req, res,next) => {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const result = await CartsService.deleteProductFromCart(cid, pid, next);
      if (result) {
        return res.status(200).json({ status: "success", payload: result._id });
      }
      return CustomError.newError(errors.notFoundOne);
    } catch (error) {
      error.where = "controller";
      return next(error);
    }
  };



export { createCart, getAllCarts, getCart,deleteCart,updateCart,deleteProductFromCart,addProductToCart };
