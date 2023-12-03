import CartModel from "./models/cart.model.js";
import ProductModel from "./models/product.model.js";

export default class CartMongo {
  create = async (data, next) => {
    try {
      return await CartModel.create(data);
    } catch (error) {
      error.where = "mongo";
      return next(error);
    }
  };
  getAll = async ({ page, skip, limit }, next) => {
    try {
      let pages = await CartModel.countDocuments();
      pages = Math.ceil(pages / limit);
      let prev = Number(page) === 1 ? null : Number(page) - 1;
      let next = Number(page) === pages ? null : Number(page) + 1;
      let CartModels = await CartModel.find()
        .skip(skip)
        .limit(limit)
        .populate("owner")
        .populate("product");
      return { prev, next, CartModels };
    } catch (error) {
      error.where = "mongo";
      return next(error);
    }
  };
  getBy = async (id, next) => {
    try {
      return await CartModel.findById(id).populate("owner").populate("products.product");
    } catch (error) {
      error.where = "mongo";
      return next(error);
    }
  };
  update = async (id, data, next) => {
    try {
      return await CartModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      error.where = "mongo";
      return next(error);
    }
  };//addProductToCart
  addProductToCart = async (cid,pid, next) => {
    try {
      const producto= await ProductModel.findById(pid)
      const productPrice= producto.price
      const cart = await CartModel.findById(cid);
      const prodIndex = cart.products.findIndex(
        (prod) => prod.product == pid
    );
    if (prodIndex !== -1) {
        cart.products[prodIndex].quantity++;
        cart.products[prodIndex].total=cart.products[prodIndex].price * cart.products[prodIndex].quantity;
    } else {
        const newProduct = { product: pid, price:productPrice, quantity: 1, total:productPrice };
        cart.products.push(newProduct);
    }
    const newtotalPrice = cart.products.reduce((sum, product) => sum + product.total, 0)
    console.log(newtotalPrice);
    await CartModel.findByIdAndUpdate(cid, { products: cart.products ,totalPrice:newtotalPrice}).exec();

    await cart.save();
    return cart;
    } catch (error) {
      error.where = "mongo";
      return next(error);
    }
  };
  delete = async (id, next) => {
    try {
      return await CartModel.findByIdAndDelete(id);
    } catch (error) {
      error.where = "mongo";
      return next(error);
    }
  };
  deleteProductFromCart = async (cid,pid, next) => {
    try {
      let cart = await CartModel.findById(cid);
      const prodIndex = cart.products.findIndex(
          (prod) => prod.product == pid
      );
      if (cart.products[prodIndex].quantity > 1) {
          cart.products[prodIndex].quantity--;
      } else {
          cart = await CartModel.findOneAndUpdate({ _id: cid }, { $pull: { products: { product: pid } } }, { 'new': true });
      }
      await cart.save();
      return cart;
    } catch (error) {
      error.where = "mongo";
      return next(error);
    }
  };
}
