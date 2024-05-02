const app = require("../app");
const request = require("supertest");

describe("Admin login Passed", () => {
  test("Should return email, role, access_token and status 200", async () => {
    const admin = {
      email: "admin@gmail.com",
      password: "admin",
    };
    const response = await request(app).post("/users/login").send(admin);
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("role", "Admin");
    expect(response.body).toHaveProperty("access_token");
    expect(response.status).toBe(200);
  });
});
describe("Admin Login Failed", () => {
  test("Should return email request message when email field is not filled and status 400 ", async () => {
    const user = {
      password: "staff",
    };
    const response = await request(app).post("/users/login").send(user);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Please input your email");
  });

  test("Should return password request message when password field is not filled and status 400 ", async () => {
    const user = {
      email: "staff@gmail.com",
    };
    const response = await request(app).post("/users/login").send(user);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Please input your password"
    );
  });

  test("Should return invalid user credentials when the entered email doesn't match any user and status 403 ", async () => {
    const user = {
      email: "invalid@gmail.com",
      password: "staff",
    };
    const response = await request(app).post("/users/login").send(user);
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty(
      "message",
      "You have entered an invalid email or password"
    );
  });

  test("Should return invalid user credentials message when the entered password is wrong and status 403 ", async () => {
    const user = {
      email: "staff@gmail.com",
      password: "invalid",
    };
    const response = await request(app).post("/users/login").send(user);
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty(
      "message",
      "You have entered an invalid email or password"
    );
  });
});
