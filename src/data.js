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
  { category: 'Languages', color: '#f2c94c', items: ['Python', 'Rust', 'Go', 'Java', 'C', 'TypeScript'] },
  {
    category: 'Machine Learning',
    color: '#4fd6e0',
    items: ['PyTorch', 'Machine Learning', 'Deep Learning', 'NLP', 'Neural Networks', 'Computer Vision', 'Anomaly Detection'],
  },
  {
    category: 'LLM / AI',
    color: '#b57bff',
    items: ['LLMs', 'AI Agents', 'Prompt Engineering', 'Tokenization', 'Embeddings', 'Attention', 'LoRA Fine-tuning', 'LLM Inference', 'Quantization', 'LLM APIs'],
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
    name: 'Pagewise',
    repo: 'https://github.com/Gatlin-official/pagewise',
    tagline: 'Mini LLM Inference Engine (vLLM-style)',
    block: 'obsidian',
    tech: ['Python', 'PyTorch', 'FastAPI'],
    points: [
      'LLM inference engine written from scratch in PyTorch: own Qwen2 model code (GQA, RoPE, SwiGLU), generation loop and scheduler, verified token-for-token against Hugging Face.',
      'KV cache (4.0x decode at 2K context), continuous batching (10.7x throughput at 16 concurrent), and a paged KV cache that fits 71 vs 21 sequences in the same memory (waste 1.5% vs 51%).',
      'int8/int4 weight quantization halves weight memory (942 to 472 MiB) at equal perplexity; OpenAI-compatible SSE server reaches 578 tok/s across 32 streaming clients on an 8GB laptop GPU.',
    ],
  },
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
    name: 'Axii',
    repo: 'https://github.com/Gatlin-official/axii-companion',
    tagline: 'Offline Emotional-Companion Chatbot',
    block: 'emerald',
    tech: ['Python', 'PyTorch', 'LoRA', 'Qwen', 'SQLite'],
    points: [
      'Fully offline companion chatbot: a 4.2M-parameter emotion Transformer trained from scratch on GoEmotions (28 classes, macro-F1 0.445) steers a Qwen2.5-1.5B voice.',
      'Distilled 3.1k support replies from a larger teacher model under a strict rulebook, then LoRA fine-tuned; score on a 39-check behavioural eval rose from 8/39 (base) to 30/39.',
      'Long-term SQLite memory with sensitive-fact handling, and a crisis-safety layer that answers with helplines before the model runs.',
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
    name: 'Harbinger',
    repo: 'https://github.com/Gatlin-official/harbinger-drift',
    tagline: 'Anticipatory ML Drift Response',
    block: 'deepslate',
    tech: ['Python', 'scikit-learn', 'river', 'NumPy'],
    points: [
      'Forecasts harmful distribution shift from a leading signal and picks an action (retrain, replay, rollback or none) instead of reacting after accuracy drops.',
      'Compared threshold, expected-cost and LinUCB policies against reactive ADWIN over 50 seeds with paired bootstrap CIs, plus Elec2 and INSECTS real-data checks; reported losses and ties alongside wins.',
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
    name: 'lsmkv',
    repo: 'https://github.com/Gatlin-official/lsmkv',
    tagline: 'LSM-Tree Key-Value Store in Go',
    block: 'stone',
    tech: ['Go', 'Storage Engines', 'Concurrency'],
    points: [
      'LevelDB-style storage engine from scratch using only the Go standard library: WAL with crash recovery, memtable, SSTables with bloom filters, leveled compaction, TCP server and CLI.',
      'Added block cache, group commit, MVCC snapshots, optimistic transactions and range deletes; random reads went from 191k to 460k ops/s (+150%), with crash and race-detector test suites.',
    ],
  },
  {
    name: 'Kaalam',
    repo: 'https://github.com/Gatlin-official/kaalam-gb',
    tagline: 'Game Boy Emulator with a Time Machine',
    block: 'planks',
    tech: ['Rust', 'Emulation', 'Systems'],
    points: [
      'Cycle-accurate Game Boy emulator in Rust with rewind, bit-identical input record/replay and a live hardware inspector.',
      'Passes all 500k SingleStepTests CPU cases, every Blargg cpu_instrs test, 62/66 Mooneye acceptance tests, and matches dmg-acid2 pixel for pixel.',
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
