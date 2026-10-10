export const CONTACT = {
  email: "abhishek.guda123@gmail.com",
  phone: "+91 9391732446",
  location: "Hyderabad, India",
  linkedin: "https://linkedin.com/in/Guda-Abhishek" as string | null,
  github: "https://github.com/Guda-Abhishek" as string | null,
  socialName: "Guda-Abhishek",
};

export const NAV = [
  ["home", "Home"],
  ["experience", "Episodes"],
  ["projects", "Originals"],
  ["skills", "Skills Universe"],
  ["certifications", "Certifications"],
  ["contact", "Contact"],
] as const;

export const MISSIONS = [
  {
    id: "01",
    company: "Paves Technologies",
    role: "Software Development Intern — Frontend (UI)",
    period: "May 2026 – Present",
    location: "Hyderabad",
    projects: [
      {
        name: "Accounts Receivable Module — Enterprise Finance Platform",
        points: [
          "Developed responsive React.js screens for invoice listing, payment tracking, and ageing views.",
          "Built reusable UI components.",
          "Integrated REST APIs with loading, empty, error, and validation states.",
          "Developed searchable and filterable data tables with pagination.",
          "Collaborated with backend and QA teams on Agile sprints, defect fixes, code reviews, and release verification.",
        ],
      },
      {
        name: "Intranet Frontend — Internal Employee Portal",
        points: [
          "Built reusable React.js interfaces for employee workflows.",
          "Implemented role-based navigation, protected routes, and form validation.",
          "Integrated REST APIs for data retrieval and form submissions.",
          "Collaborated with designers and backend developers.",
        ],
      },
    ],
    tags: ["React.js", "REST APIs", "Data Tables", "Agile"],
  },
  {
    id: "02",
    company: "Bilvantis Technologies",
    role: "AI Intern — Frontend & API Integration",
    period: "Feb 2025 – Apr 2025",
    location: "",
    projects: [
      {
        name: "NEO AI — AI Product Interface",
        points: [
          "Developed responsive React.js interfaces for AI-driven features.",
          "Integrated AI service APIs with request handling, response parsing, retries, and error handling.",
          "Optimized API communication and frontend rendering, reducing user-facing delays by approximately 25%.",
          "Collaborated with backend and product teams on AI-generated metrics and analytics.",
        ],
      },
    ],
    tags: ["React.js", "AI APIs", "Performance"],
  },
];

export const PROJECTS = [
  {
    title: "AI Farmer-to-Buyer Marketplace",
    badge: "Smart India Hackathon 2023",
    hue: "primary",
    overview: "A MERN-based marketplace concept connecting farmers directly with buyers through AI-assisted price suggestions and matching.",
    problem: "Farmers often lack fair price discovery and direct access to buyers.",
    role: "Designed system architecture, data flow and feasibility analysis; worked on AI/ML logic for price suggestions and buyer-seller matching.",
    flow: ["Farmer listing", "AI price suggestion", "Buyer matching", "Deal"],
    tech: ["MERN Stack", "Python", "AI/ML", "System Design"],
  },
  {
    title: "IoT–AI Disaster Notification & Coastal Safety System",
    badge: "MSME Innovation Programme 2024",
    hue: "accent",
    overview: "A coastal safety monitoring and early-warning concept using IoT sensor inputs, AI analysis and a real-time notification flow.",
    problem: "Coastal visitors and communities need timely warnings about hazardous conditions.",
    role: "Worked on the real-time notification flow and AI-based analysis of sensor data. Recognized under the Government of India MSME Innovation Programme 2024.",
    flow: ["IoT sensors", "AI analysis", "Risk detection", "Alerts"],
    tech: ["Python", "IoT", "AI alerts", "Web UI"],
  },
  {
    title: "NEO AI — Enterprise AI Product Interface",
    badge: "Bilvantis Technologies · 2025",
    hue: "violet",
    overview: "A responsive React interface integrating AI-service APIs, with optimization associated with approximately 25% reduction in user-facing delays.",
    problem: "AI-driven features need reliable request handling and a responsive interface.",
    role: "As AI Intern, developed React UI, integrated AI-service APIs with response parsing, retries and error handling, and optimized API communication and rendering.",
    flow: ["React UI", "AI-service APIs", "Response handling"],
    tech: ["React", "REST APIs", "AI UI", "Performance tuning"],
  },
  {
    title: "TKR IT Department Portal",
    badge: "TKR College · 2023",
    hue: "violet",
    overview: "Official website for the IT department of TKR College of Engineering & Technology.",
    problem: "The department needed a manageable, responsive web presence.",
    role: "Built the responsive React.js frontend, Node.js/Express APIs and MongoDB-based content management.",
    flow: ["React UI", "Express API", "MongoDB CMS"],
    tech: ["MERN", "React.js", "Node.js", "Express", "MongoDB"],
  },
] as const;

export const SKILLS: { cat: string; desc: string; items: string[] }[] = [
  { cat: "Programming Languages", desc: "Core languages used across coursework and projects.", items: ["JavaScript", "Java", "Python", "C", "SQL"] },
  { cat: "Frontend & Frameworks", desc: "Building interfaces and APIs end to end.", items: ["React.js", "Node.js", "Express.js", "MERN Stack", "HTML5", "CSS3", "Tailwind CSS", "REST APIs"] },
  { cat: "AI & Generative AI", desc: "Working with LLM-powered systems.", items: ["Generative AI", "Large Language Models", "RAG", "Prompt Engineering", "AI Agents", "AI-SDLC", "LangChain concepts", "AI-Assisted Development"] },
  { cat: "Machine Learning", desc: "Foundations of learning systems.", items: ["Supervised & Unsupervised Learning", "Model Training & Evaluation", "Neural Networks", "NLP"] },
  { cat: "Databases", desc: "Relational and document stores.", items: ["MySQL", "MongoDB", "PostgreSQL"] },
  { cat: "Cloud & Dev Tools", desc: "Platforms and everyday tooling.", items: ["Oracle Cloud Infrastructure", "Microsoft Azure", "AWS Fundamentals", "Git", "GitHub", "Postman", "Swagger", "VS Code", "Jupyter Notebook", "Docker"] },
  { cat: "Engineering Practices", desc: "How the work gets shipped.", items: ["SDLC", "Agile Collaboration", "AI-SDLC", "Sprint-Based Development", "Code Reviews", "Unit Testing", "Debugging"] },
];

export const CERTS = [
  ["Oracle Generative AI Professional", "Oracle"],
  ["Oracle Cloud Infrastructure Foundations", "Oracle"],
  ["Generative AI", "UpGrad / Microsoft Azure"],
  ["Getting Started with AI", "IBM"],
  ["Elements of AI", "MinnaLearn / Google"],
  ["Machine Learning", "Internshala"],
  ["Joy of Python", "NPTEL"],
  ["Android App Development", "Internshala"],
] as const;

export const MILESTONES = [
  ["2022 – Present", "IEEE Membership Committee, TKR College", "Outreach activities increased chapter participation by around 15%."],
  ["2022 – Present", "Student Coordinator, IT Branch", "Planned and managed departmental events for more than 250 participants."],
  ["2022 – 2026", "Class Representative, IT Branch", "Coordinated communication between students and faculty."],
  ["2024", "MSME Innovation Programme", "Recognition for two innovation projects."],
] as const;
