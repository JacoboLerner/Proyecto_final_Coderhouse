import ProductModel from "./models/product.model.js";


export default class ProductsMongo {
  create = async (data, next) => {
    try {
      return await ProductModel.create(data);
    } catch (error) {
      error.where = "mongo";
      return next(error);
    }
  };
  getAll = async ({ page, skip, limit, adopted }, next) => {
    try {
      let pages = await ProductModel.countDocuments();
      pages = Math.ceil(pages / limit);
      let prev = Number(page) === 1 ? null : Number(page) - 1;
      let next = Number(page) === pages ? null : Number(page) + 1;
      let ProductModels = await ProductModel.find()
        .skip(skip)
        .limit(limit)
        .sort({ name: 1 });
      return { prev, next, ProductModels };
    } catch (error) {
      error.where = "mongo";
      return next(error);
    }
  };
  getBy = async (id, next) => {
    try {
      return await ProductModel.findById(id);
    } catch (error) {
      error.where = "mongo";
      return next(error);
    }
  };
  update = async (id, data, next) => {
    try {
      return await ProductModel.findByIdAndUpdate(id, data);
    } catch (error) {
      error.where = "mongo";
      return next(error);
    }
  };
  delete = async (id, next) => {
    try {
      return await ProductModel.findByIdAndDelete(id);
    } catch (error) {
      error.where = "mongo";
      return next(error);
    }
  };
}
