#!/usr/bin/env bash
set -euo pipefail

repo="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
version="$(tr -d '[:space:]' <"$repo/VERSION")"
installed="$(codex plugin list --json)"

jq -e --arg version "$version" '
  any(.installed[];
    .pluginId == "pstack@pstack-codex" and
    .marketplaceName == "pstack-codex" and
    .version == $version and
    .installed == true and
    .enabled == true
  )
' >/dev/null <<<"$installed"

plugin_root="$(jq -r '.installed[] | select(.pluginId == "pstack@pstack-codex") | .source.path' <<<"$installed")"
context="$(CLAUDE_PLUGIN_ROOT="$plugin_root" "$plugin_root/hooks/session-start.sh" codex)"
grep -Fq "You have pstack." <<<"$context"
grep -Fq 'pstack:poteto-mode' <<<"$context"

if [[ "${PSTACK_CODEX_LIVE:-0}" != "1" ]]; then
  echo "ok: pstack@pstack-codex $version is installed and its Codex hook loads"
  echo "skip: set PSTACK_CODEX_LIVE=1 to run a fresh Codex model turn"
  exit 0
fi

last_message="$(mktemp)"
trace="$(mktemp)"
trap 'rm -f "$last_message" "$trace"' EXIT

codex exec \
  --json \
  --ephemeral \
  --dangerously-bypass-hook-trust \
  --sandbox read-only \
  --cd "$repo" \
  --output-last-message "$last_message" \
  'Use the pstack:bro skill. Restate "Operationalize the deployment pipeline." in plain human language. Your entire final answer must be exactly: Make the deployment process work.' >"$trace"

jq -e '
  select(
    .type == "item.completed" and
    .item.type == "command_execution" and
    .item.exit_code == 0 and
    (.item.command | contains("pstack-codex")) and
    (.item.command | contains("/skills/bro/SKILL.md"))
  )
' "$trace" >/dev/null
grep -Fxq "Make the deployment process work." "$last_message"
echo "ok: a fresh Codex turn invoked pstack:bro from pstack@pstack-codex $version"
