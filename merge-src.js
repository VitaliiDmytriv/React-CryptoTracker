import fs from "fs";
import path from "path";

const PROJECT_ROOT = process.cwd();
const SRC_DIR = path.join(PROJECT_ROOT, "src");
const OUTPUT_FILE = path.join(PROJECT_ROOT, "src.txt");

const IGNORE_EXTENSIONS = new Set([".css", ".scss", ".sass", ".less"]);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
    } else {
      // ❌ ігноруємо declaration files
      if (entry.name.endsWith(".d.ts")) continue;

      const ext = path.extname(entry.name);

      if (!IGNORE_EXTENSIONS.has(ext)) {
        appendFile(fullPath);
      }
    }
  }
}

function appendFile(filePath) {
  const relativePath = path.relative(PROJECT_ROOT, filePath);
  const content = fs.readFileSync(filePath, "utf8");

  fs.appendFileSync(OUTPUT_FILE, `\n\n// ===== FILE: ${relativePath} =====\n\n${content}\n`);
}

// очистити файл перед стартом
fs.writeFileSync(OUTPUT_FILE, "", "utf8");

// стартуємо ТІЛЬКИ з src
walk(SRC_DIR);

console.log("✅ Готово. Вміст src злитий у src.txt");
