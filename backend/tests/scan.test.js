const request = require("supertest");
const app = require("../src/app");

describe("Job Scan API", () => {
  test("rejects a scan request without authentication", async () => {
    const response = await request(app)
      .post("/api/scan")
      .send({
        jobDescription:
          "We are hiring a software developer with JavaScript skills.",
      });

    expect(response.statusCode).toBe(401);
  });

  test("creates a scan for an authenticated user", async () => {
    const email = `scan_${Date.now()}@example.com`;
    const password = "TestPass123!";

    // Register a user to obtain a valid token
    const registerResponse = await request(app)
      .post("/api/user/register")
      .send({
        name: "Scan Test User",
        email,
        password,
      });

    expect(registerResponse.statusCode).toBe(201);

    const token = registerResponse.body.token;

    // Submit a job description for analysis
    const scanResponse = await request(app)
      .post("/api/scan")
      .set("Authorization", `Bearer ${token}`)
      .send({
        jobTitle: "Software Developer",
        companyName: "Example Company",
        sourcePlatform: "LinkedIn",
        jobDescription:
          "Please pay a registration fee before applying for this software developer position.",
        jobUrl: "https://example.com/jobs/123",
      });

    expect(scanResponse.statusCode).toBe(201);
    expect(scanResponse.body.success).toBe(true);
    expect(scanResponse.body.data).toHaveProperty("riskScore");
    expect(scanResponse.body.data).toHaveProperty("riskLevel");
    expect(scanResponse.body.data.detectedFlags.length).toBeGreaterThan(0);
  }, 15000);

  
  test("returns scan history for an authenticated user", async () => {
    const email = `history_${Date.now()}@example.com`;

    const registerResponse = await request(app)
      .post("/api/user/register")
      .send({
        name: "History Test User",
        email,
        password: "TestPass123!",
      });

    expect(registerResponse.statusCode).toBe(201);

    const token = registerResponse.body.token;

    // Create a scan for this user
    const scanResponse = await request(app)
      .post("/api/scan")
      .set("Authorization", `Bearer ${token}`)
      .send({
         jobTitle: "Software Developer",
         companyName: "Example Company",
         sourcePlatform: "LinkedIn",
         jobDescription:
           "Please pay a registration fee before applying for this software developer position.",
      });

    expect(scanResponse.statusCode).toBe(201);

    // Retrieve this user's scan history
    const historyResponse = await request(app)
      .get("/api/scan")
      .set("Authorization", `Bearer ${token}`);

    expect(historyResponse.statusCode).toBe(200);
    expect(historyResponse.body.success).toBe(true);
    expect(historyResponse.body.total).toBeGreaterThanOrEqual(1);
    expect(historyResponse.body.data.length).toBeGreaterThanOrEqual(1);

    // History should not expose the full job description
    expect(historyResponse.body.data[0]).not.toHaveProperty(
       "jobDescription"
    );
  }, 20000);

  
  test("deletes a scan owned by the authenticated user", async () => {
    const email = `delete_${Date.now()}@example.com`;

    const registerResponse = await request(app)
      .post("/api/user/register")
      .send({
        name: "Delete Test User",
        email,
        password: "TestPass123!",
      });

    expect(registerResponse.statusCode).toBe(201);

    const token = registerResponse.body.token;

    const scanResponse = await request(app)
      .post("/api/scan")
      .set("Authorization", `Bearer ${token}`)
      .send({
        jobTitle: "Software Developer",
        companyName: "Example Company",
        sourcePlatform: "LinkedIn",
        jobDescription:
           "Please pay a registration fee before applying for this software developer position.",
      });

    expect(scanResponse.statusCode).toBe(201);

    const scanId = scanResponse.body.data._id;

    const deleteResponse = await request(app)
      .delete(`/api/scan/${scanId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(deleteResponse.statusCode).toBe(200);
    expect(deleteResponse.body.success).toBe(true);
  }, 20000);
  
  
  test("prevents a user from deleting another user's scan", async () => {
    // Register User A
    const userA = await request(app)
      .post("/api/user/register")
      .send({
        name: "User A",
        email: `usera_${Date.now()}@example.com`,
        password: "TestPass123!",
      });

    expect(userA.statusCode).toBe(201);

    // User A creates a scan
    const scan = await request(app)
      .post("/api/scan")
      .set("Authorization", `Bearer ${userA.body.token}`)
      .send({
        jobTitle: "Software Developer",
        companyName: "Example Company",
        sourcePlatform: "LinkedIn",
        jobDescription:
           "Please pay a registration fee before applying for this software developer position.",
      });

    expect(scan.statusCode).toBe(201);

    // Register User B
    const userB = await request(app)
      .post("/api/user/register")
      .send({
        name: "User B",
        email: `userb_${Date.now()}@example.com`,
        password: "TestPass123!",
      });

    expect(userB.statusCode).toBe(201);

    // User B attempts to delete User A's scan
    const response = await request(app)
      .delete(`/api/scan/${scan.body.data._id}`)
      .set("Authorization", `Bearer ${userB.body.token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  }, 20000);
  

  
  test("rejects an invalid scan ID when deleting", async () => {
    const registerResponse = await request(app)
      .post("/api/user/register")
      .send({
         name: "Invalid ID Test User",
         email: `invalidid_${Date.now()}@example.com`,
         password: "TestPass123!",
      });

    expect(registerResponse.statusCode).toBe(201);

    const response = await request(app)
      .delete("/api/scan/not-a-valid-id")
      .set("Authorization", `Bearer ${registerResponse.body.token}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  
  test("returns paginated scan history", async () => {
    const registerResponse = await request(app)
      .post("/api/user/register")
      .send({
         name: "Pagination Test User",
         email: `pagination_${Date.now()}@example.com`,
         password: "TestPass123!",
      });

    expect(registerResponse.statusCode).toBe(201);

    const response = await request(app)
      .get("/api/scan?page=1&limit=5")
      .set("Authorization", `Bearer ${registerResponse.body.token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.page).toBe(1);
    expect(response.body.limit).toBe(5);
    expect(response.body.data.length).toBeLessThanOrEqual(5);
  });


});
