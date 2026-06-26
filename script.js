const examPapers = [
  {
    label: "2018 1차",
    format: "선택형 60문",
    meta: "민법, 부동산관계법규, 토지보상법규 각 20문",
    insight: "과목별 기본 조문과 판례 판단을 촘촘히 묻습니다.",
    points: ["물권·등기·점유가 민법의 중심", "도시계획·건축·국유재산 반복", "토지보상법 절차형 문항 다수"],
  },
  {
    label: "2018 2차",
    format: "선택형 20문, 주관식 12문",
    meta: "보상실무 1, 보상실무 2",
    insight: "문제 본문 일부는 이미지형으로 추출됐지만 제목과 약술형 주제가 선명합니다.",
    points: ["불법 형질변경, 미지급용지, 분묘", "생활보상, 주거이전비, 공탁", "재결 효력과 보상소송 약술"],
  },
  {
    label: "2022 1차",
    format: "선택형 75문",
    meta: "민법, 부동산관계법규, 토지보상법규 각 25문",
    insight: "2018년보다 문항 수가 늘고, 도시개발사업과 환매권까지 범위가 넓어졌습니다.",
    points: ["등기·취득시효 문항 밀도 상승", "건축면적·대지면적 계산형 등장", "사업인정·재결·환매권 강화"],
  },
  {
    label: "2022 2차",
    format: "선택형 20문, 주관식 12문",
    meta: "보상실무 1, 보상실무 2",
    insight: "현장 기본조사와 보상금 공탁, 소송, 양도소득세가 같이 출제됩니다.",
    points: ["사실상 사도, 무허가, 입목, 분묘", "영업손실 요건과 기본조사서", "공탁 효과, 대토보상, 재결 효과"],
  },
];

const heatmap = [
  {
    name: "등기와 물권변동",
    group: "민법",
    score: 94,
    note: "가등기, 본등기 효력, 등기 없는 물권변동, 등기관 처분을 반복 확인해야 합니다.",
  },
  {
    name: "점유와 취득시효",
    group: "민법",
    score: 86,
    note: "점유취득시효와 등기부취득시효의 요건, 등기청구권, 선의·무과실 기준이 핵심입니다.",
  },
  {
    name: "도시·군계획과 용도지역",
    group: "관계법규",
    score: 82,
    note: "도시·군관리계획, 용도지역·지구·구역, 개발행위허가가 매년 넓게 등장합니다.",
  },
  {
    name: "건축법과 지적·공시",
    group: "관계법규",
    score: 78,
    note: "건축면적, 연면적, 대지면적, 도로, 지목, 공시지가를 정의형과 계산형으로 묻습니다.",
  },
  {
    name: "사업인정, 협의, 재결",
    group: "토지보상법규",
    score: 88,
    note: "사업인정 고시, 보상계획 열람, 협의, 재결신청권자를 절차 순서대로 정리해야 합니다.",
  },
  {
    name: "조서, 관계인, 보상협의회",
    group: "토지보상법규",
    score: 74,
    note: "토지조서·물건조서의 효력, 관계인의 범위, 보상협의회 구성 요건이 반복됩니다.",
  },
  {
    name: "기본조사와 현황 판단",
    group: "보상실무",
    score: 92,
    note: "사실상 사도, 무허가건축물, 불법 형질변경토지, 지장물, 입목, 분묘가 2차의 중심입니다.",
  },
  {
    name: "영업·축산·이주대책",
    group: "보상실무",
    score: 68,
    note: "영업손실 요건, 축산업 손실, 이주정착금과 생활보상을 사례형으로 대비해야 합니다.",
  },
  {
    name: "공탁, 소송, 세금",
    group: "보상실무",
    score: 80,
    note: "보상금 공탁 원인과 효과, 보상금증액청구소송, 대토보상·양도소득세가 약술형으로 연결됩니다.",
  },
];

