const { analyzeJob } = require("../src/services/riskAnalyzer");

describe("JobShield Risk Analyzer", () => {
  test("detects upfront payment requests", () => {
    const result = analyzeJob(
      "Please pay a registration fee before applying for this job opportunity."
    );

    expect(result.detectedFlags.length).toBeGreaterThan(0);
    expect(result.riskLevel).toBe("High");
  });

  test("returns a low risk score for ordinary job descriptions", () => {
    const result = analyzeJob(
      "We are hiring a software developer with JavaScript and React skills. Candidates will attend a technical interview."
    );

    expect(result.riskScore).toBe(0);
    expect(result.detectedFlags).toHaveLength(0);
  });
});