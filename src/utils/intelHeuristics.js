/**
 * Heuristic rules for Company Intel and Round Mapping
 */

const ENTERPRISE_COMPANIES = [
    'amazon', 'microsoft', 'google', 'meta', 'apple', 'netflix',
    'infosys', 'tcs', 'wipro', 'hcl', 'accenture', 'capgemini',
    'cognizant', 'ibm', 'oracle', 'cisco', 'sap', 'adobe', 'salesforce'
];

const INDUSTRY_KEYWORDS = {
    'Financial Services': ['bank', 'financial', 'insurance', 'capital', 'fintech', 'investment'],
    'E-commerce': ['amazon', 'flipkart', 'ebay', 'shop', 'retail', 'commerce'],
    'Cloud Computing': ['aws', 'azure', 'cloud', 'saas'],
    'Consulting': ['consulting', 'services', 'solutions', 'accenture', 'tcs', 'infosys'],
    'Social Media': ['facebook', 'meta', 'twitter', 'linkedin', 'instagram', 'tiktok'],
};

export const getCompanyIntel = (companyName = "", skills = []) => {
    const name = companyName.toLowerCase();

    // 1. Determine Size Category
    const isEnterprise = ENTERPRISE_COMPANIES.some(c => name.includes(c));
    const sizeCategory = isEnterprise ? "Enterprise (2000+)" : "Startup (<200)";

    // 2. Infer Industry
    let industry = "Technology Services";
    for (const [ind, keywords] of Object.entries(INDUSTRY_KEYWORDS)) {
        if (keywords.some(k => name.includes(k))) {
            industry = ind;
            break;
        }
    }

    // 3. Hiring Focus
    const hiringFocus = isEnterprise
        ? "Structured DSA + Core Fundamentals (OS, DBMS, OOP)"
        : "Practical Problem Solving + Tech Stack Depth (Projects, System Design)";

    // 4. Round Mapping Generation
    const roundMapping = generateRoundMapping(isEnterprise, skills);

    return {
        name: companyName || "Unknown Company",
        industry,
        sizeCategory,
        hiringFocus,
        isEnterprise,
        roundMapping,
        isDemo: true
    };
};

const generateRoundMapping = (isEnterprise, skills = []) => {
    const hasWeb = skills.some(s => ["React", "Node.js", "Express", "Next.js"].includes(s));

    if (isEnterprise) {
        return [
            {
                roundTitle: "Round 1: Online Test",
                focusAreas: ["DSA", "Aptitude", "Speed"],
                whyItMatters: "To filter candidates based on algorithmic thinking and speed."
            },
            {
                roundTitle: "Round 2: Technical Interview I",
                focusAreas: ["DSA", "Core CS Fundamentals"],
                whyItMatters: "Focuses on fundamental problem solving and computer science basics."
            },
            {
                roundTitle: "Round 3: Tech + Projects",
                focusAreas: ["Architecture", "System Design", "Deep Dive"],
                whyItMatters: "Assesses how you apply concepts to real projects and system design."
            },
            {
                roundTitle: "Round 4: HR / Behavioral",
                focusAreas: ["Cultural Fit", "STAR Method", "Aptitude"],
                whyItMatters: "Ensures alignment with company values and long-term potential."
            }
        ];
    } else {
        // Startup Logic
        return [
            {
                roundTitle: "Round 1: Practical Coding",
                focusAreas: hasWeb ? ["React/JS Task", "Live Coding"] : ["Problem Solving", "Live Coding"],
                whyItMatters: "Verifies you can actually build things in a real-world environment."
            },
            {
                roundTitle: "Round 2: System Discussion",
                focusAreas: ["Feature Implementation", "Architecture", "Scalability"],
                whyItMatters: "Tests your ability to think through product requirements and edge cases."
            },
            {
                roundTitle: "Round 3: Culture Fit",
                focusAreas: ["Ownership", "Growth Mindset", "Startup Pace"],
                whyItMatters: "Crucial for startups to ensure you take initiative and fit the fast pace."
            }
        ];
    }
};
