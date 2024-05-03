const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");

beforeAll(async () => {
  let users = require("../users.json");
  users.map((e) => {
    e.createdAt = new Date();
    e.updatedAt = new Date();
    e.password = hashPassword(e.password);
    return e;
  });
  const categories = require("../categories.json");
  categories.map((e) => {
    e.createdAt = new Date();
    e.updatedAt = new Date();
    return e;
  });
  const articles = require("../articles.json");
  articles.map((e) => {
    e.createdAt = new Date();
    e.updatedAt = new Date();
    return e;
  });
  await sequelize.queryInterface.bulkInsert("Users", users);
  await sequelize.queryInterface.bulkInsert("Categories", categories);
  await sequelize.queryInterface.bulkInsert("Articles", articles);
});

describe.skip("Get all articles", () => {
  test("Should return email, role, access_token and status 200", async () => {
    const response = await request(app)
      .get("/articles")
      .set("Authorization", process.env.ADMIN_TOKEN_EXAMPLE);

    expect(response.status).toBe(200);
  });
});

describe.skip("Create new article", () => {
  test("Should return created article with attributes of (id, title, content, imgUrl, categoryId, authorId) and status 201 ", async () => {
    const article = {
      title: "Jest testing",
      content: "Jest content",
      imgUrl: "Jest imgUrl",
      categoryId: 1,
    };
    const response = await request(app)
      .post("/articles")
      .send(article)
      .set("Authorization", process.env.ADMIN_TOKEN_EXAMPLE);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("title", expect.any(String));
    expect(response.body).toHaveProperty("content", expect.any(String));
    expect(response.body).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body).toHaveProperty("categoryId", expect.any(Number));
    expect(response.body).toHaveProperty("authorId", expect.any(Number));
  });
});

describe("Create article without user credentials", () => {
  test("Should return 'Invalid user credentials' message and status 401", async () => {
    const article = {
      title: "Jest testing",
      content: "Jest content",
      imgUrl: "Jest imgUrl",
      categoryId: 1,
    };
    const response = await request(app)
      .post("/articles")
      .send(article)
      .set("Authorization", null);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid user credentials");
  });
});

describe.skip("Create article with invalid token", () => {
  test("Should return 'Invalid user credentials' message and status 401", async () => {
    const article = {
      title: "Jest testing",
      content: "Jest content",
      imgUrl: "Jest imgUrl",
      categoryId: 1,
    };
    const response = await request(app)
      .post("/articles")
      .send(article)
      .set("Authorization", process.env.INVALID_TOKEN_EXAMPLE);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid user credentials");
  });
});

describe.skip("Create article with invalid data", () => {
  test("Should return array of validation error message and status 400", async () => {
    const article = {
      title: "",
      content: "",
      imgUrl: "jest image",
      categoryId: 1,
    };
    const response = await request(app)
      .post("/articles")
      .send(article)
      .set("Authorization", process.env.ADMIN_TOKEN_EXAMPLE);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: ["Title cannot be empty", "Content cannot be empty"],
    });
  });
  test("Should return title validation error message and status 400", async () => {
    const article = {
      title: "",
      content: "tes",
      imgUrl: "jest image",
      categoryId: 1,
    };
    const response = await request(app)
      .post("/articles")
      .send(article)
      .set("Authorization", process.env.ADMIN_TOKEN_EXAMPLE);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", ["Title cannot be empty"]);
  });
  test("Should return content validation error message and status 400", async () => {
    const article = {
      title: "tes",
      imgUrl: "jest image",
      categoryId: 1,
    };
    const response = await request(app)
      .post("/articles")
      .send(article)
      .set("Authorization", process.env.ADMIN_TOKEN_EXAMPLE);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", ["Content cannot be null"]);
  });
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Categories", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Articles", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
