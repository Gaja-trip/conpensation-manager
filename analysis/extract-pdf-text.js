const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const root = path.resolve(__dirname, "..");
const pdfName = fs.readdirSync(__dirname).find((file) => file.endsWith(".pdf") && file.includes("(2)"));
if (!pdfName) throw new Error("PDF file not found in analysis folder.");

const pdfPath = path.join(__dirname, pdfName);
const buffer = fs.readFileSync(pdfPath);
const raw = buffer.toString("latin1");

function inflateStream(dict, dataLatin1) {
  const data = Buffer.from(dataLatin1, "latin1");
  if (!/FlateDecode/.test(dict)) return data;
  try {
    return zlib.inflateSync(data);
  } catch {
    return zlib.inflateRawSync(data);
  }
}

const objects = new Map();
const streams = new Map();
const objectPattern = /(\d+)\s+(\d+)\s+obj\s*([\s\S]*?)\s*endobj/g;
let match;

while ((match = objectPattern.exec(raw))) {
  const objectNumber = Number(match[1]);
  const body = match[3];
  objects.set(objectNumber, body);

  const streamMatch = body.match(/<<(.*?)>>\s*stream\r?\n([\s\S]*?)\r?\nendstream/s);
  if (streamMatch) {
    streams.set(objectNumber, {
      dict: streamMatch[1],
      decoded: inflateStream(streamMatch[1], streamMatch[2]),
    });
  }
}

for (const [objectNumber, stream] of [...streams]) {
  if (!/\/Type\s*\/ObjStm/.test(stream.dict)) continue;
  const first = Number((stream.dict.match(/\/First\s+(\d+)/) || [])[1]);
  const count = Number((stream.dict.match(/\/N\s+(\d+)/) || [])[1]);
  const text = stream.decoded.toString("latin1");
  const header = text.slice(0, first).trim().split(/\s+/).map(Number);
  const body = text.slice(first);

  for (let index = 0; index < count * 2; index += 2) {
    const childObjectNumber = header[index];
    const offset = header[index + 1];
    const nextOffset = index + 2 < count * 2 ? header[index + 3] : body.length;
    const childBody = body.slice(offset, nextOffset);
    objects.set(childObjectNumber, childBody);
  }
  objects.set(objectNumber, text);
}

function decodeUnicodeHex(hex) {
  let output = "";
  for (let index = 0; index < hex.length; index += 4) {
    const code = Number.parseInt(hex.slice(index, index + 4), 16);
    if (!Number.isNaN(code)) output += String.fromCodePoint(code);
  }
  return output;
}

function parseCMap(text) {
  const map = new Map();
  const charPattern = /<([0-9a-fA-F]+)>\s+<([0-9a-fA-F]+)>/g;
  let charMatch;
  while ((charMatch = charPattern.exec(text))) {
    map.set(charMatch[1].toLowerCase(), decodeUnicodeHex(charMatch[2]));
  }

  const rangeBlocks = text.match(/\d+\s+beginbfrange[\s\S]*?endbfrange/g) || [];
  for (const block of rangeBlocks) {
    const rangePattern = /<([0-9a-fA-F]+)>\s+<([0-9a-fA-F]+)>\s+<([0-9a-fA-F]{4,6})>/g;
    let rangeMatch;
    while ((rangeMatch = rangePattern.exec(block))) {
      const start = Number.parseInt(rangeMatch[1], 16);
      const end = Number.parseInt(rangeMatch[2], 16);
      const target = Number.parseInt(rangeMatch[3], 16);
      const width = rangeMatch[1].length;
      for (let code = start; code <= end && code - start < 512; code += 1) {
        const targetCode = target + code - start;
        if (targetCode <= 0x10ffff) {
          map.set(code.toString(16).padStart(width, "0"), String.fromCodePoint(targetCode));
        }
      }
    }
  }
  return map;
}

const fontResource = [...objects.values()].find((body) => /\/XGIAKD\s+\d+\s+0\s+R/.test(body) && /\/SDIUIR\s+\d+\s+0\s+R/.test(body));
const fontObjectsByName = new Map();
if (fontResource) {
  const fontPattern = /\/([A-Z]{6})\s+(\d+)\s+0\s+R/g;
  let fontMatch;
  while ((fontMatch = fontPattern.exec(fontResource))) {
    fontObjectsByName.set(fontMatch[1], Number(fontMatch[2]));
  }
}

const fontMaps = new Map();
for (const [fontName, fontObjectNumber] of fontObjectsByName) {
  const fontObject = objects.get(fontObjectNumber) || "";
  const unicodeObjectNumber = Number((fontObject.match(/\/ToUnicode\s+(\d+)\s+0\s+R/) || [])[1]);
  const unicodeStream = streams.get(unicodeObjectNumber);
  if (unicodeStream) {
    fontMaps.set(fontName, parseCMap(unicodeStream.decoded.toString("latin1")));
  }
}

function decodeHexWithFont(hex, fontName) {
  const fontMap = fontMaps.get(fontName);
  if (!fontMap) return "";
  let output = "";
  for (let index = 0; index < hex.length; index += 4) {
    const code = hex.slice(index, index + 4).toLowerCase();
    output += fontMap.get(code) || "";
  }
  return output;
}

function decodeLiteralString(value) {
  return value
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\([()\\])/g, "$1");
}

function extractContentText(text) {
  let currentFont = "";
  let output = "";
  const tokenPattern = /\/([A-Z]{6})\s+[-\d.]+\s+Tf|\[((?:[^\[\]]|<[^>]+>|\([^)]*\))*)\]\s*TJ|<([0-9a-fA-F]+)>\s*Tj|\(([^)]*)\)\s*Tj|ET/g;
  let token;

  while ((token = tokenPattern.exec(text))) {
    if (token[1]) {
      currentFont = token[1];
      continue;
    }
    if (token[2]) {
      const arrayText = token[2];
      const partPattern = /<([0-9a-fA-F]+)>|\(([^)]*)\)/g;
      let part;
      while ((part = partPattern.exec(arrayText))) {
        output += part[1] ? decodeHexWithFont(part[1], currentFont) : decodeLiteralString(part[2]);
      }
      continue;
    }
    if (token[3]) {
      output += decodeHexWithFont(token[3], currentFont);
      continue;
    }
    if (token[4]) {
      output += decodeLiteralString(token[4]);
      continue;
    }
    output += "\n";
  }
  return output;
}

const contentObjectNumbers = [...streams.entries()]
  .filter(([, stream]) => stream.decoded && /(BT|TJ|Tj|Tf|ET)/.test(stream.decoded.toString("latin1")) && !/\/Subtype\s*\/OpenType|\/Type\s*\/Metadata|begincmap|\/Type\s*\/XRef/.test(stream.dict))
  .map(([objectNumber]) => objectNumber)
  .filter((objectNumber) => objectNumber < 120)
  .sort((a, b) => a - b);

const pages = contentObjectNumbers.map((objectNumber, index) => {
  const text = extractContentText(streams.get(objectNumber).decoded.toString("latin1"));
  return `\n\n===== PAGE ${index + 1} / OBJECT ${objectNumber} =====\n${text}`;
});

const extracted = pages
  .join("")
  .replace(/[ \t]+\n/g, "\n")
  .replace(/\n{3,}/g, "\n\n")
  .trim();

const outputPath = path.join(root, "analysis", "extracted", "lecture-book-outline-2.txt");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, extracted, "utf8");
console.log(JSON.stringify({ pdf: pdfName, pages: pages.length, outputPath }, null, 2));
