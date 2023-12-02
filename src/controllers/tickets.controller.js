import TicketsService from "../services/tickets.service.js";
import CustomError from "../config/CustomError.js";
import errors from "../config/errors.js";

const createTicket = async (req, res, next) => {
    try {
      const user= req.user
      const cartId = req.params.cid;
      let result = await new TicketsService().create(cartId,user, next);
      if (result) {
        return res.status(200).json({ status: "success", payload: result._id });
      }
      return CustomError.newError(errors.notFoundOne);
    } catch (error) {
      error.where = "controller";
      return next(error);
    }
  };

  const totalToPay = async (req, res, next) => {
    try {
      const ticketId = req.params.tid;
      let result = await new TicketsService().totalToPay(ticketId, next);
      if (result) {
        return res.status(200).json({ status: "success", payload: result});
      }
      return CustomError.newError(errors.notFoundOne);
    } catch (error) {
      error.where = "controller";
      return next(error);
    }
  };

  export { totalToPay, createTicket };