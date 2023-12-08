import { Router } from "express";
import { register, login, signout, online, gitAccess, getForgetPassword, executeForgetPassword, verifyToken, resetPassword } from "../controllers/sessions.controller.js";
import isValidEmail from "../middlewares/isValidEmail.js";
import areValidProps from "../middlewares/areValidPropsUser.js";
import isValidUser from "../middlewares/isValidUser.js";
import isValidPassword from "../middlewares/isValidPassword.js";
import createToken from "../middlewares/createToken.js";
import isUser from "../middlewares/isUser.js";
import passport from "passport";
import { updateUser } from "../controllers/users.controller.js";

const router = Router();

router.post("/register",isValidEmail, areValidProps, register);
router.post("/login",isValidUser, isValidPassword,createToken, login);
router.post("/signout",isUser, signout);
router.post("/online",isUser, online);
router.get("/premium",isUser, updateUser);
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }),(req, res) => {} );
router.get("/githubcallback",passport.authenticate("github"), createToken, gitAccess);
router.get("/forget_password", getForgetPassword);
router.post("/forget_password",executeForgetPassword); // 
router.get("/verify-token/:token",verifyToken )
router.post("/reset_password/:user",resetPassword )

export default router;
