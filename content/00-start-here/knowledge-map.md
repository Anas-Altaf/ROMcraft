---
title: "Knowledge map and learning journeys"
description: "How to navigate research content by device, difficulty, and task."
contentType: "index"
status: "field-informed"
updated: "2026-11-18"
tags: ["android", "custom-rom"]
---

# Knowledge map and learning journeys

> **Scope:** How to navigate research content by device, difficulty, and task.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](evidence-and-accuracy.md).

## Topic taxonomy

| Branch | Purpose | Key outcomes |
|---|---|---|
| `00-start-here` | Safety, definitions, provenance | Judge the risk before running a command |
| `01-foundations` | Core Android and Samsung architecture | Understand boot, flash, root and recovery |
| `02-guides` | Reusable procedures | Perform checks, make backups, diagnose failures |
| `10-devices` | Evidence-rich case studies | Apply procedures to known hardware |
| `20-roms` | ROM profiles and selection | Separate source code from trusted distributable binaries |
| `30-troubleshooting` | Symptom-oriented solutions | Recover without unnecessary destructive steps |
| `40-security` | Threat models, reproducibility | Assess risks of rooting and unofficial ROMs |
| `50-lab` | Tooling and experiments | Repeat defensible tests with clear limitations |
| `90-site-blueprint` | Product/UX/Next.js design | Build a fast, accessible documentation website |

## Learning paths

### Path A: ADB beginner

Read [ADB fundamentals](../01-foundations/adb-and-usb-debugging.md), [Device identification](../02-guides/device-discovery.md) and [Evidence policy](evidence-and-accuracy.md). Learn why `adb devices` showing `recovery` differs from `device`, and why ADB permissions change across boot modes.

### Path B: ROM installer

Read [Risk and backup strategy](../02-guides/backup-and-restore-strategy.md), [ROM authenticity](../40-security/rom-supply-chain.md), [Recovery installation](../02-guides/twrp-installation-principles.md), [ROM installation](../02-guides/custom-rom-installation.md) and [Rollback](../02-guides/rollback-and-unbrick.md).

### Path C: Security investigator

Read [Boot trust model](../40-security/verified-boot-and-lock-state.md), [SELinux and kernel hardening](../40-security/selinux-kernel-and-root.md), [APK/ROM inspection](../40-security/rom-supply-chain.md), [Capture and instrumentation](../50-lab/network-and-runtime-tools.md) and [Case study](../10-devices/samsung-galaxy-a10-sm-a105f/security-findings.md).

## Documentation conventions

Use clear warnings, reversible steps first, correct shell labels (`powershell`, `bash`, `sh`), command output checkpoints, expected and unexpected outcomes, and an explicit rollback path for any flash procedure. No guide should present a checksum as universal unless sourced from the vendor's corresponding release.
