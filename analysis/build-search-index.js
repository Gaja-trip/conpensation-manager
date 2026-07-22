const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');

const sectionForPage = (fileName) => {
  if (fileName === 'index.html') return '메인';
  if (fileName === 'law-info.html') return '법령정보';
  if (fileName.startsWith('lecture')) return '기본강의';
  if (fileName.startsWith('practice') || ['exam-map.html', 'archive.html'].includes(fileName)) return '문제풀이';
  if (['analysis.html', 'law.html', 'frequency.html', 'strategy.html', 'drill.html', 'plan.html'].includes(fileName)) return '분석자료';
  return '기타';
};

const decodeEntities = (value) => {
  const named = {
    amp: '&',
    apos: "'",
    gt: '>',
    lt: '<',
    middot: '·',
    nbsp: ' ',
    quot: '"',
  };

  return String(value || '').replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
    const normalized = entity.toLowerCase();
    if (normalized.startsWith('#x')) return String.fromCodePoint(Number.parseInt(normalized.slice(2), 16));
    if (normalized.startsWith('#')) return String.fromCodePoint(Number.parseInt(normalized.slice(1), 10));
    return Object.prototype.hasOwnProperty.call(named, normalized) ? named[normalized] : match;
  });
};

const cleanText = (value) => decodeEntities(
  String(value || '')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|svg|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' '),
).replace(/\s+/g, ' ').trim();

const firstMatch = (value, pattern) => cleanText(String(value || '').match(pattern)?.[1] || '');

const unique = (values) => [...new Set(values.filter(Boolean))];

const htmlRecords = fs.readdirSync(root)
  .filter((fileName) => fileName.endsWith('.html'))
  .sort((a, b) => a.localeCompare(b, 'ko'))
  .map((fileName) => {
    const html = fs.readFileSync(path.join(root, fileName), 'utf8');
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || html;
    const headings = unique([...main.matchAll(/<h[1-4]\b[^>]*>([\s\S]*?)<\/h[1-4]>/gi)].map((match) => cleanText(match[1])));
    const documentTitle = firstMatch(html, /<title\b[^>]*>([\s\S]*?)<\/title>/i);
    const description = firstMatch(html, /<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
    const bodyText = cleanText(main);
    const title = headings[0] || documentTitle || fileName;
    const snippet = description || bodyText.slice(0, 180);

    return {
      id: `page:${fileName}`,
      kind: '페이지',
      section: sectionForPage(fileName),
      title,
      snippet,
      text: [documentTitle, description, headings.join(' '), bodyText.slice(0, 24000)].filter(Boolean).join(' '),
      href: fileName,
      protected: html.includes('data-access-scope="protected"'),
    };
  });

const dataFiles = [
  'question-data.js',
  'question-2019-data.js',
  'question-2020-data.js',
  'compensation-law-question-data.js',
  'adapted-question-data.js',
  'crawled-first-question-data.js',
  'cbtbank-adapted-question-data.js',
  'drive-yearly-question-data.js',
];

const sandbox = { window: {} };
vm.createContext(sandbox);
dataFiles.forEach((fileName) => {
  const filePath = path.join(root, fileName);
  if (!fs.existsSync(filePath)) return;
  vm.runInContext(fs.readFileSync(filePath, 'utf8'), sandbox, { filename: fileName });
});

const questionCollections = [
  sandbox.window.PAST_QUESTIONS,
  sandbox.window.ADAPTED_QUESTIONS,
  sandbox.window.CRAWLED_FIRST_QUESTIONS,
  sandbox.window.CBTBANK_ADAPTED_QUESTIONS,
  sandbox.window.DRIVE_YEARLY_QUESTIONS,
].filter(Array.isArray);

const questionIds = new Set();
const questionRecords = questionCollections.flatMap((collection) => collection).flatMap((item, index) => {
  if (!item?.question || !Array.isArray(item.choices)) return [];
  const id = String(item.id || `${item.year}-${item.round}-${item.subject}-${item.no}-${index}`);
  if (questionIds.has(id)) return [];
  questionIds.add(id);

  const page = item.round === '2차' ? 'practice-second.html' : 'practice-first.html';
  const params = new URLSearchParams({
    bank: String(item.bank || '기출문제'),
    year: String(item.year || ''),
    subject: String(item.subject || ''),
    question: id,
  });
  const title = `${item.year || ''}년 ${item.subject || ''} ${item.no || ''}번 - ${item.question}`.replace(/\s+/g, ' ').trim();
  const choices = item.choices.join(' ');

  return [{
    id: `question:${id}`,
    kind: '문제',
    section: '문제풀이',
    title,
    snippet: `${item.bank || '문제'} · ${item.source || `${item.year || ''}년 ${item.round || ''}`}`,
    text: [item.question, choices, item.subject, item.bank, item.source].filter(Boolean).join(' '),
    href: `${page}?${params.toString()}`,
    protected: true,
  }];
});

const records = [...htmlRecords, ...questionRecords];
const output = `// analysis/build-search-index.js에서 자동 생성한 사이트 전체 검색 색인입니다.\nwindow.SITE_SEARCH_INDEX = ${JSON.stringify(records)};\n`;
fs.writeFileSync(path.join(root, 'search-index.js'), output, 'utf8');

console.log(JSON.stringify({ pages: htmlRecords.length, questions: questionRecords.length, total: records.length }, null, 2));

module.exports = records;
