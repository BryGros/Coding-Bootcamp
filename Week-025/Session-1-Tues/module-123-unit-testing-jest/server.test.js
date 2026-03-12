const request = require("supertest");
const app = require("./server");

test("GET /api/products returns all products", async () => {
  const response = await request(app).get("/api/products");

  expect(response.status).toBe(200);
  expect(response.body).toHaveLength(3);
  expect(response.body[0]).toHaveProperty("name");
});

test("GET /api/products/1 returns product with id 1", async () => {
  const response = await request(app).get("/api/products/1");

  expect(response.status).toBe(200);
  expect(response.body.id).toBe(1);
  expect(response.body.name).toBe("Laptop");
});

test("GET /api/products/999 returns 404 for invalid id", async () => {
  const response = await request(app).get("/api/products/999");

  expect(response.status).toBe(404);
  expect(response.body).toHaveProperty("error");
});
