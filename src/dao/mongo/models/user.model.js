import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "carts",
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'premium'],
        default: 'user'
    }
});

const User = mongoose.model('users', userSchema);

export default User;