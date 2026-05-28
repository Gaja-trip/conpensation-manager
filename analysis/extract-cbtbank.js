const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const sourceDir = path.join(root, "analysis", "extracted", "cbtbank");
const outputPath = path.join(sourceDir, "cbtbank-relevant-topics.json");

const files = [
  { file: "g1-2024.html", label: "공인중개사 1차 2024", url: "https://cbtbank.kr/exam/g120241026" },
  { file: "g1-2023.html", label: "공인중개사 1차 2023", url: "https://cbtbank.kr/exam/g120231028" },
  { file: "g1-2022.html", label: "공인중개사 1차 2022", url: "https://cbtbank.kr/exam/g120221029" },
  { file: "g1-2021.html", label: "공인중개사 1차 2021", url: "https://cbtbank.kr/exam/g120211030" },
  { file: "g1-2020.html", label: "공인중개사 1차 2020", url: "https://cbtbank.kr/exam/g120201031" },
  { file: "g2-2024.html", label: "공인중개사 2차 2024", url: "https://cbtbank.kr/exam/g220241026" },
  { file: "g2-2023.html", label: "공인중개사 2차 2023", url: "https://cbtbank.kr/exam/g220231028" },
  { file: "g2-2022.html", label: "공인중개사 2차 2022", url: "https://cbtbank.kr/exam/g220221029" },
  { file: "g2-2021.html", label: "공인중개사 2차 2021", url: "https://cbtbank.kr/exam/g220211030" },
  { file: "g2-2020.html", label: "공인중개사 2차 2020", url: "https://cbtbank.kr/exam/g220201031" },
  { file: "appraiser-2025-1.html", label: "감정평가사 1차 1교시 2025", url: "https://cbtbank.kr/exam/cek20250405" },
  { file: "appraiser-2024-1.html", label: "감정평가사 1차 1교시 2024", url: "https://cbtbank.kr/exam/cek20240406" },
  { file: "appraiser-2023-1.html", label: "감정평가사 1차 1교시 2023", url: "https://cbtbank.kr/exam/cek20230408" },
  { file: "appraiser-2022-1.html", label: "감정평가사 1차 1교시 2022", url: "https://cbtbank.kr/exam/cek20220402" },
  { file: "appraiser-2021-1.html", label: "감정평가사 1차 1교시 2021", url: "https://cbtbank.kr/exam/cek20210424" },
  { file: "labor-civil-2025.html", label: "공인노무사 1차(민법) 2025", url: "https://cbtbank.kr/exam/cgg20250524" },
  { file: "labor-civil-2024.html", label: "공인노무사 1차(민법) 2024", url: "https://cbtbank.kr/exam/cgg20240525" },
];

const subjectRules = [
  {
    subject: "민법",
    keywords: [
      "물권",
      "점유",
      "소유권",
      "취득시효",
      "등기",
      "가등기",
      "저당",
      "유치권",
      "지상권",
      "전세권",
      "상속",
      "공유",
      "합유",
      "총유",
      "명의신탁",
      "임대차",
      "종물",
    ],
  },
  {
    subject: "부동산관계법규",
    keywords: [
      "국토의 계획",
      "도시",
      "용도지역",
      "용도지구",
      "용도구역",
      "도시ㆍ군",
      "건축법",
      "건축물",
      "대지",
      "건폐율",
      "용적률",
      "농지",
      "농업진흥",
      "산지",
      "공시",
      "지적",
      "공간정보",
      "개별공시지가",
      "국유재산",
      "개발행위",
      "건축허가",
      "지목",
    ],
  },
  {
    subject: "토지보상법규",
    keywords: [
      "공익사업",
      "수용",
      "보상",
      "손실보상",
      "사업인정",
      "토지수용",
      "환지",
      "재결",
      "협의",
      "대토",
      "이주",
      "영업손실",
      "개발사업",
      "지장물",
      "잔여지",
    ],
  },
];

const questions = files.flatMap((info) => parseFile(info));
const relevant = questions
  .map((item) => ({ ...item, matchedSubjects: matchSubjects(item) }))
  .filter((item) => item.matchedSubjects.length)
  .map((item) => ({
    id: item.id,
    num: item.num,
    source: item.source,
    url: `${item.url}-${item.num}`,
    matchedSubjects: item.matchedSubjects,
    title: item.title,
    correct: item.correct,
    correctChoice: item.choices[item.correct - 1] || "",
    explanation: item.explanation,
  }));

fs.writeFileSync(outputPath, JSON.stringify(relevant, null, 2), "utf8");

const counts = {};
for (const item of relevant) {
  for (const subject of item.matchedSubjects) counts[subject] = (counts[subject] || 0) + 1;
}

console.log(
  JSON.stringify(
    {
      parsed: questions.length,
      relevant: relevant.length,
      counts,
      output: path.relative(root, outputPath),
    },
    null,
    2
  )
);

function parseFile(info) {
  const html = fs.readFileSync(path.join(sourceDir, info.file), "utf8");
  const chunks = html.split(/<div tabindex="0" class="col-12 col-sm-12 col-md-6 exam-box/g).slice(1);
  return chunks.map((chunk) => parseQuestion(`<div tabindex="0" class="col-12 col-sm-12 col-md-6 exam-box${chunk}`, info)).filter(Boolean);
}

function parseQuestion(chunk, info) {
  const id = attr(chunk, "question-id");
  const num = Number(attr(chunk, "question-num"));
  if (!id || !num) return null;

  const titleHtml = match(chunk, /<p class="exam-title">([\s\S]*?)<\/p>/);
  const choiceHtml = match(chunk, /<ol class="circlednumbers" correct="(\d+)">([\s\S]*?)<\/ol>/);
  if (!titleHtml || !choiceHtml) return null;

  const correct = Number(choiceHtml[1]);
  const choices = [...choiceHtml[2].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((m) => clean(m[1]));
  const explanationHtml = match(chunk, /<div class='reply-comment'>([\s\S]*?)<\/div>/);

  return {
    id,
    num,
    source: info.label,
    url: info.url,
    title: clean(titleHtml[1]).replace(/^\d+\.\s*/, ""),
    choices,
    correct,
    explanation: explanationHtml ? clean(explanationHtml[1]) : "",
  };
}

function matchSubjects(item) {
  const text = `${item.title} ${item.choices.join(" ")} ${item.explanation}`;
  return subjectRules.filter((rule) => rule.keywords.some((keyword) => text.includes(keyword))).map((rule) => rule.subject);
}

function attr(text, name) {
  return match(text, new RegExp(`${name}="([^"]+)"`))?.[1] || "";
}

function match(text, regex) {
  return text.match(regex);
}

function clean(html) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<img[^>]*>/gi, "[이미지]")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+\n/g, "\n")
    .replace(/\n\s+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}
