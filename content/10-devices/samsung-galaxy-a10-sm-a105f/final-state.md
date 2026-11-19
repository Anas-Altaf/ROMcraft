---
title: "Final operating state: /e/OS 4.1.1 (18 Nov 2026)"
description: "Snapshot of the real working device and remaining unknowns."
contentType: "case-study"
status: "field-tested"
updated: "2026-11-18"
tags: ["current-state", "eos", "a10"]
---

# Final operating state: /e/OS 4.1.1 (18 Nov 2026)

> **Scope:** Snapshot of the real working device and remaining unknowns.  
> **Evidence:** field tested. See [Evidence policy](../../00-start-here/evidence-and-accuracy.md).

## Confirmed working

| Area | Result |
|---|---|
| Device | Samsung Galaxy A10 SM-A105F |
| ROM | /e/OS `4.1.1-a14-20260731-UNOFFICIAL-a10` |
| Android | 14 |
| Security patch (reported) | 2026-07-01 |
| SELinux | Enforcing |
| Root | **Not available**, intentional |
| SIM calling | Working |
| Mobile data | Working |
| Wi-Fi | Working |
| Bluetooth | Working |
| Camera | Working |
| GPS/location | Working |
| Speaker and microphone | Working |
| ADB | Working |
| Internal free space | About 21 GB in last measurement |

## Not established

- Verified Boot hardware-backed trust / true bootloader lock state.
- Official OTA maintenance for this unofficial A10 build.
- Long-term battery, thermals, microSD, hotspot, media codecs, NFC (if hardware present), banking compatibility or prolonged stress testing.
- Reproducible binary provenance for the downloaded unofficial package.
- Whether older restored TWRP still survives all future update paths.

## Root decision

`/system/bin/sh: su: inaccessible or not found` on Android 14. We chose **not to root** at this point. Recovery-based Magisk might be possible but must be prepared from the current ROM's boot/recovery artifacts and tested separately; reusing the Samsung Android 11 patched image is unsafe.

## Operational advice

Keep exact Windows backups and Odin rollback package private. Revisit device security patches if new releases arise, but do not automatically install updates from unauthenticated mirrors.
