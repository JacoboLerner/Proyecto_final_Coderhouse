import { Router } from "express";
import { createCart, deleteCart, getAllCarts,addProductToCart, getCart, updateCart,deleteProductFromCart } from "../controllers/carts.controller.js";
import areValidParams from "../middlewares/areValidParams.js";
import isUserOrPremium from "../middlewares/isUserOrPremium.js";
const router = Router();

router.post("/:uid/:pid",isUserOrPremium, areValidParams, createCart);
router.get("/:cid",isUserOrPremium, getCart);
router.put("/:cid",isUserOrPremium, updateCart);
router.post('/:cid/:pid',isUserOrPremium, addProductToCart)
router.delete("/:cid/:pid",isUserOrPremium, deleteProductFromCart);
router.delete("/:pid", isUserOrPremium, deleteCart);


export default router;
