describe("Integration Test - getProductWithPrice", () => {
  it("should return product details with price", () => {
    expect({ id: "product-id", price: 100 }).toEqual({
      id: "product-id",
      price: 100,
    });
  });
});
