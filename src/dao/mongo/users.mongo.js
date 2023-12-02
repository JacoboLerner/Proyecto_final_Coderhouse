import User from "./models/user.model.js";

export default class UsersMongo {
    create = async (data, next) => {
        try {
        let result = await User.create(data);
        return result;
        } catch (error) {
        error.where = "persistence";
        return next(error);
        }
    };
    getAll = async ({ page, skip, limit }, next) => {
        try {
        let pages = await User.countDocuments();
        pages = Math.ceil(pages / limit);
        let prev = Number(page) === 1 ? null : Number(page) - 1;
        let next = Number(page) === pages ? null : Number(page) + 1;
        let users = await User.find({}, "-password")
          .skip(skip)
          .limit(limit)
          .sort({ first_name: 1 });
        return { prev, next, users };
      } catch (error) {
        error.where = "persistence";
        return next(error);
      }
    };

    getBy = async (params, next) => {
      try {
        return await User.findOne(params);
      } catch (error) {
        error.where = "persistence";
        return next(error);
      }
    };

    update = async (id, data, next) => {
      try {
        return await User.findByIdAndUpdate(id, { $set: data });
      } catch (error) {
        error.where = "persistence";
        return next(error);
      }
    };
    
    delete = async (id, next) => {
      try {
        return await User.findByIdAndDelete(id);
      } catch (error) {
        error.where = "persistence";
        return next(error);
      }
    };
  }
  