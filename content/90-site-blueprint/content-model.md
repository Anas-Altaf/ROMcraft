---
title: "Documentation content model and frontmatter schema"
description: "The editorial contract for Markdown/MDX, provenance, versions and search."
contentType: "guide"
status: "planned"
updated: "2026-11-18"
tags: ["content", "mdx", "schema"]
---

# Documentation content model and frontmatter schema

> **Scope:** The editorial contract for Markdown/MDX, provenance, versions and search.  
> **Evidence:** planned. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Markdown frontmatter today

All content files currently include `title`, `description`, `contentType`, `status`, `updated` and `tags`. They are compatible with future unified content parsers but intentionally avoid tying the corpus to a specific dependency before web implementation.

## Recommended future fields

```yaml
id: a105f-eos-4-1-1
slug: /devices/samsung-galaxy-a10/eos-4-1-1
category: device-labs
section: samsung-galaxy-a10
navOrder: 8
status: field-tested
risk: high
platform: windows-powershell
minAndroid: 11
maxAndroid: 16
devices: [SM-A105F]
lastVerified: 2026-11-18
sources:
  - title: TWRP Galaxy A10
    url: https://twrp.me/samsung/samsunggalaxya10.html
related: [/guides/backups, /security/rom-supply-chain]
```

Schema validation should reject missing descriptions, invalid dates, unknown evidence status and broken internal links. The site should differentiate **last edited** from **last verified on hardware**.

## Page types

- Landing topic index
- Procedure with prerequisites/checkpoints/rollback
- Device dossier with specs/partition map
- ROM profile and compatibility matrix
- Incident postmortem
- Security reference and threat model
- Lab journal
- Source credits / changelog

## Deep authoring design

For flash procedures, require fields for **risk level, destructive actions, prerequisites, safe commands, expected outputs, failure modes, rollback path and measured evidence**. Future MDX components can render warnings, CLI tabs, expected-vs-observed tables and callouts without compromising Markdown source portability.