const subjects = {
  민법: {
    headline: "민법은 ‘물권의 변동을 언제 인정하느냐’가 뼈대입니다.",
    signals: ["등기 필요 여부를 먼저 가른다.", "점유의 선의·악의, 자주·타주를 분리한다.", "공유·합유·총유는 처분과 보존행위 주체를 비교한다."],
    repeaters: ["가등기와 본등기의 효력", "점유취득시효와 등기부취득시효", "상속, 경매, 판결, 공용징수의 등기 필요 여부"],
    actions: ["등기 없이 효력이 생기는 경우만 별도 암기", "취득시효는 요건, 효과, 제3자 관계를 한 표로 정리", "판례 문구는 ‘틀린 것’ 선택지로 바뀌는 표현을 표시"],
  },
  부동산관계법규: {
    headline: "관계법규는 국토계획법, 건축법, 지적·공시가격을 분리해 회독해야 합니다.",
    signals: ["용도지역·지구·구역의 차이를 묻는다.", "건축면적·연면적·대지면적은 정의와 계산이 같이 나온다.", "국유재산은 행정재산과 일반재산의 처분 가능성이 갈린다."],
    repeaters: ["도시·군관리계획의 결정과 효력", "개발행위허가와 기반시설", "건축허가·신고, 도로, 건축물대장, 지목"],
    actions: ["국토계획법은 계획 수립부터 시설사업까지 순서화", "건축법 면적 정의는 그림 없이도 계산되게 연습", "공시지가와 개별공시지가의 쓰임을 비교"],
  },
  토지보상법규: {
    headline: "토지보상법규는 절차의 주체와 기간을 놓치면 바로 오답이 됩니다.",
    signals: ["관계인, 토지소유자, 사업시행자, 수용위원회를 구분한다.", "보상계획, 협의, 재결의 순서가 선택지에 섞인다.", "손실보상의 원칙과 예외를 연결해서 묻는다."],
    repeaters: ["사업인정 고시와 의견청취", "토지조서·물건조서 작성 및 추정력", "보상협의회, 감정평가업자 추천, 재결신청"],
    actions: ["절차별 주체, 통지 방식, 기간을 한 줄 표로 만든다.", "손실보상 원칙은 이름보다 적용 예외를 본다.", "환매권과 재결 실효는 효과 중심으로 암기"],
  },
  보상실무: {
    headline: "2차 실무는 현장에서 조사한 사실을 어떤 보상 기준으로 연결할지 쓰는 시험입니다.",
    signals: ["현황 이용과 공부상 지목이 다를 때의 판단이 반복된다.", "무허가, 불법, 자연도로, 분묘처럼 예외형 소재가 많다.", "공탁, 소송, 세금은 절차의 마지막 단계에서 묻는다."],
    repeaters: ["사실상 사도와 불법형질변경토지", "무허가건축물, 건축물·지장물·입목·분묘 조사", "영업손실 요건, 공탁 효과, 보상소송, 양도소득세"],
    actions: ["각 대상별 조사 항목을 체크리스트화", "약술형은 정의, 요건, 보상 여부, 산정 기준 순서로 작성", "공탁과 소송은 원인, 효과, 불복 방법을 함께 정리"],
  },
};

const traps = [
  {
    title: "등기 없는 취득과 등기 필요한 취득",
    body: "상속·경매·공용징수처럼 등기 없이 효력이 생기는 경우와 매매·증여처럼 등기가 필요한 경우를 섞어 냅니다.",
  },
  {
    title: "가등기의 순위보전 효과",
    body: "가등기는 순위를 보전하지만 본등기의 물권변동 효력이 가등기 시점으로 소급한다고 보면 흔들립니다.",
  },
  {
    title: "취득시효의 효과",
    body: "점유취득시효 완성은 바로 소유권 취득이 아니라 소유권이전등기청구권 취득으로 정리해야 합니다.",
  },
  {
    title: "조서의 추정력과 구속력",
    body: "토지조서·물건조서는 절차를 원활하게 하지만, 내용이 사실과 다르면 수용위원회가 항상 구속되는 것은 아닙니다.",
  },
  {
    title: "현황평가와 불법 상태",
    body: "현실 이용 상황을 보되, 불법형질변경이나 무허가 상태에서는 허가 여부와 시점을 따져 예외를 적용합니다.",
  },
  {
    title: "공탁의 원인과 효과",
    body: "수령 거절, 불확지, 압류 경합 등 공탁 원인과 재결 효력 발생을 구분해 써야 합니다.",
  },
];

const essays = [
  {
    score: "20점형",
    title: "재결의 효과",
    body: "수용재결의 권리취득, 보상금 지급 또는 공탁, 인도·이전 의무, 불복 절차까지 이어 쓰는 큰 주제입니다.",
    bullets: ["효력 발생 시점", "사업시행자의 권리취득", "소유자·관계인의 구제 수단"],
  },
  {
    score: "10점형",
    title: "영업손실 보상 요건",
    body: "시간적 요건, 장소적 요건, 시설적 요건, 계속성, 허가 요건을 빠짐없이 열거하는 문제가 반복됩니다.",
    bullets: ["적법한 장소", "인적·물적 시설", "계속적 영업", "허가·신고 여부"],
  },
  {
    score: "10점형",
    title: "사실상 사도부지",
    body: "사실상 사도의 유형과 조사 기준은 선택형과 약술형 모두에 나오는 고빈도 주제입니다.",
    bullets: ["도로 형태", "불특정 다수 통행", "토지소유자의 통행 제한 가능성", "도시계획도로와의 구별"],
  },
  {
    score: "10점형",
    title: "대토보상과 양도소득세",
    body: "보상 방법의 취지와 과세특례 요건을 함께 정리해야 보상실무 2 사례형에 대응할 수 있습니다.",
    bullets: ["대토보상의 의의", "과세특례 요건", "사후관리와 추징 위험"],
  },
];

