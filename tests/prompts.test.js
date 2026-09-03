import assert from "node:assert/strict";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { loadPromptFiles, systemMessageConfig } from "../dist/prompts.js";

test("replaces the prompt and adds appended instructions", async () => {
  const root = await mkdtemp(join(tmpdir(), "copilot-prompt-test-"));
  await writeFile(join(root, "SYSTEM.md"), "Replacement\n", "utf8");
  await writeFile(join(root, "APPEND_SYSTEM.md"), "Appended\n", "utf8");

  const config = systemMessageConfig(await loadPromptFiles(root));

  assert.deepEqual(config, {
    mode: "replace",
    content: "Replacement\n\nAppended\n",
  });
});

test("appends when no replacement prompt exists", async () => {
  const root = await mkdtemp(join(tmpdir(), "copilot-prompt-test-"));
  await writeFile(join(root, "APPEND_SYSTEM.md"), "Appended\n", "utf8");

  const config = systemMessageConfig(await loadPromptFiles(root));

  assert.deepEqual(config, { mode: "append", content: "Appended\n" });
});

test("returns no configuration when both files are absent", async () => {
  const root = await mkdtemp(join(tmpdir(), "copilot-prompt-test-"));

  assert.equal(systemMessageConfig(await loadPromptFiles(root)), undefined);
});
