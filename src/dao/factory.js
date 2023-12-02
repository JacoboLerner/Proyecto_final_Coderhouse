import { connect } from "mongoose";

let persistence = process.env.PERSISTENCE
let mongoUrl= process.env.MONGO_URL

let dao = {};

switch (persistence) {
  case "memory":
    console.log("Memory connected");
    break;
  case "fs":
    console.log("File System connected");
    break;
  default:
    connect(mongoUrl)
      .then(() => console.log("Mongo connected"))
      .catch((err) => console.log(err));
    const { default: CartMongo } = await import("./mongo/carts.mongo.js");
    const { default: ProductsMongo } = await import("./mongo/products.mongo.js");
    const { default: TicketsMongo } = await import("./mongo/tickets.mongo.js");
    const { default: UsersMongo } = await import("./mongo/users.mongo.js");
    dao = { Cart: CartMongo, Product: ProductsMongo, User: UsersMongo, Ticket:TicketsMongo};
    break;
}

export default dao;