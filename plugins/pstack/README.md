# pstack

This plugin comes from Michael Denyer's [pstack-claude](https://github.com/michael-denyer/pstack-claude), which adapts Lauren Tan's [pstack](https://github.com/cursor/plugins/tree/main/pstack) for Claude Code, Codex, and other agent runtimes. `pstack-codex` is an unofficial downstream distribution for a maintainer who uses Codex daily. The core workflows and original Codex plugin implementation are inherited from `pstack-claude`. This fork mainly changes packaging, documentation, and Codex release verification.

The other runtime adapters remain available. This maintainer has performed live release verification only on Codex. This is an independent community project, not endorsed by OpenAI, Cursor, Michael Denyer, or Lauren Tan.

Tell `poteto-mode` your goal and it invokes the workflow that fits: reproduce and root-cause a bug, sketch a design with `architect`, race candidates in `arena`, review a diff with `interrogate`, cut prose with `unslop`. It keeps code concise, simple, and verified, and it reports what it checked.

## What it contains

- Skills: Markdown instructions the agent reads. Public ones appear as `/pstack:<name>` slash commands.
- Agents: `pstack:poteto-agent` and `pstack:comment-sicko`, plus one agent per reasoning-effort level.
- A SessionStart hook that injects the poteto-mode routing mandate unless your `pstack-models.md` sheet turns it off.
- A Pi extension that supplies the subagent, question, and wake-up tools, `/loop`, and the same routing mandate when the repository is installed as a Pi package.
- Local scripts for watching and shipping pull requests, orchestrating multi-phase plans, and auditing worktrees.

## Data handling

pstack has no server or telemetry. Anything its skills ask your agent to read, including session transcripts, goes to your model provider. Scripts run locally, and PR tools use your GitHub CLI login.

## Links

- [Skills, slash commands, runtime setup, and model configuration](https://github.com/Forrest0721/pstack-codex/blob/main/docs/reference.md)
- [Issues and support](https://github.com/Forrest0721/pstack-codex/issues)
- [Security policy](https://github.com/Forrest0721/pstack-codex/blob/main/SECURITY.md)

## License

MIT. Changes in `pstack-codex` are © 2026 Forrest0721. The underlying port is © 2026 Michael Denyer. Original pstack is © 2026 Lauren Tan, and imported cursor-team-kit skills are © 2026 Cursor. See [NOTICE.md](https://github.com/Forrest0721/pstack-codex/blob/main/NOTICE.md).
