# pstack-codex

`pstack-codex` is an unofficial downstream distribution of Michael Denyer's [pstack-claude](https://github.com/michael-denyer/pstack-claude), which adapts Lauren Tan's [pstack](https://github.com/cursor/plugins/tree/main/pstack) for Claude Code and other agent runtimes. The core workflows and original Codex plugin implementation come from `pstack-claude`.

I use Codex in my daily work and maintain this distribution under the marketplace identity `pstack@pstack-codex`. This repository maintains its packaging, documentation, and Codex release checks.

The shared skills and runtime adapters come from upstream. This distribution's live release verification covers Codex. This is an independent community project. It is not affiliated with or endorsed by OpenAI, Cursor, Michael Denyer, or Lauren Tan.

## What comes from where

| Source | Contribution |
| --- | --- |
| Lauren Tan's `pstack` | Original pstack skills, principles, and workflows |
| Michael Denyer's `pstack-claude` | Cross-runtime adaptation, including the original Codex plugin implementation |
| This repository | `pstack-codex` marketplace identity, Codex-focused documentation, and release verification |

Tell `poteto-mode` your goal and it picks a playbook for the task.

## Install

### Codex

Run in your terminal:

```shell
codex plugin marketplace add Forrest0721/pstack-codex
codex plugin add pstack@pstack-codex
```

Start a new Codex session. When Codex asks you to review the SessionStart hook, open `/hooks` and approve **Loading pstack routing**.

### Other harnesses

The following adapters are inherited from `pstack-claude`. For Muse, Antigravity, MiniMax Code, Kimi Code CLI, Grok Build, OMP, or OpenCode, use the [upstream installation recipes](docs/reference.md#upstream-open-pstack-recipes). Its commands and the upstream [`open-pstack` installer](docs/reference.md#install-with-open-pstack) install `pstack-claude`.

#### Claude Code

Run these commands in Claude Code.

```text
/plugin marketplace add Forrest0721/pstack-codex
/plugin install pstack@pstack-codex
```

#### Pi

Run this command with Pi 1.5.1 or later.

```shell
pi install git:github.com/Forrest0721/pstack-codex
```

The package loads the skills and the pstack Pi extension, which adds the subagent, question, and wake-up tools the skills use, plus `/loop` and the routing instruction. Invoke a skill with `/skill:<name>`.

#### GitHub Copilot

Run in your terminal:

```shell
copilot plugin marketplace add Forrest0721/pstack-codex
copilot plugin install pstack@pstack-codex
```

This installs pstack for the Copilot CLI and the GitHub Copilot app, which share `~/.copilot`. Start a new session afterwards. Copilot ships no default pstack models, so the first skill that needs one runs `setup-pstack` to pick from the models your account lists, and later sessions reuse that choice.

#### Shared skills

For a skills-only installation in Codex, Prime Agent, Gemini CLI, or DeepSeek Harness, follow the [shared installation guide](docs/reference.md#shared-skills-installation).

### Configure

Run `setup-pstack` to change model defaults, set reasoning effort by role, or turn automatic routing off. For runtime-specific settings, see the [routing reference](docs/reference.md#automatic-routing).

## Getting started

```text
Use poteto-mode to fix the search filter resetting when I change pages.
```

For a bug, `poteto-mode` uses the bug-fix playbook to reproduce the failure, find the cause, and verify the fix against the original case. A localized bug with a demonstrated cause can use the [focused-fix exception](plugins/pstack/skills/poteto-mode/playbooks/bug-fix.md#focused-fix-exception).

[Other playbooks](plugins/pstack/skills/poteto-mode/SKILL.md#playbooks) cover planning, features, refactoring, performance issues, investigations, prototypes, PR maintenance, shipping, and longer projects.

![poteto-mode on Claude Code, Codex, and Pi turns a request into verified work. Choose a playbook, plan and delegate with architect, arena, or swarm, then review and verify with interrogate, tests, and measurements. Project playbooks customize the workflow, and setup-pstack configures the model and reasoning effort per role. Supporting skills include how, why, and unslop.](assets/pstack-overview.png)

## Details

- [Skills and slash commands](docs/reference.md#slash-commands)
- [Runtime setup](docs/reference.md#runtime-support)
- [Models and dependencies](docs/reference.md#configuration-and-dependencies)
- [Maintenance and port scope](docs/reference.md#maintenance)

## Data handling

pstack has no server or telemetry. Anything its skills ask your agent to read, including session transcripts, goes to your model provider. Scripts run locally, and PR tools use your GitHub CLI login.

The [`show-me-your-work` skill](plugins/pstack/skills/show-me-your-work/SKILL.md) keeps a local decision trail by default. If you commit and push the trail to a shared PR, anyone with access to the PR can read it.

## Contributing

Thanks for helping make this port better. Bug reports, documentation fixes, and runtime improvements are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for the checks and where your change belongs. Report vulnerabilities privately as described in [SECURITY.md](SECURITY.md).

## License

This distribution is [MIT-licensed](LICENSE). Changes in `pstack-codex` are © 2026 Forrest0721. The port it is based on is © 2026 Michael Denyer. Original pstack is © 2026 Lauren Tan. Imported cursor-team-kit and thermos skills are © 2026 Cursor. See [LICENSE-cursor-team-kit](LICENSE-cursor-team-kit), [LICENSE-thermos](LICENSE-thermos), and [NOTICE.md](NOTICE.md).
