import request from "supertest";
import app from "../../src/index";

let newProduct = { name: "Product 1", price: 24.3, quantity: 34.1 };
let products;
beforeEach(async () => {
  await request(app).post("/api/products").send(newProduct);
  products = await request(app).get("/api/products");
});

describe("API Tests - Methods Http", () => {
  it("GET /api/products should return 200 OK with product array", async () => {
    const response = await request(app).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toEqual(1);
  });

  it("POST /api/products should create a new product", async () => {
    const response = await request(app).post("/api/products").send(newProduct);
    expect(response).toBeDefined();
    expect(response.status).toBe(201);
  });

  it("GET /api/products/:id should get a product by id", async () => {
    const response = await request(app).get(
      `/api/products/${products.body[0].id}`
    );
    expect(response).toBeDefined();
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBeDefined();
    expect(response.body.price).toBeDefined();
    expect(response.body.quantity).toBeDefined();
  });

  it("PUT /api/products/:id should get a product by id and data update", async () => {
    newProduct = { name: "Product 2", price: 10.3, quantity: 5.1 };
    const isUpdated = await request(app)
      .put(`/api/products/${products.body[0].id}`)
      .send(newProduct);
    const response = await request(app).get(
      `/api/products/${products.body[0].id}`
    );
    expect(response).toBeDefined();
    expect(isUpdated.body).toBeTruthy();
    expect(response.body.name).toEqual("Product 2");
    expect(response.body.price).toEqual(10.3);
    expect(response.body.quantity).toEqual(5.1);
  });

  it("PUT /api/products/:id should get a product by id and data update", async () => {
    newProduct = { name: "Product 2", price: 10.3, quantity: 5.1 };
    const isUpdated = await request(app)
      .put(`/api/products/${products.body[0].id}`)
      .send(newProduct);
    const response = await request(app).get(
      `/api/products/${products.body[0].id}`
    );
    expect(response).toBeDefined();
    expect(isUpdated.body).toBeTruthy();
    expect(response.body.name).toEqual("Product 2");
    expect(response.body.price).toEqual(10.3);
    expect(response.body.quantity).toEqual(5.1);
  });

  it("DELETE /api/products/:id should delete product by id", async () => {
    const isDeleted = await request(app).delete(
      `/api/products/${products.body[0].id}`
    );
    const response = await request(app).get(
      `/api/products/${products.body[0].id}`
    );
    expect(response).toBeDefined();
    expect(isDeleted.body).toBeTruthy();
    expect(response.body.message).toEqual("Product not found");
  });
});
