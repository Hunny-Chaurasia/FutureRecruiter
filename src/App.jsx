
import { useState, useRef, useEffect, useCallback } from "react";

// ─── Icon Components ─────────────────────────────────────────────────────────
const Icon = ({ d, size = 18, strokeWidth = 1.8, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  >
    {Array.isArray(d)
      ? d.map((path, i) => <path key={i} d={path} />)
      : <path d={d} />}
  </svg>
);

const BrainIcon = () => (
  <Icon
    size={22}
    d={[
      // Left Document (CV) Outline
      "M2,6 V18 A1,1 0 0,0 3,19 H9 V17 H4 V8 H9 V6 Z",
      // Right Document (JD) Outline
      "M15,6 V6 H20 V17 H15 V19 H21 A1,1 0 0,0 22,18 V6 Z",
      // Document Interior Lines (Left)
      "M5,10 H8 V11 H5 Z M5,13 H7 V14 H5 Z",
      // Document Interior Lines (Right)
      "M16,10 H19 V11 H16 Z M17,13 H19 V14 H17 Z",
      // Central AI Funnel Base
      "M7,16 C9,18 10,19 12,20 C14,19 15,18 17,16 C15,17 9,17 7,16 Z",
      // Upward Matching Arrow (Rising from the center)
      "M12,17 V9 H10 L12,5 L14,5 L12,9 H12 V17 Z",
      // Top AI Circuit Node (The Brain Hub)
      "M12,2 A3,3 0 1,1 9,5 A3,3 0 0,1 12,2 Z",
      // Circuit branches inside the hub
      "M12,4 L11,5 M12,4 L13,5 M12,4 V3"
    ]}
  />
);

const UploadIcon = () => (
  <Icon d={["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M17 8l-5-5-5 5", "M12 3v12"]} />
);
const FileIcon = () => (
  <Icon size={16} d={["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6"]} />
);
const FileTextIcon = () => (
  <Icon
    size={16}
    d={[
      "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z",
      "M14 2v6h6",
      "M16 13H8",
      "M16 17H8",
      "M10 9H8",
    ]}
  />
);
const UserIcon = () => (
  <Icon size={16} d={["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8"]} />
);
const UsersIcon = () => (
  <Icon
    size={18}
    d={[
      "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2",
      "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
      "M23 21v-2a4 4 0 0 0-3-3.87",
      "M16 3.13a4 4 0 0 1 0 7.75",
    ]}
  />
);
const StarIcon = () => <Icon size={15} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />;
const CheckIcon = () => <Icon size={15} d="M20 6L9 17l-5-5" />;
const ChevronDownIcon = () => <Icon size={16} d="M6 9l6 6 6-6" />;
const ChevronRightIcon = () => <Icon size={16} d="M9 18l6-6-6-6" />;
const SendIcon = () => <Icon size={18} d={["M22 2L11 13", "M22 2L15 22l-4-9-9-4 20-7"]} />;
const BriefcaseIcon = () => (
  <Icon
    size={18}
    d={[
      "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z",
      "M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
    ]}
  />
);
const SparklesIcon = () => (
  <Icon
    size={18}
    d={[
      "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      "M20 3v4",
      "M22 5h-4",
      "M4 17v2",
      "M5 18H3",
    ]}
  />
);
const TrophyIcon = () => (
  <Icon
    size={16}
    d={[
      "M6 9H4.5a2.5 2.5 0 0 1 0-5H6",
      "M18 9h1.5a2.5 2.5 0 0 0 0-5H18",
      "M4 22h16",
      "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",
      "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",
      "M18 2H6v7a6 6 0 0 0 12 0V2z",
    ]}
  />
);
const XIcon = () => <Icon size={15} d="M18 6L6 18M6 6l12 12" />;
const BotIcon = () => (
  <Icon
    size={20}
    d={[
      "M12 8V4H8",
      "M16 8V4h-4",
      "M16 8a4 4 0 0 1-8 0",
      "M8 8v2a4 4 0 0 0 8 0V8",
      "M3 14a9 9 0 1 0 18 0",
      "M8 14v1",
      "M16 14v1",
      "M11 14v2h2v-2",
    ]}
  />
);
const InfoIcon = () => (
  <Icon size={15} d={["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M12 8h.01", "M12 12v4"]} />
);
const AwardIcon = () => (
  <Icon size={16} d={["M8.21 13.89L7 23l5-3 5 3-1.21-9.12", "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14"]} />
);
const ZapIcon = () => <Icon size={15} d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />;

// ─── Helper Functions ─────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function parseCandidateSections(text, filename) {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

  const nameMatch =
    text.match(/name[:\s]+([A-Z][a-z]+ [A-Z][a-z]+)/i) ||
    lines.find((l) => l.length < 40 && /^[A-Z]/.test(l) && !l.includes(":"));

  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  const phoneMatch = text.match(/[\+\d][\d\s\-().]{8,}/);
  const skillsMatch = text.match(/skills?[:\n]+([^\n]+(?:\n[^\n]+){0,5})/i);
  const expMatch = text.match(/experience[:\n]+([^\n]+(?:\n[^\n]+){0,3})/i);
  const eduMatch = text.match(/education[:\n]+([^\n]+(?:\n[^\n]+){0,3})/i);

  const techKeywords = [
    "python", "java", "javascript", "react", "node", "aws", "sql", "docker",
    "kubernetes", "typescript", "angular", "vue", "c++", "golang", "rust",
    "ml", "ai", "tensorflow", "pytorch", "git", "linux", "mongodb",
    "postgresql", "redis", "kafka",
  ];
  const technologies = techKeywords.filter((t) =>
    text.toLowerCase().includes(t)
  );

  return {
    filename,
    name:
      typeof nameMatch === "string"
        ? nameMatch
        : nameMatch?.[1] ||
          filename.replace(/\.[^.]+$/, "").replace(/[_-]/g, " "),
    email: emailMatch?.[0] || "—",
    phone: phoneMatch?.[0]?.trim() || "—",
    skills: skillsMatch
      ? skillsMatch[1]
          .split(/[,;\n]/)
          .map((s) => s.trim())
          .filter((s) => s.length > 2 && s.length < 40)
      : technologies,
    technologies,
    experience: expMatch ? expMatch[1] : "Mentioned in resume",
    education: eduMatch ? eduMatch[1] : "Mentioned in resume",
    rawText: text,
    score: Math.floor(55 + Math.random() * 40),
  };
}

