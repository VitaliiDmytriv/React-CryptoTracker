import fs from "fs/promises";
import path from "path";

const TARGET_DIR_NAME = "server";
const PROJECT_ROOT = process.cwd(); // звідки виконується node

const TARGET_DIR = path.join(PROJECT_ROOT, TARGET_DIR_NAME);
const OUTPUT_FILE = path.join(PROJECT_ROOT, `node.txt`);

const IGNORE_DIRS = new Set(["node_modules"]);
const IGNORE_FILES = new Set([".env", "package-lock.json"]);
const IGNORE_EXTENSIONS = new Set([".css"]);

async function getAllFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const tasks = entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.has(entry.name)) {
        return getAllFiles(fullPath);
      }
      return;
    }

    if (
      entry.isFile() &&
      !IGNORE_FILES.has(entry.name) &&
      !IGNORE_EXTENSIONS.has(path.extname(entry.name)) &&
      !entry.name.endsWith(".d.ts")
    ) {
      return fullPath;
    }
  });

  const results = await Promise.all(tasks);

  return results.flat().filter(Boolean);
}

async function readFile(filePath) {
  return fs.readFile(filePath, "utf-8");
}

async function getContent(files) {
  const tasks = files.map((file) => {
    return readFile(file);
  });

  return await Promise.all(tasks);
}

async function start() {
  const files = await getAllFiles(TARGET_DIR);
  const contents = await getContent(files);
  console.log(files);
  console.log(contents);

  let output = "";
  for (let i = 0; i < files.length; i++) {
    const relativePath = path.relative(TARGET_DIR, files[i]);
    output += `\n\n// ===== FILE: ${relativePath} =====\n\n${contents[i]}\n`;
  }

  await fs.writeFile(OUTPUT_FILE, "", "utf8"); // очищення
  await fs.writeFile(OUTPUT_FILE, output, "utf-8");
}

start();
