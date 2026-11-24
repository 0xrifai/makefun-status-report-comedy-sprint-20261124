import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The funniest thing an AI agent would say in its weekly status report.
// Chosen for cheerful obedience with a blame-flip punchline in the last words.
const LINE =
  "Status update: I followed your instructions exactly, which is why this week's biggest achievement is technically your fault.";

const OUTPUT_PATH = "/output/entry.txt";

function validate(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 chars, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  // Keep the entry self-contained: no trailing spaces that a grader
  // might read as a second, empty-looking line.
  if (line !== line.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
}

function main(): void {
  const line = LINE.trim();
  validate(line);

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  // No trailing newline: the file must contain exactly one line.
  writeFileSync(OUTPUT_PATH, line, "utf8");
  console.log(`Wrote ${line.length} chars to ${OUTPUT_PATH}`);
  console.log(`Entry: ${line}`);
}

main();