const quizCards = [
  {
    group: "민법",
    title: "점유취득시효가 완성되면 등기 없이 곧바로 소유권을 취득한다.",
    answer: "틀림. 완성자는 소유권이전등기청구권을 취득하고, 등기해야 소유권을 취득합니다.",
  },
  {
    group: "민법",
    title: "가등기 후 본등기를 하면 물권변동 효력이 가등기 시점으로 소급한다.",
    answer: "틀림. 가등기는 본등기의 순위를 보전하지만 물권변동 자체가 가등기 시점으로 소급하는 것은 아닙니다.",
  },
  {
    group: "부동산관계법규",
    title: "용도지역은 하나의 토지에 둘 이상 중복 지정될 수 있다.",
    answer: "틀림. 용도지역은 중복 지정되지 않는 구조로 정리하고, 용도지구는 중복 지정 가능성을 따로 봅니다.",
  },
  {
    group: "부동산관계법규",
    title: "지하층 면적은 연면적 산정에서 항상 제외된다.",
    answer: "틀림. 지하층은 연면적에 포함되지만 용적률 산정에서 제외되는 부분이 문제화됩니다.",
  },
  {
    group: "토지보상법규",
    title: "보상계획 공고는 토지소유자와 관계인이 적으면 개별 통지도 생략할 수 있다.",
    answer: "틀림. 일정한 경우 공고 생략이 문제되더라도 개별 통지까지 단순히 생략된다고 보면 위험합니다.",
  },
  {
    group: "토지보상법규",
    title: "토지소유자는 사업인정 후 재결신청권자가 된다.",
    answer: "틀림. 기출은 재결신청권자와 재결신청 청구권자를 구분해 물었습니다.",
  },
  {
    group: "보상실무",
    title: "무허가건축물 부지는 항상 현황 전체를 대지로 본다.",
    answer: "틀림. 건축 시점, 용도, 바닥면적, 객관적 부지 이용, 건폐율 제한 등을 함께 봅니다.",
  },
  {
    group: "보상실무",
    title: "영업장소에 방이 있으면 거주자 조사는 항상 제외된다.",
    answer: "틀림. 실제 거주 여부와 이주대책, 주거이전비 관련 조사를 연결해 판단해야 합니다.",
  },
  {
    group: "보상실무",
    title: "보상금 공탁은 원인보다 공탁서 문구만 외우면 충분하다.",
    answer: "틀림. 수령 거절, 불확지, 압류 경합 같은 원인과 공탁 효과를 같이 써야 약술형에서 점수가 납니다.",
  },
];

const planItems = [
  ["1-3일", "민법 물권·등기", "등기 필요 여부, 가등기, 물권변동 예외를 한 표로 정리"],
  ["4-6일", "민법 점유·취득시효", "점유취득시효와 등기부취득시효의 요건·효과 비교"],
  ["7-9일", "공유·합유·총유", "처분, 보존행위, 관리행위 주체를 케이스로 반복"],
  ["10-13일", "국토계획법", "도시·군관리계획, 용도지역·지구·구역, 개발행위허가 회독"],
  ["14-16일", "건축법·지적·공시", "면적 정의와 도로, 지목, 공시지가를 계산형까지 확인"],
  ["17-20일", "토지보상법 절차", "사업인정, 조서, 보상계획, 협의, 재결 순서 암기"],
  ["21-23일", "손실보상 원칙과 평가", "보상협의회, 평가업자 추천, 환매권, 재결 실효 정리"],
  ["24-26일", "보상실무 1", "사실상 사도, 무허가, 불법형질변경, 지장물, 분묘 조사표 작성"],
  ["27-28일", "보상실무 2", "공탁, 소송, 생활보상, 세금 주제를 약술형으로 작성"],
  ["29-30일", "모의 회독", "오답 카드만 다시 풀고 약술형 4개를 제한시간 내 작성"],
];

