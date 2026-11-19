# Contributing to ROMcraft Fieldnotes

This is an evidence-first Android research knowledge hub. Keep contributions in plain Markdown under `content/`, with structured frontmatter (`title`, `description`, `contentType`, `status`, `updated`, `tags`). Preserve the exact device model, software version and date associated with every observation.

## Labels

- **field-tested:** a result observed in the documented A105F session, within that scope only.
- **field-informed:** explanatory or reusable guidance synthesized from field evidence and published references; do not assume universally tested.
- **official-doc:** guidance sourced to the linked maintainer/project documentation.
- **community-report:** claims from external developers or users not independently verified here.
- **planned:** possible work or instructions not yet executed or demonstrated.

## Pull-request checklist

1. Link trusted sources and separate observations from hypotheses.
2. Verify potentially destructive commands, exact block-device paths, prerequisites and rollback options.
3. Preserve the scope: no claim that a ROM works on all devices because it worked on one A105F.
4. Redact personal identifiers, serials, IMEI, IPs when identifying, EFS and proprietary firmware.
5. Run `npm run check:content`, `npm run test`, `npm run lint`, `npm run typecheck` and `npm run build` after installing dependencies.
6. Include a brief change log explaining technical corrections and dates.

Never commit `.env.local`, ROM ZIPs, full firmware, raw `*.img` files, device radio partitions, local shell history or private logs.

See [Evidence and accuracy policy](content/00-start-here/evidence-and-accuracy.md), [Safety gates](content/02-guides/safety-gates-and-runbook.md), and [Website handoff](content/90-site-blueprint/release-handoff.md).
