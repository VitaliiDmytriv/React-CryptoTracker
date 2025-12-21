import fs from "fs";
import path from "path";

/**
 * 🔧 КОНФІГ
 * ЄДИНЕ МІСЦЕ, ДЕ ТИ ЩОСЬ МІНЯЄШ
 */
const TARGET_DIR_NAME = "src/features";

/* =============================== */

const PROJECT_ROOT = process.cwd();
const TARGET_DIR = path.join(PROJECT_ROOT, TARGET_DIR_NAME);

const OUTPUT_FILE = path.join(PROJECT_ROOT, `${TARGET_DIR_NAME.replace(/\//g, "_")}.txt`);

const IGNORE_EXTENSIONS = new Set([".css", ".scss", ".sass", ".less"]);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    // ❌ ігноруємо declaration files
    if (entry.name.endsWith(".d.ts")) continue;

    const ext = path.extname(entry.name);
    if (IGNORE_EXTENSIONS.has(ext)) continue;

    appendFile(fullPath);
  }
}

function appendFile(filePath) {
  const relativePath = path.relative(PROJECT_ROOT, filePath);
  const content = fs.readFileSync(filePath, "utf8");

  fs.appendFileSync(
    OUTPUT_FILE,
    `\n\n// ===== FILE: ${relativePath} =====\n\n${content}\n`,
    "utf8"
  );
}

/* =============================== */
/* 🚀 START */

if (!fs.existsSync(TARGET_DIR)) {
  console.error(`❌ Папка не знайдена: ${TARGET_DIR_NAME}`);
  process.exit(1);
}

// очистити файл перед стартом
fs.writeFileSync(OUTPUT_FILE, "", "utf8");

// стартуємо з вибраної папки
walk(TARGET_DIR);

console.log(`✅ Готово. Вміст "${TARGET_DIR_NAME}" злитий у ${path.basename(OUTPUT_FILE)}`);
