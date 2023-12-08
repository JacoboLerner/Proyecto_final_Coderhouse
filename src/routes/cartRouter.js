import { Router } from "express";
import { createCart, deleteCart,addProductToCart,getAllCarts,addProductToCartLoggedIn, getCart, updateCart,deleteProductFromCart } from "../controllers/carts.controller.js";
import isUserOrPremium from "../middlewares/isUserOrPremium.js";
import isUser from "../middlewares/isUser.js";
const router = Router();

router.post("/",isUserOrPremium, createCart);
router.get("/", getAllCarts);
router.get("/:cid",isUserOrPremium, getCart);
router.put("/:cid",isUserOrPremium, updateCart);
router.post('/add/:cid/:pid',isUserOrPremium, addProductToCart)
router.post('/add/:pid',isUser, isUserOrPremium, addProductToCartLoggedIn)
router.delete("/:cid/:pid",isUserOrPremium, deleteProductFromCart);
router.delete("/:pid", isUserOrPremium, deleteCart);


export default router;
