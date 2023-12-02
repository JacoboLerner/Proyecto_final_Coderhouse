import UsersService from "../services/users.service.js";
import ProductsService from "../services/products.service.js";
import CustomError from "../config/CustomError.js";
import errors from "../config/errors.js";

export default async (req, res, next) => {
  try {
    const { uid, pid } = req.params;
    const user = await new UsersService().getUserById(uid, next);
    const product = await new ProductsService().getBy(pid, next);
    if (!user || !product) {
      CustomError.newError(errors.invalid);
    } else {
      req.product = product;
      req.user = user;
      return next();
    }
  } catch (error) {
    error.where = "middleware";
    return next(error);
  }
};
