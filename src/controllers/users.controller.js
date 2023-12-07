import UsersService from "../services/users.service.js";
import CustomError from "../config/CustomError.js";
import errors from "../config/errors.js";
import User from "../dao/mongo/models/user.model.js";

const getAllUsers = async (req, res, next) => {
  try {
    let queries = {
      page: 1,
      limit: 4,
      skip: 0,
    };
    req.query.page && (queries.page = req.query.page);
    req.query.limit && (queries.limit = Number(req.query.limit));
    queries.skip = (queries.page - 1) * queries.limit;
    let result = await new UsersService().getAll(queries, next);
    if (result.users.length > 0) {
      return res.status(200).json({ status: "success", payload: result });
    }
    return CustomError.newError(errors.notFound);
  } catch (error) {
    error.where = "controller";
    return next(error);
  }
};

const updateUser = async (req, res, next) => { 
  const userid = req.user._id
  try {
      const user= await User.findById(userid)
      if(user.role =='user'){
          const updatedUser= await User.findOneAndUpdate(
              {_id:userid},
          { role: 'premium'},
          { new: true }
      );
      await updatedUser.save();
      req.user.role= 'premium'
      return res.render('role_cambiado', {
          message:"El usuario ahora tiene role de: " + updatedUser.role
      });
  }else if(user.role=='premium'){
      const updatedUser=await User.findOneAndUpdate(
          {_id:userid},
          { role: "user" },
          { new: true }
      );
      req.user.role= 'user'
      await updatedUser.save();
      return res.render('role_cambiado', {
          message:"El usuario ahora tiene role de: " + updatedUser.role
      })
 
  } else{
      return CustomError.newError(errors.notFound);
  }} catch (error) {
    error.where = "controller";
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    let uid = req.params.uid;
    let result = await new UsersService().delete(uid, next);
    if (result) {
      return res.status(200).json({ status: "success", payload: result._id });
    }
    return CustomError.newError(errors.notFoundOne);
  } catch (error) {
    error.where = "controller";
    return next(error);
  }
};

export { getAllUsers, updateUser, deleteUser };