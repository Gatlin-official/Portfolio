"""Builds the resume PDF. Usage: python scripts/resume.py public/Gatlin_A_Resume.pdf  (needs reportlab)"""
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Table, TableStyle, Spacer, KeepTogether
from reportlab.platypus.flowables import HRFlowable

NAVY = HexColor('#1f3864')
GREY = HexColor('#444444')
LINK = HexColor('#1f4e9c')

name = ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=20, leading=24, alignment=1, textColor=NAVY)
contact = ParagraphStyle('contact', fontName='Helvetica', fontSize=8.3, leading=11, alignment=1, textColor=GREY)
head = ParagraphStyle('head', fontName='Helvetica-Bold', fontSize=10.5, leading=13, textColor=NAVY, spaceBefore=4)
body = ParagraphStyle('body', fontName='Helvetica', fontSize=8.3, leading=10.4)
right = ParagraphStyle('right', parent=body, alignment=2)
rightI = ParagraphStyle('rightI', parent=right, fontName='Helvetica-Oblique')
bullet = ParagraphStyle('bullet', parent=body, leftIndent=9, bulletIndent=1)

def link(url, text):
    return f'<link href="{url}" color="#1f4e9c">{text}</link>'

def section(title):
    return [Paragraph(title, head), HRFlowable(width='100%', thickness=0.7, color=NAVY, spaceBefore=1, spaceAfter=2.5)]

