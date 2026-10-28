const request = require("supertest");
const app = require("../src/app");

describe("JobShield API", () => {

  test("GET /api/health returns a successful response", async () => {
    const response = await request(app).get("/api/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(
      "JobShield backend is running"
    );
  });

  test("POST /api/scan rejects an unauthenticated request", async () => {
     const response = await request(app)
    .post("/api/scan")
    .send({
      jobDescription: "Fake job",
    });

    expect(response.statusCode).toBe(401);
  });
  
});
