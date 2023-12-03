import dao from "../dao/factory.js";

export default class TicketsRepository {
    constructor() {
      this.model = new dao.Ticket();
    }
    create = async (cid,user,next) => {
      try {
        return await this.model.create(cid,user,next);
      } catch (error) {
        error.where = "repository";
        return next(error);
      }
    };
    totalToPay = async (tid, next) => {
      try {
        return await this.model.totalToPay(tid, next);
      } catch (error) {
        error.where = "repository";
        return next(error);
      }
    };
}