const $ = (selector) => document.querySelector(selector);
const baseQuestions = (window.PAST_QUESTIONS || []).map((item) => ({
  ...item,
  bank: item.bank || "기출문제",
}));
const adaptedQuestions = (window.ADAPTED_QUESTIONS || []).map((item) => ({
  ...item,
  bank: item.bank === "변형문제" ? "예상문제" : item.bank || "예상문제",
}));
const crawledFirstQuestions = (window.CRAWLED_FIRST_QUESTIONS || []).map((item) => ({
  ...item,
  bank: item.bank || "사이트크롤링",
}));
const cbtbankAdaptedQuestions = (window.CBTBANK_ADAPTED_QUESTIONS || []).map((item) => ({
  ...item,
  bank: item.bank || "CBTBank변환",
}));
const driveYearlyQuestions = (window.DRIVE_YEARLY_QUESTIONS || []).map((item) => ({
  ...item,
  bank: item.bank || "Drive 기출분석 변형",
}));
const questionBank = [
  ...baseQuestions,
  ...adaptedQuestions,
  ...crawledFirstQuestions,
  ...cbtbankAdaptedQuestions,
  ...driveYearlyQuestions,
];
const writtenBank = window.WRITTEN_PROMPTS || [];
const yearArchive = window.YEAR_STATUS || [];
const lawUnderstanding = window.LAW_UNDERSTANDING || [];
const lawNoteFiles = window.LAW_NOTE_FILES || [];
let practiceItems = [];
let practiceIndex = 0;
let practiceAnswers = new Map();

function createElement(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

function renderExamMap() {
  const root = $("#exam-map");
  if (!root) return;
  root.innerHTML = "";

  examPapers.forEach((paper) => {
    const card = createElement("article", "exam-card");
    card.append(createElement("span", "tag", paper.format));
    card.append(createElement("h3", "", paper.label));
    card.append(createElement("p", "", paper.meta));
    card.append(createElement("p", "", paper.insight));

    const list = createElement("ul");
    paper.points.forEach((point) => list.append(createElement("li", "", point)));
    card.append(list);
    root.append(card);
  });
}

function renderArchive() {
  const root = $("#archive-table");
  if (!root) return;
  root.innerHTML = "";

  yearArchive.forEach((item) => {
    const row = createElement("article", "archive-row");
    row.append(createElement("div", "archive-year", String(item.year)));

    const status = createElement("div", "archive-status", item.status);
    status.dataset.status = item.status;
    row.append(status);

    row.append(createElement("div", "", item.available));
    row.append(createElement("div", "topic-note", item.note));
    root.append(row);
  });
}

function uniqueValues(items, key) {
  return [...new Set(items.map((item) => item[key]))].sort((a, b) => String(a).localeCompare(String(b), "ko"));
}

function fillSelect(select, values, allLabel = "전체") {
  const current = select.value;
  select.innerHTML = "";
  [allLabel, ...values].forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  });
  if ([...select.options].some((option) => option.value === current)) {
    select.value = current;
  }
}

function setupPracticeFilters() {
  if (!$("#practice-year")) return;
  const lockedRound = $("#practice")?.dataset.round || "";
  const filterPool = lockedRound ? questionBank.filter((item) => item.round === lockedRound) : questionBank;
  fillSelect($("#practice-bank"), uniqueValues(filterPool, "bank"));
  fillSelect($("#practice-year"), uniqueValues(filterPool, "year"));
  if ($("#practice-round")) fillSelect($("#practice-round"), uniqueValues(filterPool, "round"));
  fillSelect($("#practice-subject"), uniqueValues(filterPool, "subject"));

  ["#practice-bank", "#practice-year", "#practice-round", "#practice-subject"].forEach((selector) => {
    const control = $(selector);
    if (control) control.addEventListener("change", resetPractice);
  });
  $("#practice-reset").addEventListener("click", resetPractice);
  resetPractice();
}

function selectedPracticeItems() {
  const lockedRound = $("#practice")?.dataset.round || "";
  const bank = $("#practice-bank").value;
  const year = $("#practice-year").value;
  const round = lockedRound || $("#practice-round")?.value || "전체";
  const subject = $("#practice-subject").value;

  return questionBank.filter((item) => {
    return (
      (bank === "전체" || item.bank === bank) &&
      (year === "전체" || String(item.year) === year) &&
      (round === "전체" || item.round === round) &&
      (subject === "전체" || item.subject === subject)
    );
  });
}

function resetPractice() {
  practiceItems = selectedPracticeItems();
  practiceIndex = 0;
  practiceAnswers = new Map();
  renderPractice();
}

