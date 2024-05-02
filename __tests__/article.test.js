const app = require("../app");
const request = require("supertest");

describe("Get all articles", () => {
  test("Should return email, role, access_token and status 200", () => {
    const response = request(app).get("/articles");

    expect(response.status).toBe(200);
  });
});
