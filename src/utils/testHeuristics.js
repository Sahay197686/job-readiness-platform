import { getCompanyIntel } from './intelHeuristics.js';

console.log("--- TEST 1: Enterprise Company (Amazon) ---");
const intel1 = getCompanyIntel("Amazon", ["DSA", "Java"]);
console.log(`Size: ${intel1.sizeCategory}`);
console.log(`Industry: ${intel1.industry}`);
console.log(`Rounds Count: ${intel1.roundMapping.length}`);
console.log(`Round 1: ${intel1.roundMapping[0].round} - ${intel1.roundMapping[0].focus}`);

console.log("\n--- TEST 2: Startup Company (QuickStart AI) ---");
const intel2 = getCompanyIntel("QuickStart AI", ["React", "Node.js"]);
console.log(`Size: ${intel2.sizeCategory}`);
console.log(`Industry: ${intel2.industry}`);
console.log(`Rounds Count: ${intel2.roundMapping.length}`);
console.log(`Round 1: ${intel2.roundMapping[0].round} - ${intel2.roundMapping[0].focus}`);

console.log("\n--- TEST 3: Fintech Startup ---");
const intel3 = getCompanyIntel("PayEase Capital", ["Python", "SQL"]);
console.log(`Size: ${intel3.sizeCategory}`);
console.log(`Industry: ${intel3.industry}`);