function renderPractice() {
  const root = $("#practice-card");
  if (!root) return;
  root.innerHTML = "";
  updatePracticeScore();

  if (!practiceItems.length) {
    root.append(createElement("p", "topic-note", "선택한 조건에 해당하는 구조화 문제는 아직 없습니다."));
    return;
  }

  const item = practiceItems[practiceIndex];
  const chosen = practiceAnswers.get(item.id);

  const meta = createElement("div", "practice-meta");
  [item.bank, item.source, `${practiceIndex + 1} / ${practiceItems.length}`, `문항 ${item.no}`].forEach((text) => {
    meta.append(createElement("span", "tag", text));
  });
  root.append(meta);
  root.append(createElement("p", "practice-question", item.question));

  const list = createElement("ol", "choice-list");
  item.choices.forEach((choice, index) => {
    const choiceNo = index + 1;
    const li = createElement("li");
    const button = createElement("button", "choice-button");
    button.type = "button";
    button.disabled = chosen !== undefined;
    button.innerHTML = `<span class="number">${choiceNo}</span><span>${choice}</span>`;
    if (chosen !== undefined && choiceNo === item.answer) button.classList.add("correct");
    if (chosen === choiceNo && choiceNo !== item.answer) button.classList.add("wrong");
    button.addEventListener("click", () => {
      practiceAnswers.set(item.id, choiceNo);
      renderPractice();
    });
    li.append(button);
    list.append(li);
  });
  root.append(list);

  const result = createElement("p", "practice-result");
  if (chosen !== undefined) {
    const isCorrect = chosen === item.answer;
    result.classList.add(isCorrect ? "good" : "bad");
    result.textContent = isCorrect
      ? `정답입니다. ${item.answer}번`
      : `오답입니다. 정답은 ${item.answer}번입니다.`;
  } else {
    result.textContent = "보기를 선택하면 바로 채점됩니다.";
  }
  root.append(result);

  if (chosen !== undefined) {
    root.append(createAnswerExplanation(item, chosen));
  }

  const nav = createElement("div", "practice-nav");
  const prev = createElement("button", "", "이전");
  prev.type = "button";
  prev.disabled = practiceIndex === 0;
  prev.addEventListener("click", () => {
    practiceIndex = Math.max(0, practiceIndex - 1);
    renderPractice();
  });
  const next = createElement("button", "", "다음");
  next.type = "button";
  next.disabled = practiceIndex === practiceItems.length - 1;
  next.addEventListener("click", () => {
    practiceIndex = Math.min(practiceItems.length - 1, practiceIndex + 1);
    renderPractice();
  });
  nav.append(prev, next);
  root.append(nav);
}

function createAnswerExplanation(item, chosen) {
  const correctChoice = item.choices?.[item.answer - 1] || "";
  const chosenChoice = item.choices?.[chosen - 1] || "";
  const box = createElement("div", "answer-explanation");
  box.append(createElement("h3", "", "답안 해석"));

  const summary = createElement("div", "answer-summary");
  summary.append(createAnswerSummaryCard("내가 고른 답", `${chosen}번`, chosenChoice, chosen === item.answer ? "good" : "bad"));
  summary.append(createAnswerSummaryCard("정답", `${item.answer}번`, correctChoice, "good"));
  box.append(summary);

  box.append(createFormattedExplanation(getQuestionExplanation(item, correctChoice)));
  return box;
}

function createAnswerSummaryCard(label, number, text, tone) {
  const card = createElement("div", `answer-summary-card ${tone}`);
  card.append(createElement("span", "", label));
  card.append(createElement("strong", "", number));
  card.append(createElement("p", "", text));
  return card;
}

function createFormattedExplanation(text) {
  const root = createElement("div", "explanation-body");
  const normalized = normalizeExplanationText(text);
  if (!normalized) return root;

  const blocks = normalized.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
  blocks.forEach((block) => appendExplanationBlock(root, block));
  return root;
}

