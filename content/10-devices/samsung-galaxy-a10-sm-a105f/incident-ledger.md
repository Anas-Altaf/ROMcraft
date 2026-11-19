---
title: "Incident ledger and failed paths"
description: "What broke, the diagnostic evidence, fixes, and the wrong conclusions avoided."
contentType: "case-study"
status: "field-tested"
updated: "2026-11-18"
tags: ["troubleshooting", "incidents"]
---

# Incident ledger and failed paths

> **Scope:** What broke, the diagnostic evidence, fixes, and the wrong conclusions avoided.  
> **Evidence:** field tested. See [Evidence policy](../../00-start-here/evidence-and-accuracy.md).

| Incident | Symptom / evidence | Result | General lesson |
|---|---|---|---|
| Plain TWRP flash | `Error validating footer`, VBMETA, Download Mode | Stock Odin firmware restored | Pre-root recovery for A-only Magisk devices; AVB flags alone insufficient |
| First Magisk AP patch | Incomplete package; source copy mismatch | Exact SHA comparison, retransfer, repatch | Inspect patch archive contents and hashes |
| Magisk initial boot loop | Boot after Odin did not start normally | Factory reset via recovery | Back up user data; root can require wipes in practice |
| ADB shared-storage push | EOF + nonexistent destination file | Push `/data/local/tmp` + hash + internal copy | Do not trust transfer progress alone |
| TWRP backup | `Failed to make backup folder` | Raw partition streams to PC | Read-only TWRP choice not proven cause; data mount issue suspected |
| TWRP `adb backup` | `.ab` file length 0 | Rejected as unusable | Empty output is not a backup |
| SYSTEM raw image | First file 211,744,256 B, hash wrong | Retry; 3,556,769,792 B and matching hash | Check size AND SHA-256 |
| LineageOS mobile data | Two SIMs loaded, calls worked, data absent | Reset restored mobile data | Avoid prematurely blaming modem or APN |
| /e/OS Lineage Recovery sideload | `Total xfer: 1.00x`, signature failure, abort | Restored TWRP, sideload success | ADB transfer completion ≠ install success |
| ARM32 Frida Java bridge | `invalid instruction` / incompatible bridge | Native tracing only; study paused | ABI-specific tooling must be version-matched |
| /e/OS App Lounge crash | Java `NullPointerException` in navigation | One crash logged; no general failure established | Interpret logs at the correct scope |
