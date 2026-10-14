// All site content lives here — edit this file to update the portfolio.

export const profile = {
  name: 'Gatlin A',
  role: 'AI Engineer · ML · Backend',
  summary:
    'Computer Science undergraduate specializing in Machine Learning, Deep Learning, and AI Engineering, with hands-on experience building custom neural networks, LLM-based agents, anomaly detection systems, and computer vision pipelines. Strong in Python and PyTorch, with experience developing AI workflows and backend systems.',
  email: 'malexgatlin@gmail.com',
  phone: '+91 8610684137',
  github: 'https://github.com/Gatlin-official',
  githubHandle: 'Gatlin-official',
  linkedin: 'https://www.linkedin.com/in/gatlin-a-699a58385',
  linkedinHandle: 'gatlin-a-699a58385',
  resume: './Gatlin_A_Resume.pdf',
  location: 'Tamil Nadu, India',
}

export const splashes = [
  'Now with 100% more PyTorch!',
  'Trained from scratch!',
  'Every answer has a proof!',
  'Runs on 8GB of VRAM!',
  'Open to internships!',
  'Also try FastAPI!',
  'Attention is all you need!',
  'Residual connections!',
]

export const education = [
  {
    school: 'Karunya University, Tamil Nadu',
    degree: 'B.Tech — Computer Science and Engineering',
    period: '2024 – Present',
  },
  {
    school: 'Good Shepherd Model School, Tuticorin',
    degree: 'Higher Secondary — Computer Science & Mathematics',
    period: '2022 – 2024',
  },
]

// Each skill category is one row of the inventory. `color` tints the item gem.
export const skills = [
  { category: 'Languages', color: '#f2c94c', items: ['Python', 'Java', 'C', 'TypeScript'] },
  {
    category: 'Machine Learning',
    color: '#4fd6e0',
    items: ['PyTorch', 'Machine Learning', 'Deep Learning', 'NLP', 'Neural Networks', 'Computer Vision', 'Anomaly Detection'],
  },
  {
    category: 'LLM / AI',
    color: '#b57bff',
    items: ['LLMs', 'AI Agents', 'Prompt Engineering', 'Tokenization', 'Embeddings', 'Attention', 'LLM APIs'],
  },
  { category: 'Backend', color: '#ff6b5a', items: ['FastAPI', 'Flask', 'Node.js', 'REST APIs'] },
  { category: 'Databases', color: '#3e8ef7', items: ['PostgreSQL', 'MySQL', 'Redis', 'Firebase'] },
  { category: 'Tools', color: '#57c75e', items: ['Git', 'GitHub', 'Docker', 'Linux', 'VS Code'] },
  { category: 'Core CS', color: '#e0e0e0', items: ['DSA', 'OOP', 'DBMS'] },
]

export const experience = [
  {
    title: 'Web Development Intern',
    org: 'D Data Technologies',
    period: 'June 2026',
    points: [
      'Completed a 4-week internship contributing to web application development tasks.',
      'Applied programming, debugging, and API integration practices in a professional environment.',
    ],
  },
]

