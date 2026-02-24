import { getCompanyIntel } from './intelHeuristics';

const SKILL_CATEGORIES = {
    "coreCS": ["DSA", "OOP", "DBMS", "OS", "Networks"],
    "languages": ["Java", "Python", "JavaScript", "TypeScript", "C", "C++", "C#", "Go"],
    "web": ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL"],
    "data": ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis"],
    "cloud": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux"],
    "testing": ["Selenium", "Cypress", "Playwright", "JUnit", "PyTest"]
};

export const analyzeJD = (jdText, company, role) => {
    const extractedSkills = {
        coreCS: [],
        languages: [],
        web: [],
        data: [],
        cloud: [],
        testing: [],
        other: []
    };

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

    // 3) Default behavior if no skills detected
    if (detectedCount === 0) {
        extractedSkills.other = ["Communication", "Problem solving", "Basic coding", "Projects"];
    }

    // 2) Standardize Analysis Entry Schema - baseScore
    let score = 35;
    score += Math.min(categoriesPresent * 5, 30);
    if (company && company.trim()) score += 10;
    if (role && role.trim()) score += 10;
    if (jdText.length > 800) score += 10;
    const baseScore = Math.min(score, 100);

    const allDetected = Object.values(extractedSkills).flat();

    // Checklist
    const checklist = [
        {
            roundTitle: "Round 1: Aptitude / Basics",
            items: ["Quantitative Aptitude revision", "Logical Reasoning practice", "Basic programming syntax", "Verbal ability mock test", "Understanding job requirements"]
        },
        {
            roundTitle: "Round 2: Technical Fundamentals",
            items: [
                "Array & String manipulation",
                "Hashing & Search algorithms",
                allDetected.includes("DSA") ? "Advanced Graph/DP problems" : "Linked List & Stack/Queue basics",
                "OOP concepts (Inheritance/Polymorphism)",
                "DBMS basics (ACID properties, Joins)",
                "OS fundamentals (Threads, Paging)"
            ]
        }
    ];

    // 7-Day Plan
    const plan7Days = [
        { day: "Day 1-2", focus: "Basics + Core CS", tasks: ["OS fundamentals", "DBMS Joins", "OOP Concepts"] },
        { day: "Day 3-4", focus: "Coding Practice", tasks: [`Solve ${allDetected.slice(0, 3).join(", ") || 'General Problems'}`] },
        { day: "Day 5", focus: "Project Review", tasks: [extractedSkills.web.length > 0 ? "Review Frontend/Backend logic" : "Focus on project architecture"] },
        { day: "Day 6-7", focus: "Mock & Revision", tasks: ["Practice behavioral questions", "Final revision of weak areas"] }
    ];

    // Likely Interview Questions
    const questions = [];
    if (jdText.toLowerCase().includes("sql")) questions.push("Explain indexing and how it improves query performance.");
    if (jdText.toLowerCase().includes("react")) questions.push("Explain state management options in React and when to use context vs Redux.");
    if (jdText.toLowerCase().includes("dsa")) questions.push("How would you optimize search/retrieval in a large sorted dataset?");

    while (questions.length < 10) {
        const generic = [
            "Explain your most challenging project and how you overcame technical hurdles.",
            "How do you handle conflict in a team environment?",
            "Tell me about a time you had to learn a new technology quickly.",
            "What is your approach to debugging complex code?",
            "How do you ensure code quality and maintainability?"
        ];
        const pick = generic[questions.length % generic.length];
        if (!questions.push(pick)) break; // Safety
        if (questions.length >= 10) break;
    }

    const intel = getCompanyIntel(company, allDetected);

    return {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        company: company || "",
        role: role || "",
        jdText,
        extractedSkills,
        roundMapping: intel.roundMapping,
        checklist,
        plan7Days,
        questions: questions.slice(0, 10),
        baseScore,
        skillConfidenceMap: {},
        finalScore: baseScore,
        companyIntel: intel
    };
};

export const saveToHistory = (analysis) => {
    try {
        const history = getHistory();
        history.unshift(analysis);
        localStorage.setItem('placement_history', JSON.stringify(history));
    } catch (e) {
        console.error("Failed to save to history", e);
    }
};

export const getHistory = () => {
    try {
        const raw = localStorage.getItem('placement_history');
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];

        // 5) History robustness: filter corrupted entries gracefully
        return parsed.filter(entry => {
            const isValid = entry && typeof entry === 'object' && entry.id && entry.jdText;
            if (!isValid) {
                console.warn("Corrupted history entry skipped:", entry);
            }
            return isValid;
        });
    } catch (e) {
        console.error("Critical error loading history:", e);
        return [];
    }
};

export const getAnalysisById = (id) => {
    const history = getHistory();
    return history.find(a => a.id === id);
};

export const updateAnalysis = (updatedAnalysis) => {
    try {
        const history = getHistory();
        const index = history.findIndex(a => a.id === updatedAnalysis.id);
        if (index !== -1) {
            updatedAnalysis.updatedAt = new Date().toISOString();
            history[index] = updatedAnalysis;
            localStorage.setItem('placement_history', JSON.stringify(history));
        }
    } catch (e) {
        console.error("Failed to update analysis", e);
    }
};
