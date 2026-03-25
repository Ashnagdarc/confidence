import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const scanRoots = ["app", "components"];
const textExtensions = new Set([".css", ".js", ".jsx", ".ts", ".tsx"]);
const findings = [];

const checks = [
  {
    name: "Figma asset URL",
    regex: /https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^\s"'`)]*/g,
    message: "Replace Figma-hosted assets with local files in public/.",
  },
  {
    name: "Raw hex color",
    regex: /(^|[^\w-])(#[0-9A-Fa-f]{3,8})(?![\w-])/gm,
    message: "Move hardcoded colors into shared tokens instead of inline hex values.",
    captureGroup: 2,
  },
  {
    name: "Visible placeholder copy",
    regex: /(["'`])Photo\1/g,
    message: "Replace visible placeholder copy with approved production content.",
    extensions: new Set([".js", ".jsx", ".ts", ".tsx"]),
  },
];

async function walk(dir) {
  let entries = [];

  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return walk(fullPath);
      }

      return [fullPath];
    }),
  );

  return files.flat();
}

function lineNumberFor(content, index) {
  return content.slice(0, index).split("\n").length;
}

for (const scanRoot of scanRoots) {
  const files = await walk(path.join(rootDir, scanRoot));

  for (const filePath of files) {
    const extension = path.extname(filePath);

    if (!textExtensions.has(extension)) {
      continue;
    }

    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) {
      continue;
    }

    const content = await readFile(filePath, "utf8");

    for (const check of checks) {
      if (check.extensions && !check.extensions.has(extension)) {
        continue;
      }

      for (const match of content.matchAll(check.regex)) {
        const fullMatch = match[0];
        const value = check.captureGroup ? match[check.captureGroup] : fullMatch;
        const index = match.index ?? content.indexOf(fullMatch);

        findings.push({
          filePath: path.relative(rootDir, filePath),
          line: lineNumberFor(content, index),
          check: check.name,
          value,
          message: check.message,
        });
      }
    }
  }
}

if (findings.length > 0) {
  console.error("Brand system check failed.\n");

  for (const finding of findings) {
    console.error(
      `${finding.filePath}:${finding.line}  ${finding.check}  ${finding.value}\n  ${finding.message}`,
    );
  }

  process.exit(1);
}

console.log("Brand system check passed.");
