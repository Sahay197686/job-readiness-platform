import { analyzeJD } from './analysisLogic.js';

console.log("--- TEST 1: Standard Schema Check ---");
const result1 = analyzeJD("Required skills: Java, Python, React, SQL, AWS, Selenium", "TestCorp", "SDE");
const requiredFields = [
    'id', 'createdAt', 'updatedAt', 'company', 'role', 'jdText',
    'extractedSkills', 'roundMapping', 'checklist', 'plan7Days',
    'questions', 'baseScore', 'skillConfidenceMap', 'finalScore'
];
const missing = requiredFields.filter(f => result1[f] === undefined);
console.log(`Missing fields: ${missing.length > 0 ? missing.join(", ") : "None"}`);
console.log(`Score: Base=${result1.baseScore}, Final=${result1.finalScore}`);
console.log(`Skills web: ${result1.extractedSkills.web.join(", ")}`);

console.log("\n--- TEST 2: Empty Skills Fallback ---");
const result2 = analyzeJD("This is a simple text with no technical keywords.", "SmallBiz", "Worker");
console.log(`Other skills: ${result2.extractedSkills.other.join(", ")}`);
console.log(`Plan Day 1 focus: ${result2.plan7Days[0].focus}`);

console.log("\n--- TEST 3: Score Stability Base Logic ---");
console.log(`Result 1 Base Score: ${result1.baseScore}`);
// Final score starts as base score
console.log(`Result 1 Final Score matches Base: ${result1.finalScore === result1.baseScore}`);
