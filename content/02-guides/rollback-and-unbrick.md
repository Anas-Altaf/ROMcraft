---
title: "Rollback and recovery after a failed flash"
description: "Decision tree for Download Mode, Odin, stock recovery, and safe partition restoration."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["rollback", "odin", "unbrick"]
---

# Rollback and recovery after a failed flash

> **Scope:** Decision tree for Download Mode, Odin, stock recovery, and safe partition restoration.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Triage first

| Symptom | First action | Avoid |
|---|---|---|
| Android boot loop, recovery works | Save `/tmp/recovery.log` and check last changed images | Repeated random wipes |
| `CUSTOM RECOVERY`/VBMETA footer error | Enter Samsung Download Mode and use verified stock recovery firmware path | Blind extra disabler ZIPs |
| Odin `FAIL` | Record exact log and slot, confirm file/device/cable | Repartition guesswork |
| `su` unavailable after ordinary boot | Check recovery-based Magisk boot path | Reinstalling whole AP immediately |
| Signature verification aborted | Use release-compatible recovery or properly signed package | Treating `adb sideload` transfer as installation success |

## Known A105F recovery

In the session, a plain TWRP Odin AP attempt produced `Error validating footer`. Flashing exact original Samsung BL/AP/CP/HOME_CSC restored device operation. Later Magisk installation initially required a recovery factory reset to escape a boot loop. Keep the full A105F stock package safe; a **recovery-only rollback TAR** cannot repair SYSTEM/VENDOR/DTB mistakes.

## Do not restore EFS casually

EFS-related partitions hold device-specific radio identity/calibration material. Never use someone else's EFS. Flashing them without confirmed corruption and same-device provenance can permanently impair telephony or violate laws.

## After restoration

Verify version, model, calling, mobile data, IMEI status on phone (do not post), baseband, Wi-Fi, camera, SELinux, encryption and reboot stability. Update the incident log with intervention and actual result.