function normalizeExplanationText(text) {
  return String(text || "")
    .replace(/\r/g, "")
    .replace(/\*\*(문제 요약|해설 및 풀이|실생활 예시|오답 노트)\s*:\*\*/g, "$1:")
    .replace(/\*\*오답 노트\*\*/g, "오답 노트:")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function appendExplanationBlock(root, block) {
  const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
  if (!lines.length) return;

  const first = lines[0];
  const labelMatch = first.match(/^(공유 페이지 크롤링 해설|보완 해설|문제 요약|해설 및 풀이|실생활 예시|오답 노트):?\s*(.*)$/);
  if (labelMatch) {
    const section = createElement("section", "explanation-section");
    section.append(createElement("h4", "", labelMatch[1]));
    const bodyLines = [labelMatch[2], ...lines.slice(1)].filter(Boolean);
    appendExplanationLines(section, bodyLines);
    root.append(section);
    return;
  }

  const titleLine = lines.length === 1 && first.length <= 70 && !/[.다요]$/.test(first);
  if (titleLine) {
    root.append(createElement("h4", "explanation-title", first));
    return;
  }

  const section = createElement("section", "explanation-section");
  appendExplanationLines(section, lines);
  root.append(section);
}

function appendExplanationLines(parent, lines) {
  const listItems = [];
  const paragraphs = [];

  lines.forEach((line) => {
    const listMatch = line.match(/^(\d+\.|[①②③④⑤⑥⑦⑧⑨⑩]|[-•])\s*(.*)$/);
    if (listMatch) {
      listItems.push(listMatch[2] || line);
    } else {
      paragraphs.push(line);
    }
  });

  if (paragraphs.length) {
    paragraphs.forEach((line) => {
      const p = createElement("p");
      p.innerHTML = formatInlineExplanation(line);
      parent.append(p);
    });
  }

  if (listItems.length) {
    const list = createElement("ul", "explanation-list");
    listItems.forEach((line) => {
      const item = createElement("li");
      item.innerHTML = formatInlineExplanation(line);
      list.append(item);
    });
    parent.append(list);
  }
}

function formatInlineExplanation(text) {
  return escapeHtml(text)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(정답|핵심|주의|오답|판례|요건|효과|절차)/g, "<mark>$1</mark>");
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getQuestionExplanation(item, correctChoice) {
  const mappedExplanation = window.QUESTION_EXPLANATIONS?.[item.id];
  if (mappedExplanation) return mappedExplanation;
  if (item.explanation) return item.explanation;

  const guides = {
    민법: "민법 문제는 등기 필요 여부, 물권변동의 원인, 점유의 성질, 상속 효과처럼 ‘원칙과 예외’를 가르는 방식으로 해석하면 오답을 줄일 수 있습니다.",
    부동산관계법규: "부동산관계법규 문제는 정의, 허가권자, 절차 순서, 제한 효과를 분리해서 보아야 합니다. 선택지가 법률명은 맞더라도 주체나 요건을 바꿔 틀리게 만드는 경우가 많습니다.",
    관계법규: "관계법규 문제는 정의, 허가권자, 절차 순서, 제한 효과를 분리해서 보아야 합니다. 선택지가 법률명은 맞더라도 주체나 요건을 바꿔 틀리게 만드는 경우가 많습니다.",
    토지보상법규: "토지보상법규 문제는 주체, 통지ㆍ공고, 협의, 재결, 보상금 지급 또는 공탁 순서로 읽으면 됩니다. 특히 토지소유자, 관계인, 사업시행자, 수용위원회의 역할을 구분해야 합니다.",
    보상실무: "보상실무 문제는 현황, 적법성, 기준일, 보상방법을 차례로 확인해야 합니다. 무허가, 불법형질변경, 사실상 사도, 영업손실처럼 예외 요건이 자주 정답을 가릅니다.",
  };
  const guide = guides[item.subject] || "이 문제는 정답 선택지의 핵심 표현과 다른 보기의 주체ㆍ요건ㆍ효과를 비교해서 해석하면 됩니다.";
  return `정답 선택지의 핵심은 “${correctChoice}”입니다. ${guide}`;
}

function updatePracticeScore() {
  const answered = practiceItems.filter((item) => practiceAnswers.has(item.id));
  const correct = answered.filter((item) => practiceAnswers.get(item.id) === item.answer).length;
  $("#practice-score").textContent = `${correct} / ${answered.length}`;
}

function renderWrittenBank() {
  const root = $("#written-list");
  if (!root) return;
  root.innerHTML = "";

  writtenBank.forEach((item, index) => {
    const card = createElement("article", "written-card");
    const meta = createElement("div", "practice-meta");
    [`${item.year}년 ${item.round}`, item.subject, item.type].forEach((text) => {
      meta.append(createElement("span", "tag", text));
    });
    card.append(meta);
    card.append(createElement("h3", "", item.prompt));

    const answerId = `written-answer-${index}`;
    const answer = createElement("p", "written-answer", item.answer);
    answer.id = answerId;
    answer.hidden = true;

    const button = createElement("button", "", "핵심 키워드 보기");
    button.type = "button";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", answerId);
    button.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));
      button.textContent = open ? "핵심 키워드 보기" : "키워드 닫기";
      answer.hidden = open;
    });
    card.append(button, answer);
    root.append(card);
  });
}