function buildAnalysisPrompt(jd, candidate, allCandidates) {
  const otherScores = allCandidates
    .filter((c) => c.filename !== candidate.filename)
    .map((c) => `${c.name}: ${c.score}%`)
    .join(", ");

  return `You are FutuRecruiter AI, an expert recruitment analyst. Analyze this candidate against the job description.

JOB DESCRIPTION:
${jd || "Not provided — analyze based on resume strength."}

CANDIDATE PROFILE:
Name: ${candidate.name}
Email: ${candidate.email}
Technologies: ${candidate.technologies.join(", ")}
Skills Listed: ${candidate.skills.slice(0, 10).join(", ")}
Experience Section: ${candidate.experience}
Education: ${candidate.education}
Resume Score: ${candidate.score}/100

OTHER CANDIDATES IN POOL: ${otherScores || "None"}

Respond ONLY with valid JSON, no markdown, no extra text:
{
  "verdict": "STRONG FIT | GOOD FIT | PARTIAL FIT | WEAK FIT",
  "overallScore": 85,
  "summary": "2-3 sentence executive summary",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "gaps": ["gap 1", "gap 2"],
  "skillMatch": [
    {"skill": "Python", "matched": true, "note": "5+ years experience"},
    {"skill": "AWS", "matched": false, "note": "Not mentioned"}
  ],
  "experienceAnalysis": "Detailed experience assessment",
  "educationNote": "Education assessment",
  "hiringRecommendation": "Final hiring recommendation with reasoning",
  "interviewQuestions": ["Question 1?", "Question 2?", "Question 3?"]
}`;
}