// `block` picks the texture for the project's 3D block icon (see textures.js).
export const projects = [
  {
    name: 'Azii',
    repo: 'https://github.com/Gatlin-official/Azii', // GitHub repo URL; empty falls back to your profile
    tagline: 'Custom AI Language Model',
    block: 'diamond',
    tech: ['Python', 'PyTorch', 'NLP', 'FastAPI', 'React'],
    points: [
      'Built a ~27M-parameter GPT-style language model from scratch in PyTorch, with a custom byte-level BPE tokenizer (4,096 vocab), causal self-attention, and residual transformer blocks.',
      'Pretrained on ~485M tokens of TinyStories, then chat-finetuned on SODA dialogues with loss masking and a custom identity — all on an 8GB laptop GPU.',
      'Shipped a streaming FastAPI + React chat UI with a live token view showing exactly which BPE tokens the model reads and writes.',
    ],
  },
  {
    name: 'Autonomous LLM Agent',
    repo: 'https://github.com/Gatlin-official/minecraft-llm-agent',
    tagline: 'Agent & Tool-Use Framework',
    block: 'redstone',
    tech: ['Python', 'Qwen', 'Node.js', 'REST APIs'],
    points: [
      'LLM agent that converts high-level goals into structured, executable actions — with planning, short- and long-term memory, JSON outputs, action validation, and failure recovery.',
      'Integrated a locally hosted Qwen model via an OpenAI-compatible API; built an execution-feedback loop and refined prompt constraints to reduce invalid and repeated actions.',
    ],
  },
  {
    name: 'Cynova',
    repo: 'https://github.com/Jeshurun-Pon-Mcgrath/SIH-2026',
    tagline: 'Adaptive Forward Validation for Anomaly Detection',
    block: 'lapis',
    tech: ['Python', 'PyTorch', 'Autoencoder'],
    points: [
      'Designed an Adaptive Forward Validation framework using future-evidence windows and persistence thresholds to separate transient anomalies from persistent events.',
      'Trained an autoencoder on ~1 year of multivariate NOAA ASOS weather data (temperature, pressure, humidity, dew point) and produced validated incident-level results.',
    ],
  },
  {
    name: 'Zynex',
    repo: 'https://github.com/Jeshurun-Pon-Mcgrath/HackNex_PS01',
    tagline: 'Proof-Carrying Legal Evidence Workspace',
    block: 'emerald',
    tech: ['Python', 'FastAPI', 'Ollama', 'ChromaDB', 'React', 'TypeScript'],
    points: [
      'Local, offline RAG workspace for Indian criminal case files (FIRs, arrest memos, bail orders): every answer sentence carries its exact source quote, who asserted it, and the checks it passed — or a reasoned refusal.',
      'Runs qwen3:8b + nomic-embed-text via Ollama on an 8GB laptop GPU; drafts bail applications and blocks them while any critical field is missing or conflicting.',
      'Against conventional RAG on real High Court / Supreme Court orders: 0 invented citations (vs 6), 0 misquotes (vs 15), 25/25 retrieval recall, ~2x faster per question.',
    ],
  },
  {
    name: 'ProofLens',
    repo: 'https://github.com/Jeshurun-Pon-Mcgrath/HackNex',
    tagline: 'Proof-Carrying Data Analyst Agent',
    block: 'gold',
    tech: ['Python', 'FastAPI', 'pandas', 'Ollama', 'React', 'TypeScript'],
    points: [
      'Agent that answers questions over messy multi-table CSV/Excel data and documents, where every number comes from a standalone, re-runnable Python proof script — or a refusal certificate explaining what data is missing.',
      'LLM acts only as planner and code writer: a deterministic trap scanner (duplicates, mixed currencies, ambiguous dates, cross-table contradictions), premise audit, and a "number firewall" stop invented numbers.',
      'Proof Strength ladder (L0–L3) verifies answers by fresh-process re-runs with SHA-256-pinned inputs; exports a judge kit that re-checks every claim in one command. Runs locally on qwen3:8b.',
    ],
  },
  {
    name: 'HaveNBloom',
    repo: 'https://github.com/Jeshurun-Pon-Mcgrath/HaveNBloom',
    tagline: 'AI-Powered Full-Stack App',
    block: 'grass',
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    points: [
      'Full-stack app with AI-powered resume analysis and skill enhancement, integrating model processing with backend services and database workflows.',
    ],
  },
]

export const certifications = [
  { title: 'Intermediate Machine Learning', issuer: 'Kaggle', date: 'Aug 2026', icon: 'diamond' },
  { title: 'Introduction to Modern AI', issuer: 'Cisco Networking Academy', date: 'Aug 2026', icon: 'book' },
  { title: 'AI Fundamentals: Foundations for Understanding AI', issuer: 'Cisco Networking Academy', date: 'Sep 2026', icon: 'star' },
  { title: 'CCNA: Enterprise Networking, Security, and Automation', issuer: 'Cisco Networking Academy', date: null, icon: 'gear' },
]
