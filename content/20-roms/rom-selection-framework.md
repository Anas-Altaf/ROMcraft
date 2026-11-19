---
title: "Choosing a ROM: UI, speed, security, maintenance"
description: "A multi-dimensional decision framework beyond version numbers."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["rom-selection", "performance", "security"]
---

# Choosing a ROM: UI, speed, security, maintenance

> **Scope:** A multi-dimensional decision framework beyond version numbers.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Criteria

| Dimension | Investigate |
|---|---|
| Compatibility | Exact device, radio, camera, partitions, bootloader revision |
| Security | Verified build provenance, monthly patches, SELinux, boot chain, update cadence |
| Longevity | Active developer, support forum, documented bug fixes, reproducible sources |
| Usability | UI, launcher, settings, localization, accessibility, app compatibility |
| Performance | CPU, 32-bit userspace, 2 GB RAM, background memory, thermals |
| Control | Root availability, optional GApps, network policy, custom recovery |
| Recovery | Rollback packages, data format requirements, update signature behavior |

## Separate three concepts

1. **Project maintenance** (e.g., upstream LineageOS may be active).
2. **Device maintenance** (Galaxy A10 may not have official builds).
3. **One particular ZIP's freshness** (a 2026 package is not automatically patched against every 2026 vulnerability).

## A10 lessons

LineageOS 23.2 worked but the user disliked its interface. /e/OS was later successfully installed and all major hardware functions worked. Samsung-style One UI ports were explored but not installed. User preference matters, but do not sacrifice security findings to aesthetic claims.

## Publication rule

Every ROM profile must list whether it was **installed and tested**, **downloaded/inspected**, or **researched only**. Never label community packages as 'official LineageOS'.
