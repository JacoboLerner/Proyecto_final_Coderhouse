import { Router } from "express";
import CartModel from "../dao/mongo/models/cart.model.js";
import logger from "../config/loggers/loggerFactory.js";
import isUser from "../middlewares/isUser.js";
import ProductModel from "../dao/mongo/models/product.model.js";

const router = Router()

router.get('/cart', isUser, async (req, res) => {
    try {    
        const result2 = await CartModel.findOne({owner:req.user._id})
        const id = result2._id
        const result = await CartModel.findById(id).lean().exec();
        if (result === null) {
            return res.status(404).json({
                status: 'error',
                error: 'Cart not found'
            });
        }
        const user= req.user.name

        const mailUser = req.user.email;
        res.render('cart', {
            title: "Cart",
            cid: result._id,
            totalprice:result.totalPrice,
            products: result.products,
            mailUser: mailUser,
            user:user.toUpperCase(),
            price: result.price
        });
    } catch (error) {
        logger.ERROR(error)
        res.status(500).json({
            status: 'error',
            error: error.message
        });
    }})

router.get("/add",isUser,  async (req, res) => {
    try{
        const userInfo = {
            _id: req.user._id,
        };
        res.render("add", {title:"Add ",userInfo})
    }catch (error) {
        logger.ERROR(error)
        res.status(500).json({
            status: 'error',
            error: error.message
        });
    }

})

router.get("/modify",isUser,  async (req, res) => {
    try{
        const userInfo = {
            _id: req.user._id,
            role:req.user.role
        };
        const products=await ProductModel.find()
        res.render("modify", {title:"Modify",userInfo, products})
    }catch (error) {
        logger.ERROR(error)
        res.status(500).json({
            status: 'error',
            error: error.message
        });
    }

})

export default router;