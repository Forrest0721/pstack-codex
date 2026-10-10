// Documentation states counts and the upstream pin in prose. Each is derivable from
// the tree, so this pins every occurrence to its source instead of trusting a
// hand edit to keep up.
import { describe, expect, test } from "bun:test";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { agentSkills, publicSkills } from "../tools/generate.mjs";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const readme = readFileSync(join(repoRoot, "README.md"), "utf8");
const reference = readFileSync(join(repoRoot, "docs/reference.md"), "utf8");
const documentation = [readme, reference].join("\n");
const skillsDir = join(repoRoot, "plugins/pstack/skills");
const total = agentSkills(skillsDir).length;
const publicCount = publicSkills(skillsDir).length;
const principles = total - publicCount;
const stubs = readdirSync(join(repoRoot, "plugins/pstack/.codex-plugin/prompts")).filter((f) => f.endsWith(".md")).length;
const pins = JSON.parse(readFileSync(join(repoRoot, "tools/upstream.json"), "utf8")).components;

const numbersBefore = (phrase) => [...documentation.matchAll(new RegExp(`(\\d+) (?:${phrase})`, "g"))].map((m) => Number(m[1]));

describe("README and reference facts match the tree", () => {
  test("skill directory count", () => {
    const found = numbersBefore("skill directories|Agent Skills");
    expect(found.length).toBeGreaterThan(0);
    for (const n of found) expect(n).toBe(total);
  });

  test("public skill and stub counts", () => {
    const found = [
      ...numbersBefore("are public workflows|public workflows|public skills|slash command stubs"),
      ...[...documentation.matchAll(/The (\d+) `\.codex-plugin\/prompts/g)].map((m) => Number(m[1])),
    ];
    expect(found.length).toBeGreaterThan(0);
    for (const n of found) expect(n).toBe(publicCount);
    expect(stubs).toBe(publicCount);
  });

  test("principle leaf count", () => {
    const found = numbersBefore("`principle-\\*`");
    expect(found.length).toBeGreaterThan(0);
    for (const n of found) expect(n).toBe(principles);
  });

  test("each documented upstream pin matches the pinned SHA", () => {
    const named = [...documentation.matchAll(/synced against upstream `([0-9a-f]+)`/g)].map((m) => m[1]);
    expect(named.length).toBeGreaterThan(0);
    for (const sha of named) expect(pins.pstack.sha.startsWith(sha)).toBe(true);
  });

  test("publishes the pstack-codex selector and limits live verification claims to Codex", () => {
    expect(readme).toContain("codex plugin add pstack@pstack-codex");
    expect(readme).not.toContain("codex plugin add pstack@pstack-claude");
    expect(reference).toContain("This fork performs live release verification only on Codex.");
  });

  test("states the complete source chain and the fork's current scope", () => {
    expect(readme).toContain("Michael Denyer's [pstack-claude](https://github.com/michael-denyer/pstack-claude)");
    expect(readme).toContain("Lauren Tan's [pstack](https://github.com/cursor/plugins/tree/main/pstack)");
    expect(readme).toContain("core workflows and original Codex plugin implementation come from `pstack-claude`");
    expect(readme).toContain("independent community project");
    expect(readme).toContain("not affiliated with or endorsed by OpenAI, Cursor, Michael Denyer, or Lauren Tan");
    expect(readme).not.toContain("Codex-verified distribution");
  });
});
