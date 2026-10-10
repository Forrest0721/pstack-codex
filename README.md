# pstack-codex

Lauren Tan's [pstack](https://github.com/cursor/plugins/tree/main/pstack) is an opinionated Cursor skill stack that improves agent outcomes. `pstack-codex` is a Codex-verified distribution based on Michael Denyer's [pstack-claude](https://github.com/michael-denyer/pstack-claude) port. It tracks upstream and carries named policy forks in [`tools/forks.json`](tools/forks.json).

The shared Agent Skills tree can also run in compatible agent runtimes. This fork currently performs live release verification only on Codex. The Claude Code, Pi, GitHub Copilot, Prime Agent, OpenCode, and Gemini CLI instructions remain available for users who want to test those runtimes.

Tell `poteto-mode` your goal and it will invoke the correct workflow for the task. It keeps your code concise, simple and verified.

## Install

### Codex

Run in your terminal:

```shell
codex plugin marketplace add Forrest0721/pstack-codex
codex plugin add pstack@pstack-codex
```

Start a new Codex session after installation. Review and trust the SessionStart hook through `/hooks` when Codex asks.

### Other agents

The repository includes inherited adapters and installation files for other agents. This fork has not live-verified them. Report the runtime and version when you open an issue.

For Claude Code, run:

```text
/plugin marketplace add Forrest0721/pstack-codex
/plugin install pstack@pstack-codex
```

### Pi

Run in your terminal:

```shell
pi install git:github.com/Forrest0721/pstack-codex
```

The package loads the skills and the pstack Pi extension, which adds the subagent, question, and wake-up tools the skills use, plus `/loop` and the routing instruction. Invoke a skill with `/skill:<name>`.

### GitHub Copilot

Run in your terminal:

```shell
copilot plugin marketplace add Forrest0721/pstack-codex
copilot plugin install pstack@pstack-codex
```

This installs pstack for the Copilot CLI and the GitHub Copilot app, which share `~/.copilot`. Start a new session afterwards. Copilot ships no default pstack models, so the first skill that needs one runs `setup-pstack` to pick from the models your account lists, and later sessions reuse that choice.

The Copilot adapter and its automated tests come from `pstack-claude`. They are retained for compatibility, but this fork does not claim a live Copilot verification result.

Run `setup-pstack` to change model defaults, set a reasoning effort per role (for example `arena runners: opus @xhigh, fable @max`, which Claude Code dispatches through the plugin's `pstack:effort-<level>` or `pstack:poteto-agent-<level>` agents; roles without a level keep the session's effort unless the sheet's `default effort` line names one), or turn automatic routing off. The plugin installs the routing hook on Claude Code, Codex, and GitHub Copilot; Codex asks you to trust it through `/hooks` before it runs. On Pi the extension injects the same routing instruction. In Claude Code and the Copilot CLI, use `/pstack:setup-pstack`.

For Prime Agent, OpenCode, Gemini CLI, or skills-only installs for any agent runtime, see [shared installation](docs/reference.md#shared-skills-installation).

## Getting started

```text
Use poteto-mode to fix the search filter resetting when I change pages.
```

For a bug, it reproduces the failure, uses `how` and `why` to investigate, delegates the fix, then reruns the failing case. If the fix crosses a function boundary, it brings in `architect` before implementation. You receive the fix and the failing and passing evidence.

[Other playbooks](plugins/pstack/skills/poteto-mode/SKILL.md#playbooks) cover planning, features, refactoring, performance issues, investigations, prototypes, PR maintenance, shipping, and longer projects.

![poteto-mode on Claude Code, Codex, and Pi turns a request into verified work. Choose a playbook, plan and delegate with architect, arena, or swarm, then review and verify with interrogate, tests, and measurements. Project playbooks customize the workflow, and setup-pstack configures the model and reasoning effort per role. Supporting skills include how, why, and unslop.](assets/pstack-overview.png)

## Details

- [Skills and slash commands](docs/reference.md#slash-commands)
- [Runtime setup](docs/reference.md#runtime-support)
- [Models and dependencies](docs/reference.md#configuration-and-dependencies)
- [Maintenance and port scope](docs/reference.md#maintenance)

## Data handling

pstack has no server or telemetry. Anything its skills ask your agent to read, including session transcripts, goes to your model provider. Scripts run locally, and PR tools use your GitHub CLI login.

## Contributing

Thanks for helping make this port better. Bug reports, documentation fixes, and runtime improvements are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for the checks and where your change belongs. Report vulnerabilities privately as described in [SECURITY.md](SECURITY.md).

## License

This distribution is [MIT-licensed](LICENSE). Changes in `pstack-codex` are © 2026 Forrest0721. The port it is based on is © 2026 Michael Denyer. Original pstack is © 2026 Lauren Tan, and imported cursor-team-kit skills are © 2026 Cursor. See [LICENSE-cursor-team-kit](LICENSE-cursor-team-kit) and [NOTICE.md](NOTICE.md).
