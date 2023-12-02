import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    owner: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
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
            },
        ],
    },
});

const CartModel = mongoose.model("carts", cartSchema)

export default CartModel