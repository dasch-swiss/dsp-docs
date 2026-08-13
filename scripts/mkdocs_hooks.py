"""MkDocs build hooks for dsp-docs.

Both hooks below are permanent infrastructure, not a migration step, because
the URLs they answer for are baked into artefacts this repo does not control
and can never re-publish:

- `/latest/...` was mike's alias for "the current release". It is referenced
  from runtime error messages in every `dsp-tools` release already on PyPI,
  from `dsp-api`'s published OpenAPI endpoint descriptions (mirrored into
  `dsp-app`'s vendored copy of that spec), and from external documents (RDU
  manuals and similar) that this repo cannot edit. Those references can never
  be corrected, so this path has to keep resolving indefinitely.
- The stubs answer HTTP 200 (rather than a 404-and-redirect, as used for
  `/<version>/` below) because `<link rel="canonical">` is only honoured by
  search engines on a 200 response, and only a static 200 page can carry a
  `<noscript>` fallback for clients without JS. GitHub Pages here is static
  file serving with no rewrite rules, so a real 3xx redirect isn't available
  at all — this is the closest approximation.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

_REDIRECT_STUB = """<!DOCTYPE html>
<!-- /latest/ compat redirect: permanent, see scripts/mkdocs_hooks.py for why -->
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting</title>
  <link rel="canonical" href="{href}">
  <noscript>
    <meta http-equiv="refresh" content="1; url={href}">
  </noscript>
  <script>
    window.location.replace(
      "{href}" + window.location.search + window.location.hash
    );
  </script>
</head>
<body>
  Redirecting to <a href="{href}">{href}</a>...
</body>
</html>
"""


def on_post_build(config: Any, **kwargs: Any) -> None:
    site_dir = Path(config.site_dir)
    _write_latest_redirect_stubs(site_dir)
    _write_version_json(site_dir, Path(config.config_file_path).parent / "release.mk")


def _write_latest_redirect_stubs(site_dir: Path) -> None:
    pages = [
        path
        for path in site_dir.rglob("index.html")
        if path.relative_to(site_dir).parts[0] != "latest"
    ]
    for page in pages:
        rel_dir_parts = page.relative_to(site_dir).parts[:-1]
        href = "/" + "/".join(rel_dir_parts) + ("/" if rel_dir_parts else "")
        stub_path = site_dir / "latest" / page.relative_to(site_dir)
        stub_path.parent.mkdir(parents=True, exist_ok=True)
        stub_path.write_text(_REDIRECT_STUB.format(href=href))


def _write_version_json(site_dir: Path, release_mk: Path) -> None:
    versions = {}
    for line in release_mk.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        versions[key.strip().lower()] = value.strip()
    (site_dir / "version.json").write_text(json.dumps(versions, indent=2) + "\n")
