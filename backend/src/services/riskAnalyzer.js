
const rules = [
  {
    id: "upfront_payment",
    severity: "High",
    points: 40,
    pattern:
      /\b(registration fee|application fee|interview fee|pay to apply|security deposit for job)\b/i,
    explanation:
      "The posting mentions an upfront payment related to recruitment."
  },
  {
    id: "sensitive_information",
    severity: "High",
    points: 40,
    pattern:
      /\b(share your otp|send your otp|upi pin|bank password)\b/i,
    explanation:
      "The posting requests sensitive financial or authentication information."
  },
  {
    id: "unrealistic_income",
    severity: "Medium",
    points: 15,
    pattern:
      /\b(earn lakhs daily|guaranteed huge income|earn \d+ lakhs per month without experience)\b/i,
    explanation:
      "The posting makes an unusually strong income claim."
  },
  {
    id: "urgency_pressure",
    severity: "Low",
    points: 10,
    pattern:
      /\b(apply immediately|limited slots|join today or lose the offer)\b/i,
    explanation:
      "The posting uses urgency-based language."
  }
];

function analyzeJob(description) {
  if (typeof description !== "string" || !description.trim()) {
    throw new Error("A job description is required.");
  }

  const flags = rules
    .filter((rule) => rule.pattern.test(description))
    .map((rule) => ({
      flagType: rule.id,
      severity: rule.severity,
      explanation: rule.explanation
    }));

  const matchedRules = rules.filter((rule) =>
    rule.pattern.test(description)
  );

  const riskScore = Math.min(
    100,
    matchedRules.reduce((total, rule) => total + rule.points, 0)
  );

  let riskLevel = "Low";

  if (riskScore >= 40) {
    riskLevel = "High";
  } else if (riskScore >= 15) {
    riskLevel = "Medium";
  }

  return {
    riskScore,
    riskLevel,
    detectedFlags: flags,
    analysisVersion: "rules-v1",
    disclaimer:
      "This screening identifies warning signs; it does not prove a job is fraudulent."
  };
}

module.exports = { analyzeJob };
