// src/extension.ts
import { joinSession } from "@github/copilot-sdk/extension";

// src/prompts.ts
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
async function readOptional(path) {
  try {
    const content = await readFile(path, "utf8");
    return content.trim() ? content : void 0;
  } catch (error) {
    if (error.code === "ENOENT") {
      return void 0;
    }
    throw error;
  }
}
function copilotHome() {
  return process.env.COPILOT_HOME ?? join(homedir(), ".copilot");
}
async function loadPromptFiles(root = copilotHome()) {
  const [replacement, appended] = await Promise.all([
    readOptional(join(root, "SYSTEM.md")),
    readOptional(join(root, "APPEND_SYSTEM.md"))
  ]);
  return { replacement, appended };
}
function systemMessageConfig(files) {
  if (files.replacement) {
    const content = files.appended ? `${files.replacement.trimEnd()}

${files.appended.trimStart()}` : files.replacement;
    return { mode: "replace", content };
  }
  if (files.appended) {
    return { mode: "append", content: files.appended };
  }
  return void 0;
}

// src/extension.ts
var promptFiles = await loadPromptFiles();
var systemMessage = systemMessageConfig(promptFiles);
if (!systemMessage) {
  throw new Error(
    "Create ~/.copilot/SYSTEM.md, ~/.copilot/APPEND_SYSTEM.md, or both before loading this extension."
  );
}
await joinSession({ systemMessage });
