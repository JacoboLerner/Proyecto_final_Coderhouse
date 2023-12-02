import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getOne,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import isAdminOrPremium from "../middlewares/isAdminOrPremium.js";
import areValidPropsProduct from "../middlewares/areValidPropsProduct.js";

const router = Router();

router.post("/", isAdminOrPremium, areValidPropsProduct, createProduct);
router.get("/", getAllProducts);
router.get("/:pid", getOne);
router.put("/:pid", isAdminOrPremium, updateProduct);
router.delete("/:pid", isAdminOrPremium, deleteProduct);

export default router;
