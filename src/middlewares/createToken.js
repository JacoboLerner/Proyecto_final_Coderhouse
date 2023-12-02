import jwt from "jsonwebtoken";
import config from "../config/env.js"

import TokenDTO from "../dto/token.dto.js";

export default async (req, res, next) => {
  try {
    const userDto = TokenDTO.getUserTokenFrom(req.user);
    const token = jwt.sign(userDto,config.privateKey, { expiresIn: "1h" });
    req.token = token;
    return next();
  } catch (error) {
    error.where = "middleware";
    return next(error);
  }
};
