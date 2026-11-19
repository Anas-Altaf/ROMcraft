---
title: "LineageOS on Galaxy A10: unofficial options"
description: "What was researched, what was tested and why official A10 support matters."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["lineageos", "android16", "a10"]
---

# LineageOS on Galaxy A10: unofficial options

> **Scope:** What was researched, what was tested and why official A10 support matters.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Official status

The Galaxy A10 SM-A105F had no confirmed official LineageOS release in the project device list during the case study. Official LineageOS upstream source **does not** turn a separately compiled A10 port into an official supported device. Verify current support at [LineageOS devices](https://wiki.lineageos.org/devices/).

## Evaluated candidates

- **LineageOS 20 / Android 13**, Eureka Team, A10/a10dd, late 2023 community build: older candidate; not tested on this handset.
- **LineageOS 23.2 / Android 16**, `lineage-23.2-20260626-UNOFFICIAL-a10.zip`: downloaded, ZIP and installer examined, **flashed successfully** and booted. Calls and mobile data worked after reset. It **overwrote recovery**.

## Major risks

Unverified community binary provenance, unknown support lifetime, proprietary vendor/kernel lineage, possible interface performance issues on 2 GB memory, and incompatibility with conventional Magisk on a ROM bundling KernelSU-Next (according to community release instructions).

## End result

We moved to /e/OS because the UI preference did not favor LineageOS on this particular experiment. Functional success of LineageOS was real; aesthetic dissatisfaction is subjective.