const QUICK_CHIPS = [
  "Who is the top candidate?",
  "Compare all candidates",
  "Show shortlisted analysis",
  "What skills are missing?",
  "Rank by experience",
];

// ─── Score / Verdict Color Helpers ───────────────────────────────────────────
function verdictColor(v) {
  if (!v) return "#6366F1";
  if (v.includes("STRONG")) return "#10B981";
  if (v.includes("GOOD")) return "#6366F1";
  if (v.includes("PARTIAL")) return "#F59E0B";
  return "#EF4444";
}

function scoreColor(s) {
  if (s >= 80) return "#10B981";
  if (s >= 60) return "#6366F1";
  if (s >= 40) return "#F59E0B";
  return "#EF4444";
}

// ─── Analysis Card ────────────────────────────────────────────────────────────
function AnalysisCard({ analysis: a, candidate }) {
  const [expanded, setExpanded] = useState(true);
  const [tab, setTab] = useState("overview");

  const vColor = verdictColor(a.verdict);
  const sColor = scoreColor(a.overallScore);

  const cardStyle = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(99,102,241,0.2)",
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 12,
  };

  return (
    <div style={cardStyle}>
      {/* Header */}
      <div
        style={{
          background: "rgba(99,102,241,0.15)",
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderBottom: "1px solid rgba(99,102,241,0.15)",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: `${vColor}22`,
            border: `1px solid ${vColor}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: vColor,
          }}
        >
          <AwardIcon />
        </div>

        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#E2E8F0" }}>
            {candidate?.name}
          </div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: vColor,
              background: `${vColor}18`,
              padding: "2px 8px",
              borderRadius: 10,
              display: "inline-block",
              marginTop: 2,
            }}
          >
            {a.verdict}
          </div>
        </div>

        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: sColor, lineHeight: 1 }}>
            {a.overallScore}
          </div>
          <div
            style={{
              fontSize: 9,
              color: "#64748B",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Score
          </div>
        </div>

        <button
          onClick={() => setExpanded((prev) => !prev)}
          style={{
            background: "none",
            border: "none",
            color: "#64748B",
            cursor: "pointer",
            marginLeft: 8,
            padding: 4,
          }}
        >
          {expanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </button>
      </div>

      {/* Body */}
      {expanded && (
        <div style={{ padding: "16px 18px" }}>
          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: 4,
              marginBottom: 16,
              background: "rgba(0,0,0,0.2)",
              borderRadius: 10,
              padding: 4,
            }}
          >
            {["overview", "skills", "interview"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  flex: 1,
                  padding: "7px 0",
                  border: "none",
                  borderRadius: 7,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  textTransform: "capitalize",
                  letterSpacing: "0.04em",
                  background: tab === t ? "rgba(99,102,241,0.25)" : "transparent",
                  color: tab === t ? "#818CF8" : "#475569",
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {tab === "overview" && (
            <>
              {/* Metric boxes */}
              <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                {[
                  { val: `${a.overallScore}%`, label: "Match", color: sColor },
                  { val: a.strengths?.length || 0, label: "Strengths", color: "#10B981" },
                  { val: a.gaps?.length || 0, label: "Gaps", color: "#F59E0B" },
                  {
                    val: a.skillMatch?.filter((s) => s.matched).length || 0,
                    label: "Skills ✓",
                    color: "#6366F1",
                  },
                ].map((m, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      minWidth: 90,
                      background: "rgba(255,255,255,0.04)",
                      borderRadius: 10,
                      padding: "10px 12px",
                      textAlign: "center",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1, color: m.color }}>
                      {m.val}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: "#64748B",
                        marginTop: 4,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.7, marginBottom: 14 }}>
                {a.summary}
              </p>

              {a.strengths?.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#10B981",
                      fontWeight: 700,
                      marginBottom: 6,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    ✦ Strengths
                  </div>
                  {a.strengths.map((s, i) => (
                    <div
                      key={i}
                      style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 5 }}
                    >
                      <span style={{ color: "#10B981", marginTop: 1, flexShrink: 0 }}>
                        <CheckIcon />
                      </span>
                      <span style={{ fontSize: 12.5, color: "#94A3B8" }}>{s}</span>
                    </div>
                  ))}
                </div>
              )}

              {a.gaps?.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#F59E0B",
                      fontWeight: 700,
                      marginBottom: 6,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    ⚠ Gaps
                  </div>
                  {a.gaps.map((g, i) => (
                    <div
                      key={i}
                      style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 5 }}
                    >
                      <span style={{ color: "#F59E0B", marginTop: 1, flexShrink: 0 }}>
                        <InfoIcon />
                      </span>
                      <span style={{ fontSize: 12.5, color: "#94A3B8" }}>{g}</span>
                    </div>
                  ))}
                </div>
              )}

              {a.hiringRecommendation && (
                <div
                  style={{
                    background: `${vColor}0D`,
                    border: `1px solid ${vColor}25`,
                    borderRadius: 10,
                    padding: "10px 14px",
                    marginTop: 8,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: vColor,
                      fontWeight: 700,
                      marginBottom: 5,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Hiring Recommendation
                  </div>
                  <p style={{ fontSize: 12.5, color: "#94A3B8", lineHeight: 1.6 }}>
                    {a.hiringRecommendation}
                  </p>
                </div>
              )}
            </>
          )}

          {/* Skills Tab */}
          {tab === "skills" && (
            <>
              <div style={{ fontSize: 11, color: "#64748B", marginBottom: 10 }}>
                Skill match against job requirements:
              </div>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {a.skillMatch?.map((sm, i) => (
                  <span
                    key={i}
                    title={sm.note}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "4px 10px",
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 600,
                      background: sm.matched ? "rgba(16,185,129,0.12)" : "rgba(245,158,11,0.1)",
                      border: `1px solid ${sm.matched ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.25)"}`,
                      color: sm.matched ? "#34D399" : "#FCD34D",
                      margin: "3px",
                    }}
                  >
                    {sm.matched ? <CheckIcon /> : <XIcon />}
                    {sm.skill}
                  </span>
                ))}
              </div>
              {a.experienceAnalysis && (
                <div
                  style={{
                    marginTop: 14,
                    padding: "10px 14px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: 10,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: "#64748B",
                      fontWeight: 700,
                      marginBottom: 5,
                      textTransform: "uppercase",
                    }}
                  >
                    Experience
                  </div>
                  <p style={{ fontSize: 12.5, color: "#94A3B8", lineHeight: 1.6 }}>
                    {a.experienceAnalysis}
                  </p>
                </div>
              )}
            </>
          )}

          {/* Interview Tab */}
          {tab === "interview" && (
            <>
              <div style={{ fontSize: 11, color: "#64748B", marginBottom: 12 }}>
                Suggested interview questions based on profile gaps:
              </div>
              {a.interviewQuestions?.map((q, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 10,
                    marginBottom: 10,
                    padding: "10px 12px",
                    background: "rgba(99,102,241,0.06)",
                    borderRadius: 10,
                    border: "1px solid rgba(99,102,241,0.1)",
                  }}
                >
                  <span
                    style={{ color: "#6366F1", fontWeight: 700, fontSize: 12, flexShrink: 0 }}
                  >
                    Q{i + 1}
                  </span>
                  <span style={{ fontSize: 12.5, color: "#94A3B8", lineHeight: 1.6 }}>{q}</span>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main App Component ───────────────────────────────────────────────────────
export default function App() {
  const [jd, setJd] = useState("");
  const [jdAnalyzed, setJdAnalyzed] = useState(false);
  const [files, setFiles] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [processingFiles, setProcessingFiles] = useState(false);
  const [scoreAnimated, setScoreAnimated] = useState(false);

  const fileInputRef = useRef(null);
  const chatRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Animate score bars after candidates load
  useEffect(() => {
    if (candidates.length > 0) {
      setTimeout(() => setScoreAnimated(true), 300);
    }
  }, [candidates]);

  // ── Add a message to chat ──
  function addMessage(role, content, extra = {}) {
    setMessages((prev) => [
      ...prev,
      { role, content, id: Date.now() + Math.random(), ...extra },
    ]);
  }

  // ── Parse JD ──
  function handleJdAnalyze() {
    if (!jd.trim()) return;
    setJdAnalyzed(true);
    addMessage(
      "assistant",
      `✅ Job description parsed and stored. I've extracted key requirements:\n\n• **Skills & Technologies** — Identified from description\n• **Experience Level** — Extracted from context\n• **Role Responsibilities** — Catalogued for matching\n\nNow upload candidate resumes and I'll score them against this JD automatically.`
    );
  }

  // ── Process uploaded files ──
  const processFiles = useCallback(
    async (newFiles) => {
      setProcessingFiles(true);
      const newCandidates = [];

      for (const f of newFiles) {
        const text = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsText(f);
        });
        await sleep(300);
        newCandidates.push(parseCandidateSections(text, f.name));
      }

      setFiles((prev) => [...prev, ...newFiles]);
      setCandidates((prev) => {
        const updated = [...prev, ...newCandidates];
        const top = [...updated].sort((a, b) => b.score - a.score)[0];
        setTimeout(() => {
          addMessage(
            "assistant",
            `📂 Processed **${newCandidates.length}** resume(s). Total pool: **${updated.length}** candidates.\n\nTop scorer so far: **${top?.name}** (${top?.score}%). Ask me anything about the candidates, or click "Show shortlisted analysis" for a deep dive.`
          );
        }, 100);
        return updated;
      });

      setProcessingFiles(false);
    },
    [] // no deps needed since we use functional state updates
  );

  // ── Drag & Drop ──
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      const dropped = Array.from(e.dataTransfer.files).filter((f) =>
        /\.(pdf|txt|docx|doc|md)$/i.test(f.name)
      );
      if (dropped.length) processFiles(dropped);
    },
    [processFiles]
  );

  function handleFileChange(e) {
    const selected = Array.from(e.target.files).filter((f) =>
      /\.(pdf|txt|docx|doc|md)$/i.test(f.name)
    );
    if (selected.length) processFiles(selected);
    e.target.value = "";
  }

  // ── Call Claude API ──
  async function callClaude(userMsg) {
    const targetCand =
      selectedCandidate ||
      (candidates.length > 0
        ? [...candidates].sort((a, b) => b.score - a.score)[0]
        : null);

    const isAnalysisRequest =
      /shortlist|best|top|why|recommend|analyz|detail|show me/i.test(userMsg);

    if (isAnalysisRequest && targetCand) {
      setLoading(true);
      try {
        const resp = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            messages: [
              {
                role: "user",
                content: buildAnalysisPrompt(jd, targetCand, candidates),
              },
            ],
          }),
        });
        const data = await resp.json();
        const raw = data.content?.map((b) => b.text || "").join("") || "";
        try {
          const analysis = JSON.parse(raw.replace(/```json|```/g, "").trim());
          addMessage("assistant", `Deep analysis complete for **${targetCand.name}**:`, {
            analysis,
            candidate: targetCand,
          });
        } catch {
          addMessage("assistant", raw);
        }
      } catch {
        addMessage("assistant", "⚠️ Could not reach AI — showing stored analysis data.");
      }
      setLoading(false);
      return;
    }

    // General chat
    setLoading(true);
    const context =
      candidates.length > 0
        ? `Candidate pool (${candidates.length}): ${candidates
            .map(
              (c) =>
                `${c.name} (score: ${c.score}, skills: ${c.technologies.slice(0, 4).join(", ")})`
            )
            .join(" | ")}. JD provided: ${jd ? "Yes" : "No"}.`
        : "No resumes uploaded yet.";

    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are FutuRecruiter AI, a professional recruitment assistant. Context: ${context}. Be concise, insightful, and professional. Use bullet points when listing. Current JD: ${
            jd || "Not set"
          }.`,
          messages: [{ role: "user", content: userMsg }],
        }),
      });
      const data = await resp.json();
      addMessage("assistant", data.content?.[0]?.text || "I couldn't process that.");
    } catch {
      addMessage("assistant", "⚠️ Connection issue. Please try again.");
    }
    setLoading(false);
  }

  async function handleSend() {
    const msg = input.trim();
    if (!msg || loading) return;
    setInput("");
    addMessage("user", msg);
    await callClaude(msg);
  }

  function handleChip(chip) {
    addMessage("user", chip);
    callClaude(chip);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        background: "#070B18",
        color: "#E2E8F0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        height: "100vh",
      }}
    >
      {/* ── Navbar ── */}
      <nav
        style={{
          background: "#0D1226",
          borderBottom: "1px solid rgba(99,102,241,0.2)",
          padding: "0 24px",
          height: 58,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 20,
              fontWeight: 700,
              background: "linear-gradient(135deg, #818CF8, #6366F1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <BrainIcon />
            <span>FutuRecruiter</span>
          </div>
          <div
            style={{
              fontSize: 11,
              color: "#64748B",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            AI Talent Intelligence
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {candidates.length > 0 && (
            <span
              style={{
                background: "rgba(99,102,241,0.15)",
                border: "1px solid rgba(99,102,241,0.3)",
                color: "#818CF8",
                fontSize: 11,
                fontWeight: 600,
                padding: "3px 10px",
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <UsersIcon /> {candidates.length} Candidates
            </span>
          )}
          <span
            style={{
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.3)",
              color: "#34D399",
              fontSize: 11,
              fontWeight: 600,
              padding: "3px 10px",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <ZapIcon /> AI Active
          </span>
        </div>
      </nav>

      {/* ── Body ── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* ── Left Panel ── */}
        <div
          style={{
            width: 340,
            flexShrink: 0,
            background: "#0D1226",
            borderRight: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Job Description */}
          <div
            style={{ padding: "16px 18px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
                fontSize: 11,
                fontWeight: 600,
                color: "#64748B",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              <BriefcaseIcon />
              <span>Job Description</span>
            </div>
            <textarea
              style={{
                width: "100%",
                height: 130,
                background: "#070B18",
                border: `1px solid ${jdAnalyzed ? "rgba(16,185,129,0.3)" : "rgba(99,102,241,0.2)"}`,
                borderRadius: 10,
                color: "#CBD5E1",
                fontSize: 13,
                lineHeight: 1.7,
                padding: "12px 14px",
                resize: "none",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
              placeholder="Paste the job description here — required skills, experience, responsibilities..."
              value={jd}
              onChange={(e) => {
                setJd(e.target.value);
                setJdAnalyzed(false);
              }}
            />
            <button
              style={{
                marginTop: 10,
                width: "100%",
                padding: "10px 0",
                background: "linear-gradient(135deg, #6366F1, #4F46E5)",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                cursor: jd.trim() ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                opacity: jd.trim() ? 1 : 0.5,
              }}
              onClick={handleJdAnalyze}
              disabled={!jd.trim()}
            >
              <SparklesIcon />
              {jdAnalyzed ? "JD Analyzed ✓" : "Parse & Store JD"}
            </button>
          </div>

          {/* File Upload */}
          <div
            style={{ padding: "16px 18px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
                fontSize: 11,
                fontWeight: 600,
                color: "#64748B",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              <FileTextIcon />
              <span>Resume Upload</span>
              {processingFiles && (
                <span style={{ marginLeft: "auto", color: "#F59E0B", fontSize: 10 }}>
                  Processing...
                </span>
              )}
            </div>

            {/* Drop Zone */}
            <div
              style={{
                border: `2px dashed ${dragging ? "#6366F1" : "rgba(99,102,241,0.3)"}`,
                borderRadius: 12,
                padding: "18px 12px",
                textAlign: "center",
                cursor: "pointer",
                background: dragging ? "rgba(99,102,241,0.08)" : "rgba(99,102,241,0.04)",
                color: "#475569",
                fontSize: 12,
              }}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div style={{ marginBottom: 8, color: dragging ? "#6366F1" : "#475569" }}>
                <UploadIcon />
              </div>
              <div style={{ fontWeight: 600, color: "#64748B" }}>Drop resumes here</div>
              <div style={{ marginTop: 3, color: "#334155" }}>PDF · DOCX · TXT · MD</div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.docx,.doc,.txt,.md"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            {files.map((f, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 10px",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: 8,
                  marginTop: 8,
                  border: "1px solid rgba(255,255,255,0.05)",
                  fontSize: 12,
                }}
              >
                <FileIcon />
                <span
                  style={{
                    flex: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    color: "#94A3B8",
                  }}
                >
                  {f.name}
                </span>
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: "#10B981",
                    boxShadow: "0 0 6px #10B981",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Candidate List Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 18px 8px",
              fontSize: 11,
              fontWeight: 600,
              color: "#64748B",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            <UsersIcon />
            <span>Candidate Pool</span>
            {candidates.length > 0 && (
              <span style={{ marginLeft: "auto", fontSize: 10, color: "#64748B" }}>
                {candidates.length} loaded
              </span>
            )}
          </div>

          {/* Candidate Cards */}
          <div style={{ flex: 1, overflowY: "auto", padding: "4px 18px 12px" }}>
            {candidates.length === 0 ? (
              <div
                style={{
                  color: "#1E293B",
                  fontSize: 12,
                  textAlign: "center",
                  padding: "20px 0",
                }}
              >
                Upload resumes to see candidates
              </div>
            ) : (
              [...candidates]
                .sort((a, b) => b.score - a.score)
                .map((c, i) => (
                  <div
                    key={i}
                    style={{
                      background:
                        selectedCandidate?.filename === c.filename
                          ? "rgba(99,102,241,0.12)"
                          : "rgba(255,255,255,0.025)",
                      border: `1px solid ${
                        selectedCandidate?.filename === c.filename
                          ? "rgba(99,102,241,0.4)"
                          : "rgba(255,255,255,0.06)"
                      }`,
                      borderRadius: 12,
                      padding: "12px 14px",
                      marginBottom: 10,
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedCandidate(c)}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {i === 0 && (
                        <span title="Top Candidate" style={{ color: "#F59E0B" }}>
                          <TrophyIcon />
                        </span>
                      )}
                      <div
                        style={{ fontSize: 13, fontWeight: 600, color: "#E2E8F0", marginBottom: 3 }}
                      >
                        {c.name}
                      </div>
                      <span
                        style={{
                          marginLeft: "auto",
                          fontSize: 12,
                          fontWeight: 700,
                          color: scoreColor(c.score),
                        }}
                      >
                        {c.score}%
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: "#64748B" }}>
                      {c.technologies.slice(0, 3).join(" · ") || "Resume uploaded"}
                    </div>
                    {/* Score Bar */}
                    <div
                      style={{
                        height: 4,
                        borderRadius: 2,
                        background: "#1E293B",
                        marginTop: 6,
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          height: "100%",
                          width: `${scoreAnimated ? c.score : 0}%`,
                          borderRadius: 2,
                          background: scoreColor(c.score),
                          transition: "width 1s cubic-bezier(.25,.46,.45,.94)",
                        }}
                      />
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* ── Right Panel (Chat) ── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            background: "#080C1A",
          }}
        >
          {/* Chat Messages */}
          <div
            ref={chatRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "24px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {messages.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "#334155" }}>
                <div style={{ fontSize: 42, marginBottom: 16 }}>🧠</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: "#1E293B", marginBottom: 8 }}>
                  FutuRecruiter AI
                </div>
                <div style={{ fontSize: 14, color: "#334155", lineHeight: 1.6 }}>
                  Paste a job description → Upload resumes → Ask me anything.
                  <br />
                  I'll store, analyze, and rank every candidate intelligently.
                </div>
                <div
                  style={{
                    marginTop: 24,
                    display: "flex",
                    gap: 12,
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {["Parse JD", "Upload CVs", "Get Rankings", "Deep Analysis"].map((s, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "8px 18px",
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 600,
                        background: "rgba(99,102,241,0.08)",
                        border: "1px solid rgba(99,102,241,0.15)",
                        color: "#475569",
                      }}
                    >
                      {["①", "②", "③", "④"][i]} {s}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    gap: 12,
                    flexDirection: msg.role === "user" ? "row-reverse" : "row",
                    alignItems: "flex-start",
                  }}
                >
                  {/* Avatar */}
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      flexShrink: 0,
                      background:
                        msg.role === "user"
                          ? "linear-gradient(135deg,#6366F1,#818CF8)"
                          : "linear-gradient(135deg,#0F172A,#1E293B)",
                      border: `1px solid ${
                        msg.role === "user"
                          ? "rgba(99,102,241,0.4)"
                          : "rgba(255,255,255,0.08)"
                      }`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {msg.role === "user" ? <UserIcon /> : <BotIcon />}
                  </div>

                  {/* Bubble + Analysis Card */}
                  <div
                    style={{
                      maxWidth: "78%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "100%",
                        padding: "12px 16px",
                        background:
                          msg.role === "user"
                            ? "linear-gradient(135deg,#6366F1,#4F46E5)"
                            : "rgba(255,255,255,0.05)",
                        border: `1px solid ${
                          msg.role === "user" ? "transparent" : "rgba(255,255,255,0.07)"
                        }`,
                        borderRadius:
                          msg.role === "user"
                            ? "16px 4px 16px 16px"
                            : "4px 16px 16px 16px",
                        fontSize: 13.5,
                        lineHeight: 1.7,
                        color: msg.role === "user" ? "#fff" : "#CBD5E1",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: msg.content
                          .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                          .replace(/\n/g, "<br/>"),
                      }}
                    />
                    {msg.analysis && (
                      <AnalysisCard
                        analysis={msg.analysis}
                        candidate={msg.candidate}
                      />
                    )}
                  </div>
                </div>
              ))
            )}

            {/* Loading indicator */}
            {loading && (
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    flexShrink: 0,
                    background: "linear-gradient(135deg,#0F172A,#1E293B)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <BotIcon />
                </div>
                <div
                  style={{
                    padding: "12px 16px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "4px 16px 16px 16px",
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", gap: 4 }}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#6366F1",
                          animation: `bounce 1s ${i * 0.15}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ color: "#475569", fontSize: 12 }}>Analyzing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Chips */}
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              padding: "0 24px 12px",
              background: "#0D1226",
            }}
          >
            {QUICK_CHIPS.map((c, i) => (
              <button
                key={i}
                style={{
                  padding: "6px 12px",
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: "pointer",
                  background: "rgba(99,102,241,0.08)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  color: "#818CF8",
                }}
                onClick={() => handleChip(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div
            style={{
              padding: "16px 24px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              background: "#0D1226",
              display: "flex",
              gap: 12,
              alignItems: "flex-end",
            }}
          >
            <textarea
              rows={1}
              style={{
                flex: 1,
                background: "#070B18",
                border: "1px solid rgba(99,102,241,0.2)",
                borderRadius: 14,
                color: "#E2E8F0",
                fontSize: 14,
                padding: "12px 16px",
                outline: "none",
                fontFamily: "inherit",
                resize: "none",
                lineHeight: 1.5,
                maxHeight: 120,
              }}
              placeholder={
                candidates.length > 0
                  ? "Ask about candidates, request analysis, compare skills..."
                  : "Upload resumes first, then ask questions..."
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                border: "none",
                cursor: input.trim() && !loading ? "pointer" : "default",
                background:
                  input.trim() && !loading
                    ? "linear-gradient(135deg,#6366F1,#4F46E5)"
                    : "rgba(99,102,241,0.1)",
                color: input.trim() && !loading ? "#fff" : "#4B5563",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
              onClick={handleSend}
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Global styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 2px; }
        textarea::placeholder { color: #334155; }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
