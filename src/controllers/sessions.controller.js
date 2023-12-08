import UsersService from "../services/users.service.js";
import config from "../config/env.js"
import nodemailer from 'nodemailer'
import User from "../dao/mongo/models/user.model.js";
import UserPasswordModel from "../dao/mongo/models/user.password.schema.js";
import bcrypt from 'bcryptjs'
import { generateRandomString,createHash } from "../middlewares/passwordChange.js";
import CartsService from "../services/carts.service.js";

const service = new UsersService();

const register = async (req, res, next) => {
  try {
    let data = req.body;
    let result = await service.create(data, next)
    let data2 = { owner: result._id, products:[],totalPrice:0 };
    let response = await new CartsService().create(data2, next)
    return res.status(201).json({ status: "success", payload: result });
  } catch (error) {
    error.where = "controller";
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    console.log(req.token);
    return res
      .status(200)
      .cookie("token", req.token, { maxAge: 60 * 60 * 1000*1000 })
      .json({ status: "success", message: "Logged in" });
  } catch (error) {
    error.where = "controller";
    return next(error);
  }
};

const signout = async (req, res, next) => {
  try {
    return res
      .status(200)
      .clearCookie("token")
      .json({ status: "success", message: "Signed out" });
  } catch (error) {
    error.where = "controller";
    res.clearCookie("token");
    return next(error);
  }
};

const online = async (req, res, next) => {
  try {
    return res
      .status(200)
      .json({ status: "success", message: "On line", response: req.user });
  } catch (error) {
    error.where = "controller";
    res.clearCookie("token");
    return next(error);
  }
};
const gitAccess = async (req, res, next) => {
try {
        res
    .status(200)
    .cookie("token", req.token, { maxAge: 60 * 60 * 1000 })
    .redirect("/")
  } catch (error) {
    error.where = "controller";
    return next(error);
  };
}

const getForgetPassword = async (req, res) => {
  res.render('forget_password',{title:"Recover password"});
}

const executeForgetPassword =  async (req, res) => {
  const email = req.body.email
  const user = await User.findOne({ email })
  if (!user) {
      return res.status(404).json({ status: 'error', error: 'User not found' });
  }
  const token = generateRandomString(16)
  await UserPasswordModel.create({ email, token })
  const mailerConfig = {
      service: 'gmail',
      auth: { user: config.mailDelEcommerce, pass: config.mailPasswordDelEcommerce }
  }
  let transporter = nodemailer.createTransport(mailerConfig)
  let message = {
      from: config.mailDelEcommerce,
      to: email,
      subject: '[Coder e-commerce API Backend] Reset your password',
      html: `<h1>[Coder e-commerce API Backend] Reset your password</h1>
      <hr>Debes resetear tu password haciendo click en el siguiente link <a href="http://localhost:${config.port}/api/sessions/verify-token/${token}" target="_blank">http://localhost:8080/api/sessions/verify-token/${token}</a>
      <hr>
      Saludos cordiales,<br>
      <b>The Coder e-commerce API Backend</b>`
  }
  try {
      await transporter.sendMail(message)
      res.json({
          status: 'success',
          message: `Email enviado con exito a ${email} para restablecer la contraseña`
      })
  } catch (err) {
      res.status(500).json({
          status: 'error',
          error: err.message
      })
  }
  }
  
  const verifyToken = async (req, res) => {
    const token = req.params.token
    const userPassword = await UserPasswordModel.findOne({
        token
    })
    if (!userPassword) {

        return res.render('forget_password');
    }
    const user = userPassword.email
    res.render('reset_password', {
        user,title:"Reset Password"
    })
}

const resetPassword = async (req, res) => {
  try {
      const user = await User.findOne({
          email: req.params.user
      })
      const newPassword = req.body.newPassword;
      const passwordsMatch = await bcrypt.compareSync(newPassword, user.password);
      if (passwordsMatch) {
          return res.json({ status: 'error', message: 'No puedes usar la misma contraseña' });
      } 
      await User.findByIdAndUpdate(user._id, { password: createHash(newPassword) })
      res.render("password_reset",{
          message: 'Se ha creado una nueva contraseña',title:"Password reset"
      })
      await UserPasswordModel.deleteOne({
          email: req.params.user
      })

  } catch (err) {
      res.json({
          status: 'error',
          message: 'No se ha podido crear la nueva contraseña'
      })
  }
}

export { login, register, signout, online,gitAccess, getForgetPassword ,executeForgetPassword,verifyToken,resetPassword};
