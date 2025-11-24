const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const ROLES = {
  "Frontend Developer": ["HTML", "CSS", "JavaScript", "React", "Git"],
  "Backend Developer": ["Java", "Spring Boot", "SQL", "APIs", "Git"],
  "Data Analyst": ["Excel", "SQL", "Python", "Dashboards", "Statistics"],
};

const ROADMAPS = {
  "Frontend Developer": {
    "Phase 1": "Basics: HTML, CSS, JavaScript",
    "Phase 2": "Advanced: React, State Management, API Integration",
    "Phase 3": "Projects: Portfolio Website, E-commerce App, Deployment",
  },
  "Backend Developer": {
    "Phase 1": "Basics: Java Syntax, OOP, SQL Basics",
    "Phase 2": "Advanced: Spring Boot, REST APIs, Database Design",
    "Phase 3": "Projects: User Auth System, API Gateway, Cloud Deployment",
  },
  "Data Analyst": {
    "Phase 1": "Basics: Excel, Basic SQL, Python Syntax",
    "Phase 2": "Advanced: Pandas, Matplotlib, Complex SQL Queries",
    "Phase 3": "Projects: Sales Dashboard, Predictive Model, Reporting",
  },
};

const normalize = (str) => str.trim().toLowerCase();

app.post("/api/skill-gap", (req, res) => {
  const { targetRole, currentSkills } = req.body;

  if (!targetRole) {
    return res.status(400).json({ error: "Target role is required" });
  }

  const roleKey = Object.keys(ROLES).find(
    (r) => normalize(r) === normalize(targetRole)
  );

  if (!roleKey) {
    return res.status(404).json({
      error:
        "Role not found. Supported roles: Frontend Developer, Backend Developer, Data Analyst",
    });
  }

  const requiredSkills = ROLES[roleKey];
  const userSkillsList = Array.isArray(currentSkills)
    ? currentSkills.map(normalize)
    : currentSkills.split(",").map(normalize);

  const matchedSkills = requiredSkills.filter((skill) =>
    userSkillsList.includes(normalize(skill))
  );
  const missingSkills = requiredSkills.filter(
    (skill) => !userSkillsList.includes(normalize(skill))
  );

  const response = {
    role: roleKey,
    matchedSkills,
    missingSkills,
    recommendations:
      missingSkills.length > 0
        ? `Focus on learning: ${missingSkills.join(", ")}`
        : "Great job! You have all the core skills.",
    suggestedLearningOrder: missingSkills,
  };

  const logEntry = {
    timestamp: new Date().toISOString(),
    targetRole,
    currentSkills,
    results: response,
  };

  fs.appendFile(
    path.join(__dirname, "user_queries.json"),
    JSON.stringify(logEntry) + "\n",
    (err) => {
      if (err) console.error("Failed to save log", err);
    }
  );

  res.json(response);
});

app.post("/api/roadmap", (req, res) => {
  const { targetRole } = req.body;

  if (!targetRole) {
    return res.status(400).json({ error: "Target role is required" });
  }

  const roleKey = Object.keys(ROADMAPS).find(
    (r) => normalize(r) === normalize(targetRole)
  );

  if (!roleKey) {
    return res.json({
      role: targetRole,
      roadmap: {
        "Phase 1": "Learn the basics of the field",
        "Phase 2": "Build small projects and learn frameworks",
        "Phase 3": "Deploy applications and contribute to open source",
      },
    });
  }

  res.json({
    role: roleKey,
    roadmap: ROADMAPS[roleKey],
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
