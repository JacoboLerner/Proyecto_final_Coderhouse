import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    owner: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
    totalPrice:
    {
      type:Number
    },
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products",
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                price: {
                    type: Number
                },
                total: {
                    type: Number
                },
            },
        ],
    },
});

const CartModel = mongoose.model("carts", cartSchema)

export default CartModel