function renderLawUnderstanding() {
  const panelRoot = $("#law-panel-grid");
  if (panelRoot) {
    panelRoot.innerHTML = "";

    lawUnderstanding.forEach((panel) => {
      const card = createElement("article", "law-panel");
      card.append(createElement("h3", "", panel.title));
      card.append(createElement("p", "law-subtitle", panel.subtitle));

      const list = createElement("ul");
      panel.points.forEach((point) => list.append(createElement("li", "", point)));
      card.append(list);

      const linked = createElement("div", "law-linked");
      panel.linked.forEach((label) => linked.append(createElement("span", "tag", label)));
      card.append(linked);
      panelRoot.append(card);
    });
  }

  const noteRoot = $("#law-note-links");
  if (!noteRoot) return;
  noteRoot.innerHTML = "";

  lawNoteFiles.forEach((file) => {
    const link = createElement("a", "law-note-card");
    link.href = file.href;
    link.append(createElement("h3", "", file.title));
    link.append(createElement("p", "", file.description));
    noteRoot.append(link);
  });
}

function renderHeatmap(active = "전체") {
  const root = $("#heatmap-list");
  if (!root) return;
  root.innerHTML = "";

  heatmap
    .filter((item) => active === "전체" || item.group === active)
    .forEach((item) => {
      const row = createElement("article", "topic-row");
      row.dataset.group = item.group;

      const label = createElement("div", "topic-label");
      label.append(createElement("strong", "", item.name));
      label.append(createElement("span", "", item.group));

      const body = createElement("div");
      const bar = createElement("div", "topic-bar");
      const fill = createElement("span");
      fill.style.width = `${item.score}%`;
      bar.append(fill);
      body.append(bar);
      body.append(createElement("p", "topic-note", item.note));

      row.append(label, body);
      root.append(row);
    });
}

function renderFilterButtons(rootSelector, values, onSelect) {
  const root = $(rootSelector);
  if (!root) return;
  root.innerHTML = "";

  values.forEach((value, index) => {
    const button = createElement("button", "", value);
    button.type = "button";
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", index === 0 ? "true" : "false");
    button.addEventListener("click", () => {
      root.querySelectorAll("button").forEach((btn) => btn.setAttribute("aria-selected", "false"));
      button.setAttribute("aria-selected", "true");
      onSelect(value);
    });
    root.append(button);
  });
}

function renderSubject(subjectName = "민법") {
  const data = subjects[subjectName];
  const panel = $("#subject-panel");
  if (!panel || !data) return;
  panel.innerHTML = "";

  panel.append(createElement("h3", "", data.headline));

  const grid = createElement("div", "subject-grid");
  [
    ["출제 신호", data.signals],
    ["반복 소재", data.repeaters],
    ["공부 행동", data.actions],
  ].forEach(([title, items]) => {
    const block = createElement("div", "subject-block");
    block.append(createElement("h3", "", title));
    const list = createElement("ul");
    items.forEach((item) => list.append(createElement("li", "", item)));
    block.append(list);
    grid.append(block);
  });

  panel.append(grid);
}

function renderTraps() {
  const root = $("#trap-grid");
  if (!root) return;
  root.innerHTML = "";

  traps.forEach((trap) => {
    const card = createElement("article", "trap-card");
    card.append(createElement("h3", "", trap.title));
    card.append(createElement("p", "", trap.body));
    root.append(card);
  });
}

function renderEssays() {
  const root = $("#essay-prompts");
  if (!root) return;
  root.innerHTML = "";

  essays.forEach((essay) => {
    const card = createElement("article", "essay-card");
    card.append(createElement("span", "score", essay.score));
    card.append(createElement("h3", "", essay.title));
    card.append(createElement("p", "", essay.body));
    const list = createElement("ul");
    essay.bullets.forEach((bullet) => list.append(createElement("li", "", bullet)));
    card.append(list);
    root.append(card);
  });
}

function renderQuiz(active = "전체") {
  const root = $("#quiz-list");
  if (!root) return;
  root.innerHTML = "";

  quizCards
    .filter((card) => active === "전체" || card.group === active)
    .forEach((card, index) => {
      const article = createElement("article", "quiz-card");
      const answerId = `quiz-answer-${active}-${index}`.replace(/\s+/g, "-");
      article.append(createElement("span", "tag", card.group));
      article.append(createElement("h3", "", card.title));

      const answer = createElement("p", "quiz-answer", card.answer);
      answer.id = answerId;
      answer.hidden = true;

      const button = createElement("button", "", "정답 보기");
      button.type = "button";
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-controls", answerId);
      button.addEventListener("click", () => {
        const open = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!open));
        button.textContent = open ? "정답 보기" : "정답 닫기";
        answer.hidden = open;
      });

      article.append(answer, button);
      root.append(article);
    });
}

