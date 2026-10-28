const request = require("supertest");
const app = require("../src/app");

describe("User Registration", () => {
  test("rejects registration when required fields are missing", async () => {
    const response = await request(app)
      .post("/api/user/register")
      .send({});

    expect(response.statusCode).toBe(400);
  });

  test("registers a new user successfully", async () => {
    const response = await request(app)
    .post("/api/user/register")
    .send({
      name: "Test User",
      email: `test_${Date.now()}@example.com`,
      password: "TestPass123!",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty("token");
  }, 15000);

  
  test("logs in an existing user successfully", async () => {
    const email = `login_${Date.now()}@example.com`;
    const password = "TestPass123!";

    // Register a user first
    const registerResponse = await request(app)
      .post("/api/user/register")
      .send({
        name: "Login Test User",
        email,
        password,
      });

    expect(registerResponse.statusCode).toBe(201);

    // Log in with the same credentials
    const loginResponse = await request(app)
      .post("/api/user/login")
      .send({
        email,
        password,
      });

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.success).toBe(true);
    expect(loginResponse.body).toHaveProperty("token");
  }, 15000);

  
  test("returns the profile of an authenticated user", async () => {
    const email = `profile_${Date.now()}@example.com`;

    const registerResponse = await request(app)
      .post("/api/user/register")
      .send({
        name: "Profile Test User",
        email,
        password: "TestPass123!",
      });

    expect(registerResponse.statusCode).toBe(201);

    const token = registerResponse.body.token;

    const profileResponse = await request(app)
     .get("/api/user/me")
     .set("Authorization", `Bearer ${token}`);

    expect(profileResponse.statusCode).toBe(200);
    expect(profileResponse.body.success).toBe(true);
    expect(profileResponse.body.user.email).toBe(email);
  }, 15000);
 

});
