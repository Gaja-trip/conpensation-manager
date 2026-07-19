const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const protectedPages = [
  ...fs.readdirSync(root).filter((fileName) => /^lecture.*\.html$/i.test(fileName)),
  "analysis.html",
  "archive.html",
  "drill.html",
  "exam-map.html",
  "frequency.html",
  "law.html",
  "plan.html",
  "practice.html",
  "practice-first.html",
  "practice-second.html",
  "strategy.html",
];

const robotsMeta = '    <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex">';
const accessScript = '    <script src="access-control.js"></script>';

protectedPages.forEach((fileName) => {
  const filePath = path.join(root, fileName);
  let html = fs.readFileSync(filePath, "utf8");

  html = html.replace('<html lang="ko">', '<html lang="ko" data-access-scope="protected">');

  if (!html.includes('name="robots"')) {
    html = html.replace('    <link rel="stylesheet" href="styles.css">', `${robotsMeta}\n    <link rel="stylesheet" href="styles.css">`);
  }

  if (!html.includes('src="access-control.js"')) {
    html = html.replace('    <link rel="stylesheet" href="styles.css">', `    <link rel="stylesheet" href="styles.css">\n${accessScript}`);
  }

  fs.writeFileSync(filePath, html, "utf8");
  console.log(`Protected ${fileName}`);
});