function renderPlan() {
  const root = $("#plan-list");
  if (!root) return;
  const saved = JSON.parse(localStorage.getItem("compensationPlan") || "{}");
  root.innerHTML = "";

  planItems.forEach(([period, title, detail], index) => {
    const id = `plan-${index}`;
    const item = createElement("label", "plan-item");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(saved[id]);
    checkbox.addEventListener("change", updatePlanProgress);

    const copy = createElement("div");
    copy.append(createElement("strong", "", `${period} · ${title}`));
    copy.append(createElement("span", "", detail));

    item.append(checkbox, copy);
    root.append(item);
  });

  updatePlanProgress();
}

function updatePlanProgress() {
  const checks = [...document.querySelectorAll(".plan-item input")];
  const state = {};
  let completed = 0;

  checks.forEach((checkbox, index) => {
    const id = `plan-${index}`;
    state[id] = checkbox.checked;
    if (checkbox.checked) completed += 1;
  });

  const percent = checks.length ? Math.round((completed / checks.length) * 100) : 0;
  $("#plan-percent").textContent = `${percent}%`;
  $("#plan-progress").style.width = `${percent}%`;
  localStorage.setItem("compensationPlan", JSON.stringify(state));
}

function setupImageLightbox() {
  const images = [...document.querySelectorAll(".lesson-figure img, img[data-lightbox-image]")];
  if (!images.length) return;

  let previouslyFocused = null;
  const lightbox = createElement("div", "image-lightbox");
  lightbox.hidden = true;
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "이미지 크게 보기");
  lightbox.setAttribute("aria-hidden", "true");

  const backdrop = createElement("div", "image-lightbox-backdrop");
  const panel = createElement("div", "image-lightbox-panel");
  const closeButton = createElement("button", "image-lightbox-close", "x");
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "확대 이미지 닫기");

  const zoomedImage = document.createElement("img");
  const caption = createElement("p", "image-lightbox-caption");

  panel.append(closeButton, zoomedImage, caption);
  lightbox.append(backdrop, panel);
  document.body.append(lightbox);

  const close = () => {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    zoomedImage.removeAttribute("src");
    if (previouslyFocused) previouslyFocused.focus({ preventScroll: true });
  };

  const open = (sourceImage) => {
    previouslyFocused = document.activeElement;
    const figureCaption = sourceImage.closest("figure")?.querySelector("figcaption")?.textContent?.trim();
    const captionText = figureCaption || sourceImage.alt || "";

    zoomedImage.src = sourceImage.currentSrc || sourceImage.src;
    zoomedImage.alt = sourceImage.alt || "";
    caption.textContent = captionText;
    caption.hidden = !captionText;

    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    closeButton.focus({ preventScroll: true });
  };

  images.forEach((image) => {
    image.dataset.lightboxImage = "true";
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `${image.alt || "강의 이미지"} 크게 보기`);
    image.addEventListener("click", () => open(image));
    image.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      open(image);
    });
  });

  closeButton.addEventListener("click", close);
  backdrop.addEventListener("click", close);
  zoomedImage.addEventListener("click", close);
  document.addEventListener("keydown", (event) => {
    if (!lightbox.hidden && event.key === "Escape") close();
  });
}

function setupClassroomTabs() {
  document.querySelectorAll("[data-classroom]").forEach((classroom) => {
    const buttons = [...classroom.querySelectorAll("[data-classroom-tab]")];
    const panels = [...classroom.querySelectorAll("[data-classroom-panel]")];
    if (!buttons.length || !panels.length) return;

    const panelIds = new Set(panels.map((panel) => panel.dataset.classroomPanel));
    const activate = (id) => {
      if (!panelIds.has(id)) return;
      buttons.forEach((button) => {
        button.setAttribute("aria-selected", String(button.dataset.classroomTab === id));
      });
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.classroomPanel !== id;
      });
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        activate(button.dataset.classroomTab);
      });
    });

    const fromHash = decodeURIComponent(location.hash.replace(/^#/, ""));
    activate(panelIds.has(fromHash) ? fromHash : buttons[0].dataset.classroomTab);
  });
}

function init() {
  renderExamMap();
  renderArchive();
  setupPracticeFilters();
  renderLawUnderstanding();
  renderWrittenBank();
  renderHeatmap();
  renderFilterButtons("#heatmap-filters", ["전체", "민법", "관계법규", "토지보상법규", "보상실무"], renderHeatmap);
  renderFilterButtons("#subject-tabs", Object.keys(subjects), renderSubject);
  renderSubject();
  renderTraps();
  renderEssays();
  renderFilterButtons("#quiz-filters", ["전체", "민법", "부동산관계법규", "토지보상법규", "보상실무"], renderQuiz);
  renderQuiz();
  renderPlan();
  setupImageLightbox();
  setupClassroomTabs();
}

init();
