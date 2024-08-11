import request from "supertest";
import app from "../../src/index";

describe("E2E Test - Product API", () => {
  it("should return product details", async () => {
    const response = await request(app).get("/api/products");
    expect(response.status).toBe(200);
    //expect(response.body).toEqual({ id: "product-id", price: 100 });
  });
});
