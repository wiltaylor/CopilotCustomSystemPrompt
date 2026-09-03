import { joinSession } from "@github/copilot-sdk/extension";

import { loadPromptFiles, systemMessageConfig } from "./prompts.js";

const promptFiles = await loadPromptFiles();
const systemMessage = systemMessageConfig(promptFiles);

if (!systemMessage) {
  throw new Error(
    "Create ~/.copilot/SYSTEM.md, ~/.copilot/APPEND_SYSTEM.md, or both before loading this extension.",
  );
}

await joinSession({ systemMessage });
