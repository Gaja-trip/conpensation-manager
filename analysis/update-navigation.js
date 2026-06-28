const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const navGroups = [
  {
    href: "lecture.html",
    label: "기본강의",
    items: [
      ["lecture.html", "강의 홈"],
      ["lecture-civil.html", "민법강의"],
      ["lecture-real-estate.html", "부동산관계법규"],
      ["lecture-compensation-law.html", "토지보상법규"],
      ["lecture-practice-guide.html", "기출·연습"],
      ["lecture-appendix.html", "부록"],
    ],
  },
  {
    href: "practice.html",
    label: "문제풀이",
    items: [
      ["practice.html", "문제풀이"],
      ["exam-map.html", "시험지도"],
      ["archive.html", "기출정리"],
    ],
  },
  {
    href: "analysis.html",
    label: "분석자료",
    items: [
      ["law.html", "이해하기"],
      ["frequency.html", "출제빈도"],
      ["strategy.html", "과목전략"],
      ["drill.html", "실전점검"],
      ["plan.html", "회독계획"],
    ],
  },
];

function renderHeader(current) {
  return `<header class="topbar">
      <a class="brand" href="index.html" aria-label="보상관리사 학습 홈">
        <span class="brand-mark" aria-hidden="true"></span>
        <span>보상관리사 학습</span>
      </a>
      <nav class="nav" aria-label="주요 메뉴">
        ${navGroups.map((group) => renderGroup(group, current)).join("\n        ")}
      </nav>
    </header>`;
}

function renderGroup(group, current) {
  const active = isGroupCurrent(group.href, current);
  return `<div class="nav-group">
          <a class="nav-trigger" href="${group.href}"${active ? ' aria-current="page"' : ""}>${group.label}</a>
          <div class="nav-menu" aria-label="${group.label} 하위 메뉴">
            ${group.items.map(([href, label]) => `<a href="${href}"${isItemCurrent(href, current) ? ' aria-current="page"' : ""}>${label}</a>`).join("\n            ")}
          </div>
        </div>`;
}

function isGroupCurrent(href, current) {
  if (href === "lecture.html") return current === "lecture.html" || current.startsWith("lecture-");
  if (href === "practice.html") return ["practice.html", "practice-first.html", "practice-second.html", "exam-map.html", "archive.html"].includes(current);
  if (href === "analysis.html") return ["analysis.html", "law.html", "frequency.html", "strategy.html", "drill.html", "plan.html"].includes(current);
  return false;
}

function isItemCurrent(href, current) {
  if (href === current) return true;
  if (href === "lecture-civil.html") return current.startsWith("lecture-civil-");
  if (href === "lecture-real-estate.html") return current.startsWith("lecture-real-estate-");
  if (href === "lecture-compensation-law.html") return current.startsWith("lecture-compensation-law-");
  if (href === "lecture-practice-guide.html") return current.startsWith("lecture-practice-guide-");
  if (href === "lecture-appendix.html") return current.startsWith("lecture-appendix-");
  if (href === "practice.html") return current === "practice-first.html" || current === "practice-second.html";
  return false;
}

function updateNavigation() {
  const files = fs.readdirSync(root).filter((file) => file.endsWith(".html"));
  let updated = 0;

  for (const file of files) {
    const filePath = path.join(root, file);
    const html = fs.readFileSync(filePath, "utf8");
    const next = html.replace(/<header class="topbar">[\s\S]*?<\/header>/, renderHeader(file));
    if (next !== html) {
      fs.writeFileSync(filePath, next, "utf8");
      updated += 1;
    }
  }

  console.log(JSON.stringify({ scanned: files.length, updated }, null, 2));
}

updateNavigation();
