import TicketsRepository from "../repository/tickets.repository.js";

export default class UsersService {
    constructor() {
      this.repository = new TicketsRepository();
    }
    create = async (cid,user, next) => {
      try {
        return await this.repository.create(cid,user, next);
      } catch (error) {
        error.where = "service";
        return next(error);
      }
    };
    totalToPay = async (tid, next) => {
      try {
        return await this.repository.totalToPay(tid, next);
      } catch (error) {
        error.where = "service";
        return next(error);
      }
    };
}