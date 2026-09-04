#!/usr/bin/env node

import { access, cp, mkdir, rm } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const copilotRoot = process.env.COPILOT_HOME ?? join(homedir(), ".copilot");
const extensionRoot = join(
  copilotRoot,
  "extensions",
  "copilot-custom-system-prompt",
);
const force = process.argv.includes("--force");
const command = process.argv
  .slice(2)
  .find((argument) => !argument.startsWith("--"));

if (command !== "install") {
  throw new Error("usage: copilot-custom-system-prompt install [--force]");
}

await mkdir(dirname(extensionRoot), { recursive: true });
let exists = true;
try {
  await access(extensionRoot);
} catch {
  exists = false;
}
if (exists && !force) {
  throw new Error(
    `${extensionRoot} already exists; pass --force to replace it.`,
  );
}
if (exists) {
  await rm(extensionRoot, { recursive: true, force: true });
}
await cp(
  join(packageRoot, "extensions", "copilot-custom-system-prompt"),
  extensionRoot,
  {
    recursive: true,
    force: true,
  },
);

console.log(`Installed Copilot extension at ${extensionRoot}`);
console.log("Restart Copilot CLI to load it.");