def row(left, right_text, rstyle=right, widths=(0.68, 0.32)):
    t = Table([[Paragraph(left, body), Paragraph(right_text, rstyle)]], colWidths=[W * widths[0], W * widths[1]])
    t.setStyle(TableStyle([('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0),
                           ('TOPPADDING', (0, 0), (-1, -1), 0), ('BOTTOMPADDING', (0, 0), (-1, -1), 0.6),
                           ('VALIGN', (0, 0), (-1, -1), 'TOP')]))
    return t

def bullets(points):
    return [Paragraph(p, bullet, bulletText='•') for p in points]

GH = 'https://github.com/Gatlin-official/'
projects = [
    ('Pagewise', 'Mini LLM Inference Engine (vLLM-style)', GH + 'pagewise', 'Python, PyTorch, FastAPI', [
        'Built an LLM inference engine from scratch in PyTorch (own Qwen2 model code, generation loop and scheduler, verified against Hugging Face): KV cache (4.0x decode at 2K context), continuous batching (10.7x throughput) and a paged KV cache fitting 71 vs 21 sequences in the same memory.',
        'Added int8/int4 weight quantization (942 to 472 MiB, equal perplexity) and an OpenAI-compatible SSE server serving 578 tok/s to 32 streaming clients on an 8GB laptop GPU.']),
    ('Azii', 'Custom AI Language Model', GH + 'Azii', 'Python, PyTorch, NLP, FastAPI', [
        'Built a ~27M-parameter GPT-style model from scratch with a custom byte-level BPE tokenizer; pretrained on ~485M TinyStories tokens and chat-finetuned on SODA with loss masking, all on an 8GB GPU, with a streaming FastAPI + React chat UI.']),
    ('Axii', 'Offline Emotional-Companion Chatbot', GH + 'axii-companion', 'Python, PyTorch, LoRA, SQLite', [
        'Trained a 4.2M-parameter emotion Transformer from scratch (GoEmotions, macro-F1 0.445) to steer a LoRA fine-tuned Qwen2.5-1.5B; distilled 3.1k replies from a teacher model, lifting a 39-check behavioural eval from 8/39 to 30/39. Long-term SQLite memory and a crisis-safety layer.']),
    ('Harbinger', 'Anticipatory ML Drift Response', GH + 'harbinger-drift', 'Python, scikit-learn, river', [
        'Forecasts harmful distribution shift and chooses retrain / replay / rollback; evaluated threshold, expected-cost and LinUCB policies against reactive ADWIN over 50 seeds with paired bootstrap CIs and Elec2 / INSECTS real data.']),
    ('Autonomous LLM Agent &amp; Tool-Use Framework', None, GH + 'minecraft-llm-agent', 'Python, Qwen, Node.js, REST APIs', [
        'LLM agent turning high-level goals into validated JSON actions, with planning, short/long-term memory and failure recovery; local Qwen model via an OpenAI-compatible API and an execution-feedback loop that reduced invalid and repeated actions.']),
    ('Cynova', 'Adaptive Forward Validation for Anomaly Detection', None, 'Python, PyTorch, Autoencoder', [
        'Autoencoder on ~1 year of multivariate NOAA ASOS weather data with an Adaptive Forward Validation framework (future-evidence windows, persistence thresholds) separating transient anomalies from persistent events.']),
    ('Real-Time Footfall Detection &amp; Tracking', None, None, 'Python, PyTorch, YOLO11, BoT-SORT', [
        'Trained YOLO11s on MOT17 (13,098 images): 0.917 precision, 0.836 mAP@50; added tracking, appearance Re-ID and line-crossing logic for directional counting.']),
    ('lsmkv', 'LSM-Tree Key-Value Store', GH + 'lsmkv', 'Go (stdlib only)', [
        'LevelDB-style engine with WAL crash recovery, SSTables, bloom filters, leveled compaction, MVCC snapshots and transactions; random reads 191k to 460k ops/s (+150%) after adding a block cache.']),
    ('Kaalam', 'Game Boy Emulator with Rewind', GH + 'kaalam-gb', 'Rust', [
        'Emulator with rewind, deterministic record/replay and a hardware inspector; passes all 500k SingleStepTests CPU cases, Blargg cpu_instrs and 62/66 Mooneye tests.']),
    ('School ERP Management System', None, None, 'FastAPI, MySQL, Redis, Docker', [
        'Layered ERP backend with JWT auth, role-based access across 11 roles, MFA/OTP, refresh tokens, rate limiting and audit logging.']),
]

out = sys.argv[1] if len(sys.argv) > 1 else 'Gatlin_A_Resume.pdf'
doc = SimpleDocTemplate(out, pagesize=A4, leftMargin=14 * mm, rightMargin=14 * mm, topMargin=10 * mm, bottomMargin=8 * mm,
                        title='Gatlin A - Resume', author='Gatlin A')
W = doc.width
s = [Paragraph('Gatlin A', name),
     Paragraph('+91 8610684137 &nbsp;|&nbsp; malexgatlin@gmail.com &nbsp;|&nbsp; '
               + link('https://www.linkedin.com/in/gatlin-a-699a58385', 'linkedin.com/in/gatlin-a-699a58385') + ' &nbsp;|&nbsp; '
               + link('https://github.com/Gatlin-official', 'github.com/Gatlin-official'), contact)]

s += section('PROFILE')
s.append(Paragraph('Computer Science undergraduate specializing in Machine Learning, Deep Learning, and AI Engineering, with hands-on '
                   'experience building neural networks and LLMs from scratch, LLM inference optimization, fine-tuning, LLM-based agents, '
                   'and anomaly detection. Strong in Python and PyTorch, with systems work in Rust and Go.', body))

s += section('EDUCATION')
s.append(row('<b>Karunya University, Tamil Nadu</b> — B.Tech, Computer Science and Engineering', '2024 – Present'))
s.append(row('<b>Good Shepherd Model School, Tuticorin</b> — Higher Secondary (Computer Science &amp; Mathematics)', '2022 – 2024', widths=(0.8, 0.2)))

s += section('TECHNICAL SKILLS')
skills = [('Languages', 'Python, Rust, Go, Java, C, TypeScript'),
          ('Machine Learning', 'PyTorch, Deep Learning, NLP, Neural Networks, Computer Vision, Anomaly Detection, Drift Detection'),
          ('LLM / AI', 'LLMs, LLM Inference (KV cache, batching, quantization), LoRA Fine-tuning, Distillation, AI Agents, Tokenization, Embeddings, Attention'),
          ('Backend', 'FastAPI, Flask, Node.js, REST APIs, SSE Streaming'),
          ('Databases', 'PostgreSQL, MySQL, Redis, SQLite, Firebase'),
          ('Tools', 'Git, GitHub, Docker, Linux, VS Code'),
          ('Core CS', 'Data Structures &amp; Algorithms, OOP, DBMS, Storage Engines')]
t = Table([[Paragraph(f'<b>{k}</b>', body), Paragraph(v, body)] for k, v in skills], colWidths=[W * 0.17, W * 0.83])
t.setStyle(TableStyle([('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0),
                       ('TOPPADDING', (0, 0), (-1, -1), 0), ('BOTTOMPADDING', (0, 0), (-1, -1), 0.5), ('VALIGN', (0, 0), (-1, -1), 'TOP')]))
s.append(t)

s += section('EXPERIENCE')
s.append(row('<b>Web Development Intern</b> — D Data Technologies', 'June 2026'))
s += bullets(['Completed a 4-week internship contributing to web application development tasks, applying programming, debugging, and API integration practices in a professional environment.'])

s += section('PROJECTS')
for title, tag, url, tech, pts in projects:
    left = f'<b>{title}</b>' + (f' — {tag}' if tag else '')
    if url:
        left += ' &nbsp;' + link(url, '[GitHub]')
    s.append(KeepTogether([row(left, tech, rightI, widths=(0.7, 0.3))] + bullets(pts) + [Spacer(1, 1.2)]))

s += section('CERTIFICATIONS')
s += bullets(['Intermediate Machine Learning — Kaggle (Aug 2026)',
              'Introduction to Modern AI — Cisco Networking Academy (Aug 2026)',
              'AI Fundamentals: Foundations for Understanding AI — Cisco Networking Academy (Sep 2026)',
              'CCNA: Enterprise Networking, Security, and Automation — Cisco Networking Academy'])
doc.build(s)
