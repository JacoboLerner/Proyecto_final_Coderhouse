import config from "../../src/config/env.js";
import { expect } from "chai";
import supertest from "supertest";
import dao from "../../src/dao/factory.js";
const { Product, Cart } = dao;

const requester = supertest(`http://localhost:${config.port}/api`);
describe("Testing Flow of products with sessions Admin", () => {
  const model = new Product();
  const data_product = {
    title: "Producto 1",
    description: "Descripción del producto 1",
    price: 100,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/bus-vehicle-transport-school-128.png",
    code: "1",
    stock: 10,
    category: "Categoria 1",
  };
  let id_product = null;
  let data_user = {
    first_name: "juan",
    last_name: "maschernao",
    email: "juan@coder.com",
    password: "coder2622",
    age: 39,
    role: "admin",
  };
  let id_user = null;
  let token = {};
  it("Must register a user", async () => {
    const response = await requester.post("/sessions/register").send(data_user);
    const { _body, statusCode } = response;
    id_user = _body.payload._id;
    expect(statusCode).to.be.equals(201);
  });
  it("Must log in an admin user", async () => {
    const response = await requester.post("/sessions/login").send(data_user);
    const { statusCode, headers } = response;
    token.key = headers["set-cookie"][0].split("=")[0];
    token.value = headers["set-cookie"][0].split("=")[1];
    expect(statusCode).to.be.equals(200);
  });
  it("Must create a product and respond with statusCode = 201", async () => {
    const response = await requester
      .post("/products")
      .send(data_product)
      .set("Cookie", [token.key + "=" + token.value]);
    const { _body, statusCode } = response;

    id_product = _body.payload._id;
    expect(statusCode).to.be.equals(201);
  });
  it("Must respond with an array of products", async () => {
    const response = await requester.get("/products");
    const { _body } = response;
    expect(Array.isArray(_body.payload.ProductModels)).to.be.equals(true);
  });
  it("Must update a product, also tests readOne", async () => {
    const before = await model.getBy(id_product);
    const response = await requester
      .put("/products/" + id_product)
      .send({
        title: "Producto 1 actualizado",
      })
      .set("Cookie", [token.key + "=" + token.value]);
    const after = await model.getBy(id_product);
    expect(before === after).to.be.equals(false);
  });
  it("Must destroy a product", async () => {
    const response = await requester
      .delete("/products/" + id_product)
      .set("Cookie", [token.key + "=" + token.value]);
    const found = await model.getBy(id_product);
    expect(found).not.to.be.ok;
  });
  it("Must sign out an admin user", async () => {
    const response = await requester
      .post("/sessions/signout")
      .set("Cookie", [token.key + "=" + token.value]);
    const { statusCode, _body } = response;
    expect(statusCode).to.be.equals(200);
  });
  it("Must destroy a user", async () => {
    let response = await requester.delete("/users/" + id_user);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  });
});

describe("Testing Flow of cart with sessions Premium", () => {
    const model = new Product();
    const data_cart = {
        owner: "655bbc3c1a0eb289df0c8023",
        products: [],
        totalPrice: 0
    };
    let id_cart = null;
    let data_user = {
        first_name: "juan",
        last_name: "maschernao",
        email: "juan@coder.com",
        password: "coder2622",
        age: 39,
        role: "premium",
    };
    let id_user = null;
    let token = {};
    it("Must register a user", async () => {
        const response = await requester.post("/sessions/register").send(data_user);
        const { _body, statusCode } = response;
        id_user = _body.payload._id;
        expect(statusCode).to.be.equals(201);
        });
    it("Must log in a premium user", async () => {
        const response = await requester.post("/sessions/login").send(data_user);
        const { statusCode, headers } = response;
        token.key = headers["set-cookie"][0].split("=")[0];
        token.value = headers["set-cookie"][0].split("=")[1];
        expect(statusCode).to.be.equals(200);
    });
    it("Must create a cart and respond with statusCode = 201", async () => {
      const response = await requester
        .post("/carts")
        .send(data_cart)
        .set("Cookie", [token.key + "=" + token.value]);
      const { _body, statusCode } = response;
      id_cart = _body.payload._id;
      expect(statusCode).to.be.equals(201);
    });
    it("Must respond with an array of carts", async () => {
      const response = await requester.get("/carts");
      const { _body } = response;
      expect(Array.isArray(_body.payload.CartModels)).to.be.equals(true);
    });
    it("Must read one Cart", async () => {
        const response = await requester
          .get("/carts/" + id_cart)
          .set("Cookie", [token.key + "=" + token.value]);
          const { statusCode } = response;
          expect(statusCode).to.be.equals(200);
      });
    it("Must update a cart", async () => {
      const response = await requester
        .put("/carts/" + id_cart)
        .send( {totalPrice: 1000})
        .set("Cookie", [token.key + "=" + token.value]);
        const { statusCode } = response;
        expect(statusCode).to.be.equals(200);
    });
    it("Must destroy a cart", async () => {
      const response = await requester
        .delete("/carts/" + id_cart)
        .set("Cookie", [token.key + "=" + token.value]);
      const found = await model.getBy(id_cart);
      expect(found).not.to.be.ok;
    });
    it("Must sign out an premium user", async () => {
      const response = await requester
        .post("/sessions/signout")
        .set("Cookie", [token.key + "=" + token.value]);
      const { statusCode, _body } = response;
      expect(statusCode).to.be.equals(200);
    });
    it("Must destroy a user", async () => {
      let response = await requester.delete("/users/" + id_user);
      const { statusCode } = response;
      expect(statusCode).to.be.equals(200);
    });
  });
  