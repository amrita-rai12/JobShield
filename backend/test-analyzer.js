
const { analyzeJob } = require("./src/services/riskAnalyzer");

const description =
  "Software Developer Intern. Pay a registration fee before your interview.";

const result = analyzeJob(description);

console.log(JSON.stringify(result, null, 2));
