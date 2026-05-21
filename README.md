# DaSCH Service Platform Documentation

This repository is the source from which the DSP documentation
on [docs.dasch.swiss](https://docs.dasch.swiss) is generated.
It includes these components:

- [DSP-API](https://github.com/dasch-swiss/dsp-api)
- [DSP-APP](https://github.com/dasch-swiss/dsp-das)
- [DSP-TOOLS](https://github.com/dasch-swiss/dsp-tools)
- [DSP-INGEST](https://github.com/dasch-swiss/dsp-ingest)
- [DSP-META](https://github.com/dasch-swiss/dsp-meta)

## File structure

Each software component has its own documentation in its repository.
The individual documentations are stored as git submodules in the `/dsp` folder. Please do not change anything there.
They have to be updated in their own repositories. To grab the latest version of them, run `make update-submodules`.

In addition to those embedded contents, there are contents that live in this repository.
They are stored in the `/docs` folder:

- main landing page
- general DSP developers guide, with basics about DSP and how to contribute to the DSP software

Images like screenshots and so on have to be stored in `/docs/assets/images`.

## How to build the documentation from source

In order to build the documentation from source,
you need to install the following prerequisites:

### Xcode command line tools

Some Terminal commands used for the instructions below are not shipped with macOS by default.
They must be installed separately.
Install the Xcode command line tools (not to be confused with the entire Xcode application) as follows:

```bash
xcode-select --install
```

You will be asked in a prompt if you want to install the command line developer tools. Click "Install".

### Homebrew

[Homebrew](https://brew.sh) is a package manager that allows us to install other software.
Install it with

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```


### Python

The documentation is built with [MkDocs](https://www.mkdocs.org),
which requires [Python](https://www.python.org/).
This repo uses [uv](https://docs.astral.sh/uv/) as Python bootstrapper and virtual environment manager.
Install `uv`:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Graphviz

Install Graphviz (Graph visualization software) to work with `.dot` files:

```shell
brew install graphviz
```

### Clone repository and initialize submodules

Clone this repository from GitHub and initialize the submodules:

```shell
git clone https://github.com/dasch-swiss/dsp-docs.git
cd dsp-docs
make init-submodules
```

### Update the submodules

If you have been away for a while, you might want to update the submodules
to get the latest version of DSP-API, DSP-APP and DSP-TOOLS documentation:

```shell
make update-submodules
```

### Install Python packages in a virtual environment

Install the required python packages (this will automatically create a virtual environment):

```shell
make install-requirements
```

### Serving the documentation locally

MkDocs comes with a built-in dev-server that lets you preview your documentation as you work on it.

Make sure that the submodules are up-to-date (run `make init-submodules` and/or `make update-submodules`).

Then start the server with:

```shell
make serve
```

Open up <http://127.0.0.1:8000/> in your browser, and you'll see the documentation landing page.

### Deploying GitHub page

Publication of the documentation to [docs.dasch.swiss](https://docs.dasch.swiss/) is fully automated.
A `dsp-tools` release publish triggers `bump-release.yml`, which opens a `deploy:`-prefixed PR
against `main`; once `pr-checks.yml` is green, auto-merge fires and `deploy.yml` publishes via
`mike` to gh-pages.

#### 1. Automated path (Wednesday)

What fires:

1. `dsp-tools` publishes a release to PyPI.
2. The `dispatch-dsp-docs-bump` job in `dsp-tools` mints a DaSCH Bot App token and calls
   `gh workflow run bump-release.yml` against `dsp-docs`, passing DSP / API / APP / TOOLS parsed
   from `dsp-tools`'s `docker-compose.yml`.
3. `bump-release.yml` renders `release.mk` from `.github/release.mk.tmpl`, runs
   `make update-submodules`, opens a PR titled `deploy: bump docs to <DSP>`, and enables
   auto-merge (squash).
4. Once `pr-checks.yml` is green the PR squash-merges; the merge commit subject preserves the
   `deploy:` prefix so `deploy.yml`'s gate fires.
5. `deploy.yml` publishes to gh-pages via `mike` and the `send-chat-notification` job posts
   `📚 *DSP-DOCS* <DSP> released` to the public release-announcements room.

Where to verify:

- The bump PR appears at <https://github.com/dasch-swiss/dsp-docs/pulls?q=is:pr+deploy:+bump>.
- `https://docs.dasch.swiss/versions.json` lists the new DSP under `latest` within a few
  minutes of merge.

#### 2. Manual override (`workflow_dispatch`)

Use when the dispatcher did not fire (e.g. dsp-tools released out-of-band) or to publish a
specific combination of upstream tags:

```bash
gh workflow run bump-release.yml \
  --repo dasch-swiss/dsp-docs \
  -f dsp=2026.05.13 \
  -f api=v35.8.1 \
  -f app=v13.3.0 \
  -f tools=v18.14.0 \
  # -f meta=dsp-meta-v2.4.16   # optional; defaults to latest dsp-meta release
```

The equivalent **Run workflow ▾** form is at
<https://github.com/dasch-swiss/dsp-docs/actions/workflows/bump-release.yml> — same inputs.

`bump-release.yml` re-runs idempotently — if `release.mk` + submodule pointers already match
the inputs, the run exits 0 without opening a PR. If a peer run already opened the PR it is a
no-op too.

#### 3. Kill switch

The bump workflow respects a per-repo `vars.BUMP_RELEASE_ENABLED` flag. To pause auto-bumps
(e.g. during incident recovery):

```bash
# Pause
gh variable set BUMP_RELEASE_ENABLED --body false --repo dasch-swiss/dsp-docs

# Re-enable
gh variable set BUMP_RELEASE_ENABLED --body true --repo dasch-swiss/dsp-docs
```

The equivalent UI is at <https://github.com/dasch-swiss/dsp-docs/settings/variables/actions>.
The change takes effect on the next workflow run.

The symmetric switch on the dispatcher side is `vars.DSP_DOCS_DISPATCH_ENABLED` in the
`dsp-tools` repo — set it the same way via `gh variable set` or
<https://github.com/dasch-swiss/dsp-tools/settings/variables/actions>.

#### 4. Failure modes

| Symptom | Detection | Recovery |
|---|---|---|
| `bump-release.yml` itself fails | L1 internal Chat alert + GitHub Actions failure | Re-dispatch manually after fixing inputs / tags |
| Bump PR opens but `pr-checks.yml` fails (mkdocs `--strict` regression) | PR stays open until pushed-fix or close | Push a fix to the bump branch or fix `pr-checks.yml` and re-run |
| Bump never opens (dispatcher silently failed) | Wednesday checklist + absence of public success ping | Manually `gh workflow run bump-release.yml` |

#### 5. Credentials

Auth uses the **DaSCH Bot App** installed at org level on dsp-docs, dsp-tools, dsp-api,
dsp-app, dsp-meta. Workflows mint short-lived (1h) installation tokens; nothing is persisted.

| Secret / var | Location | Purpose |
|---|---|---|
| `secrets.DASCH_BOT_APP_ID` | org `dasch-swiss` | App identifier |
| `secrets.DASCH_BOT_APP_PRIVATE_KEY` | org `dasch-swiss` | PEM, raw newlines, **no base64 wrapping** |
| `secrets.GOOGLE_CHAT_DSP_RELEASES_WEBHOOK_URL` | org `dasch-swiss` | Public room — DSP Release Announcements |
| `secrets.GOOGLE_CHAT_DSP_RELEASE_INTERNAL_WEBHOOK_URL` | dsp-docs **and** dsp-tools (repo-level, same URL in both) | Internal engineering — failure / health alerts. Rotate in both. |
| `secrets.DASCHBOT_PAT` | dsp-docs repo | Legacy PAT used by `deploy.yml` (gh-pages `mike` publish) and `pr-checks.yml` (submodule fetches via `.git-credentials`). Flagged for follow-up migration to the DaSCH Bot App. |
| `vars.BUMP_RELEASE_ENABLED` | dsp-docs repo | Kill switch (true/false) |
| `vars.DSP_DOCS_DISPATCH_ENABLED` | dsp-tools repo | Symmetric kill switch on the dispatcher |

Private-key rotation: add the new key in the App settings, update the org secret,
smoke-test (manual `workflow_dispatch` on `bump-release.yml`), then delete the old key.
GitHub Apps support up to 25 active keys.

#### 6. Rollback

If a bump publishes broken docs:

1. Confirm the regression at <https://docs.dasch.swiss>.
2. Open a **manual** PR titled exactly `deploy: revert bump to <DSP>` — do **not** use
   GitHub's auto-generated `Revert "deploy: …"` title; it lacks the `deploy:` prefix and
   `deploy.yml`'s commit-message gate will not fire.
3. The PR body should revert `release.mk` to the previous DSP / API / APP / TOOLS / META
   values and revert the four submodule pointers.
4. Merge with `gh pr merge --squash <PR>`. `deploy.yml` fires; `mike` redeploys the prior
   version.
5. Verify `https://docs.dasch.swiss/versions.json` advertises the prior DSP under `latest`.
6. Post a manual notice to the public release-announcements room explaining the revert.

### Help for the `make` commands

To get help for the `make` commands, run:

```shell
make help
```
