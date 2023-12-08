import { createHash } from "../config/hash.js";

export default class UserDTO {
  static getUserInputFrom = async (user) => {
    return {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: await createHash(user.password),
      role: user.role || "user",
      age:user.age,
      cart:user.cart
    };
  };
}

