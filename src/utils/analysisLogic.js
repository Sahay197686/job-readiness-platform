import { getCompanyIntel } from './intelHeuristics';

const SKILL_CATEGORIES = {
    "Core CS": ["DSA", "OOP", "DBMS", "OS", "Networks"],
    "Languages": ["Java", "Python", "JavaScript", "TypeScript", "C", "C++", "C#", "Go"],
    "Web": ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL"],
    "Data": ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis"],
    "Cloud/DevOps": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux"],
    "Testing": ["Selenium", "Cypress", "Playwright", "JUnit", "PyTest"]
};

export const analyzeJD = (jdText, company, role) => {
    const extractedSkills = {};
    let detectedCount = 0;
    let categoriesPresent = 0;

    Object.entries(SKILL_CATEGORIES).forEach(([category, skills]) => {
        const found = skills.filter(skill =>
            jdText.toLowerCase().includes(skill.toLowerCase())
        );
        if (found.length > 0) {
            extractedSkills[category] = found;
            categoriesPresent++;
            detectedCount += found.length;
        }
    });

    // 1. Skill Extraction confirmation
    if (Object.keys(extractedSkills).length === 0) {
        extractedSkills["General"] = ["General fresher stack"];
    }

    // 2. Readiness Score
    let score = 35;
    score += Math.min(categoriesPresent * 5, 30);
    if (company && company.trim()) score += 10;
    if (role && role.trim()) score += 10;
    if (jdText.length > 800) score += 10;
    score = Math.min(score, 100);

    // 3. Round-wise Preparation Checklist
    const allDetected = Object.values(extractedSkills).flat();
    const checklist = [
        {
            round: "Round 1: Aptitude / Basics",
            items: ["Quantitative Aptitude revision", "Logical Reasoning practice", "Basic programming syntax", "Verbal ability mock test", "Understanding job requirements"]
        },
        {
            round: "Round 2: DSA + Core CS",
            items: [
                "Array & String manipulation",
                "Hashing & Search algorithms",
                allDetected.includes("DSA") ? "Advanced Graph/DP problems" : "Linked List & Stack/Queue basics",
                "OOP concepts (Inheritance/Polymorphism)",
                "DBMS basics (ACID properties, Joins)",
                "OS fundamentals (Threads, Paging)"
            ]
        },
        {
            round: "Round 3: Tech Interview (Projects + Stack)",
            items: [
                `Review projects involving ${allDetected[0] || 'core technologies'}`,
                "In-depth explanation of system architecture",
                ...Object.entries(extractedSkills).map(([cat, skills]) => `Deep dive into ${skills.join(", ")}`)
            ]
        },
        {
            round: "Round 4: Managerial / HR",
            items: ["Drafting 'Tell me about yourself'", "Preparing 'Why this company?'", "Situation-based (STAR) answers", "Salary negotiation basics", "Asking insightful questions"]
        }
    ];

    // 4. 7-Day Plan
    const dayPlan = [
        { day: "Day 1-2", topics: "Basics + Core CS (OS, DBMS, OOP)" },
        { day: "Day 3-4", topics: `DSA + Coding Practice (${allDetected.slice(0, 3).join(", ") || 'General Problems'})` },
        { day: "Day 5", topics: `Project + Resume alignment (${extractedSkills["Web"] ? 'Focus on Frontend/Backend logic' : 'Focus on logic flows'})` },
        { day: "Day 6", topics: "Mock Interview questions & revision" },
        { day: "Day 7", topics: "Revision + targeting weak areas" }
    ];

    // 5. 10 Likely Interview Questions
    const questions = [];
    if (jdText.toLowerCase().includes("sql")) questions.push("Explain indexing and how it improves query performance.");
    if (jdText.toLowerCase().includes("react")) questions.push("Explain state management options in React and when to use context vs Redux.");
    if (jdText.toLowerCase().includes("dsa")) questions.push("How would you optimize search/retrieval in a large sorted dataset?");
    if (jdText.toLowerCase().includes("java")) questions.push("Explain the difference between interface and abstract class with examples.");
    if (jdText.toLowerCase().includes("docker")) questions.push("How does containerization differ from virtualization?");
    if (jdText.toLowerCase().includes("rest")) questions.push("What are the key principles of a RESTful API?");

    // Fill generic if not enough
    while (questions.length < 10) {
        const generic = [
            "Explain your most challenging project and how you overcame technical hurdles.",
            "How do you handle conflict in a team environment?",
            "Tell me about a time you had to learn a new technology quickly.",
            "What is your approach to debugging complex code?",
            "How do you ensure code quality and maintainability?",
            "Where do you see yourself in 3 years technically?"
        ];
        const pick = generic[questions.length % generic.length];
        if (!questions.includes(pick)) questions.push(pick);
        else break; // Safety break
    }

    // NEW: Company Intel and Round Mapping
    const companyIntel = getCompanyIntel(company, allDetected);

    return {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        company,
        role,
        jdText,
        extractedSkills,
        dayPlan,
        checklist,
        questions,
        readinessScore: score,
        companyIntel // Persisted
    };
};

export const saveToHistory = (analysis) => {
    const history = JSON.parse(localStorage.getItem('placement_history') || '[]');
    history.unshift(analysis);
    localStorage.setItem('placement_history', JSON.stringify(history));
};

export const getHistory = () => {
    return JSON.parse(localStorage.getItem('placement_history') || '[]');
};

export const getAnalysisById = (id) => {
    const history = getHistory();
    return history.find(a => a.id === id);
};
export const updateAnalysis = (updatedAnalysis) => {
    const history = getHistory();
    const index = history.findIndex(a => a.id === updatedAnalysis.id);
    if (index !== -1) {
        history[index] = updatedAnalysis;
        localStorage.setItem('placement_history', JSON.stringify(history));
    }
};
