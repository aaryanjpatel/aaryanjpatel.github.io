// Node and edge configuration for the neural network portfolio
// Each node has id, label, weight, skills, summary, projects, etc.

export const nodes = [
  {
    id: "Aaryan",
    label: "Aaryan Patel",
    type: "central",
    weight: "strong",
    skills: ["Tech", "Learning", "Self-Improvement", "Problem Solving"],
    summary: "Future Tech Entrepreneur with expertise in AI/ML, learning systems, and strategic problem-solving.",
    projects: ["AI Platform", "Web Dev", "Educational Content"],
  },
  {
    id: "python",
    label: "Python",
    type: "skill",
    weight: "strong",
    skills: ["Data Science", "Automation", "Development"],
    summary: "Programming foundation for data science and automation.",
    projects: ["Data Analysis", "Web Scraping", "ML Models"],
  },
  {
    id: "datasci",
    label: "Data Science",
    type: "skill",
    weight: "strong",
    skills: ["ML", "Analytics", "Visualization"],
    summary: "Data science and machine learning applications.",
    projects: ["Predictive Models", "Analysis Projects"],
  },
  {
    id: "webdev",
    label: "Web Dev",
    type: "skill",
    weight: "medium",
    skills: ["Full-stack", "Responsive Design", "APIs"],
    summary: "Website and web application development.",
    projects: ["Portfolio Site", "Blog Platform"],
  },
  {
    id: "quant",
    label: "Quant Ability",
    type: "skill",
    weight: "medium",
    skills: ["Problem Solving", "Mathematics", "Logical Reasoning"],
    summary: "Quantitative reasoning and problem-solving skills.",
    projects: ["Exam Prep", "Math Challenges"],
  },
  {
    id: "math",
    label: "Mathematics",
    type: "skill",
    weight: "medium",
    skills: ["Algebra", "Geometry", "Statistics"],
    summary: "Mathematical foundations and advanced concepts.",
    projects: ["Problem Sets", "Applications"],
  },
  {
    id: "logic",
    label: "Logical Reasoning",
    type: "skill",
    weight: "medium",
    skills: ["Critical Thinking", "Pattern Recognition", "Analysis"],
    summary: "Logical reasoning and critical analysis skills.",
    projects: ["Reasoning Puzzles", "Case Studies"],
  },
  {
    id: "vocab",
    label: "Vocabulary",
    type: "skill",
    weight: "learning",
    skills: ["Word Building", "Etymology", "Context"],
    summary: "Vocabulary and verbal reasoning development.",
    projects: ["Word Lists", "VR Practice"],
  },
  {
    id: "english",
    label: "English Mastery",
    type: "skill",
    weight: "learning",
    skills: ["Writing", "Communication", "Persuasion"],
    summary: "English language mastery and persuasive communication.",
    projects: ["Essays", "Blog Posts", "Technical Writing"],
  },
  {
    id: "writing",
    label: "Writing",
    type: "skill",
    weight: "learning",
    skills: ["Blog", "Technical Writing", "Content Creation"],
    summary: "Persuasive and technical writing skills.",
    projects: ["Blog Series", "Guides", "Documentation"],
  },
  {
    id: "study",
    label: "Study Systems",
    type: "skill",
    weight: "learning",
    skills: ["Planning", "Organization", "Retention"],
    summary: "Effective learning systems and study strategies.",
    projects: ["Study Guides", "Learning Frameworks"],
  },
  {
    id: "selent",
    label: "Selective Entry",
    type: "skill",
    weight: "medium",
    skills: ["Exam Strategy", "Test Prep", "Performance"],
    summary: "Selective entry exam preparation and strategy.",
    projects: ["Prep Guide", "Practice Tests"],
  },
  {
    id: "timemanage",
    label: "Time Management",
    type: "skill",
    weight: "learning",
    skills: ["Productivity", "Planning", "Prioritization"],
    summary: "Time management and productivity optimization.",
    projects: ["Systems", "Schedules"],
  },
  {
    id: "growth",
    label: "My Business",
    type: "skill",
    weight: "learning",
    skills: ["Web Design", "Web Development", "Business Planning"],
    summary: "My website business with pricing starting from $1500 depending on content, features, and complexity.",
    projects: ["Business Plan", "Client Websites", "Custom Builds"],
  },
];

export const edges = [
  // Core tech connections from center
  { source: "Aaryan", target: "python" },
  { source: "Aaryan", target: "datasci" },
  { source: "Aaryan", target: "webdev" },
  { source: "Aaryan", target: "quant" },
  { source: "Aaryan", target: "english" },
  { source: "Aaryan", target: "study" },
  
  // Tech skill connections
  { source: "python", target: "datasci" },
  { source: "python", target: "webdev" },
  { source: "datasci", target: "math" },
  { source: "datasci", target: "quant" },
  
  // Quantitative connections
  { source: "quant", target: "math" },
  { source: "quant", target: "logic" },
  { source: "math", target: "logic" },
  
  // Reasoning and learning
  { source: "logic", target: "vocab" },
  { source: "logic", target: "study" },
  
  // Language and writing
  { source: "english", target: "vocab" },
  { source: "english", target: "writing" },
  { source: "vocab", target: "writing" },
  
  // Study and exam prep
  { source: "study", target: "selent" },
  { source: "study", target: "timemanage" },
  { source: "selent", target: "quant" },
  { source: "selent", target: "vocab" },
  { source: "selent", target: "logic" },
  
  // Growth and improvement
  { source: "timemanage", target: "growth" },
  { source: "study", target: "growth" },
  { source: "writing", target: "growth" },
];
