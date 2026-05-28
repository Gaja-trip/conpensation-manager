const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const sourcePath = path.join(
  root,
  "analysis",
  "extracted",
  "chatgpt-shared-6a184dc964d4819198735386a55a9496.html"
);
const markdownPath = path.join(root, "analysis", "extracted", "chatgpt-shared-1차-문제해설.md");
const crawledDataPath = path.join(root, "crawled-first-question-data.js");
const explanationsPath = path.join(root, "first-exam-explanations.js");

const html = fs.readFileSync(sourcePath, "utf8");
const chunks = [];
const enqueuePattern = /streamController\.enqueue\("([\s\S]*?)"\)/g;

for (const match of html.matchAll(enqueuePattern)) {
  try {
    chunks.push(JSON.parse(`"${match[1]}"`));
  } catch {
    // Some non-content chunks can be malformed after HTML serialization.
  }
}

const stream = chunks.join("");
const contentStart = stream.indexOf("# 2022");
if (contentStart === -1) {
  throw new Error("Could not find the shared-page markdown heading in the streamed HTML.");
}

const nextAssistantMarker = stream.indexOf(',"role","assistant"', contentStart);
let markdown = stream.slice(contentStart, nextAssistantMarker === -1 ? undefined : nextAssistantMarker);
markdown = markdown
  .replace(/\u00a0/g, " ")
  .replace(/【[^】]+】/g, "")
  .replace(/\\n/g, "\n")
  .replace(/\\"/g, '"')
  .replace(/\\\\/g, "\\")
  .replace(/풊|풋/g, "풀이")
  .replace(/\n"\s*$/, "")
  .trim();

fs.writeFileSync(markdownPath, `${markdown}\n`, "utf8");

const siteExplanations = {};
const sectionPattern =
  /^##\s*(20\d{2})년\s*1차\s*시험\s*[–-]\s*(민법|부동산관계법규|토지보상법규)\s*(\d+)문/gm;
const sections = [];
for (const match of markdown.matchAll(sectionPattern)) {
  sections.push({
    year: Number(match[1]),
    subject: match[2],
    count: Number(match[3]),
    start: match.index,
  });
}

sections.forEach((section, index) => {
  const nextSection = sections[index + 1]?.start ?? markdown.length;
  const conclusion = markdown.indexOf("\n## 결론", section.start);
  const end = conclusion !== -1 && conclusion < nextSection ? conclusion : nextSection;
  const body = markdown.slice(section.start, end);
  const problemPattern = /^###\s*문제\s*(\d+)\s*[–-]\s*(.+)$/gm;
  const problems = [];
  for (const match of body.matchAll(problemPattern)) {
    problems.push({
      no: Number(match[1]),
      title: match[2].trim(),
      start: match.index,
    });
  }

  problems.forEach((problem, problemIndex) => {
    const problemEnd = problems[problemIndex + 1]?.start ?? body.length;
    let explanation = body.slice(problem.start, problemEnd).trim();
    explanation = explanation
      .replace(/^###\s*문제\s*\d+\s*[–-]\s*/m, "")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/[ \t]+$/gm, "")
      .trim();

    const id = `${section.year}-1차-${section.subject}-${problem.no}`;
    siteExplanations[id] = `공유 페이지 크롤링 해설\n${explanation}`;
  });
});

global.window = {};
vmRun(path.join(root, "question-data.js"));
vmRun(explanationsPath);

const pastQuestions = global.window.PAST_QUESTIONS || [];
const existingExplanations = global.window.QUESTION_EXPLANATIONS || {};
const firstQuestions = pastQuestions.filter((item) => item.round === "1차");

const crawledQuestions = firstQuestions.map((item) => {
  const explanation = siteExplanations[item.id] || existingExplanations[item.id] || makeFallbackExplanation(item);
  return {
    id: `crawled-${item.id}`,
    bank: "사이트크롤링",
    year: item.year,
    round: item.round,
    examType: item.examType,
    subject: item.subject,
    no: item.no,
    question: item.question,
    choices: item.choices,
    answer: item.answer,
    source: siteExplanations[item.id]
      ? "ChatGPT 공유 페이지 크롤링 해설 기반"
      : "ChatGPT 공유 페이지 미수록 문항 보완 매핑",
    explanation,
  };
});

const mergedExplanations = {};
firstQuestions.forEach((item) => {
  mergedExplanations[item.id] = siteExplanations[item.id] || existingExplanations[item.id] || makeFallbackExplanation(item);
});

writeDataFile(
  crawledDataPath,
  "window.CRAWLED_FIRST_QUESTIONS",
  crawledQuestions,
  "ChatGPT shared-page crawl mapped to 1차 objective questions."
);
writeDataFile(
  explanationsPath,
  "window.QUESTION_EXPLANATIONS",
  mergedExplanations,
  "1차 기출 문항별 해설. Crawled shared-page explanations are used where available."
);

const crawledCount = Object.keys(siteExplanations).length;
const bySubject = {};
crawledQuestions.forEach((item) => {
  const key = `${item.year} ${item.subject}`;
  bySubject[key] = (bySubject[key] || 0) + 1;
});

console.log(
  JSON.stringify(
    {
      chunks: chunks.length,
      markdownLength: markdown.length,
      crawledExplanationCount: crawledCount,
      generatedQuestionCount: crawledQuestions.length,
      sections: sections.map(({ year, subject, count }) => ({ year, subject, count })),
      generatedBySubject: bySubject,
      markdownPath: path.relative(root, markdownPath),
      crawledDataPath: path.relative(root, crawledDataPath),
    },
    null,
    2
  )
);

function vmRun(filePath) {
  const vm = require("vm");
  const code = fs.readFileSync(filePath, "utf8");
  vm.runInThisContext(code, { filename: filePath });
}

function writeDataFile(filePath, variableName, data, comment) {
  const js = [
    `// ${comment}`,
    `${variableName} = ${JSON.stringify(data, null, 2)};`,
    "",
  ].join("\n");
  fs.writeFileSync(filePath, js, "utf8");
}

function makeFallbackExplanation(item) {
  const answer = item.choices?.[item.answer - 1] || `${item.answer}번`;
  return [
    "보완 해설",
    `정답은 ${item.answer}번입니다. ${answer}`,
    "이 문항은 보상관리사 1차의 과목별 핵심 개념을 묻는 문제입니다. 지문에서 요구하는 법적 효과, 절차의 순서, 주체와 기간을 먼저 확인한 뒤 정답 지문과 비교해 정리하세요.",
  ].join("\n");
}
