---
title: "Android recovery troubleshooting index"
description: "Symptom-oriented routing to safe read-only diagnosis before destructive repair."
contentType: "index"
status: "field-informed"
updated: "2026-11-18"
tags: ["troubleshooting"]
---

# Android recovery troubleshooting index

> **Scope:** Symptom-oriented routing to safe read-only diagnosis before destructive repair.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

| Symptom | Start here |
|---|---|
| ADB pushes say success then file missing | [ADB and transfers](adb-and-transfers.md) |
| TWRP cannot back up Data or create folders | [TWRP storage and encryption](twrp-storage-and-encryption.md) |
| Sideload finishes but ROM aborts | [Signature and recovery mismatch](signature-and-recovery.md) |
| Calls work but mobile data fails | [Telephony and APN](telephony-and-data.md) |
| Custom recovery shows footer/VBMETA error | [Boot and AVB failures](boot-and-vbmeta.md) |
| Root command missing after reboot | [Root boot-mode differences](root-mode.md) |
| Unexplained app crashes | [App and system crash logs](app-crashes.md) |

## General escalation

For every incident capture **device model → firmware version → last action → exact error text → `adb devices` state → relevant log → preserved rollback artifacts**. Do not repeat a failed destructive action without a new hypothesis.
