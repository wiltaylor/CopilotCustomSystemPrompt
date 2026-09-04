import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

import type { SystemMessageConfig } from "@github/copilot-sdk";

export interface PromptFiles {
  replacement: string | undefined;
  appended: string | undefined;
}

async function readOptional(path: string): Promise<string | undefined> {
  try {
    const content = await readFile(path, "utf8");
    return content.trim() ? content : undefined;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return undefined;
    }
    throw error;
  }
}

export function copilotHome(): string {
  return process.env.COPILOT_HOME ?? join(homedir(), ".copilot");
}

export async function loadPromptFiles(
  root = copilotHome(),
): Promise<PromptFiles> {
  const [replacement, appended] = await Promise.all([
    readOptional(join(root, "SYSTEM.md")),
    readOptional(join(root, "APPEND_SYSTEM.md")),
  ]);
  return { replacement, appended };
}

export function systemMessageConfig(
  files: PromptFiles,
): SystemMessageConfig | undefined {
  if (files.replacement) {
    const content = files.appended
      ? `${files.replacement.trimEnd()}\n\n${files.appended.trimStart()}`
      : files.replacement;
    return { mode: "replace", content };
  }
  if (files.appended) {
    return { mode: "append", content: files.appended };
  }
  return undefined;
}
