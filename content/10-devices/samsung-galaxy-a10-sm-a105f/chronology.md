---
title: "A105F chronological experiment log"
description: "A high-fidelity timeline from stock Samsung through the final /e/OS installation."
contentType: "case-study"
status: "field-tested"
updated: "2026-11-18"
tags: ["timeline", "a10", "results"]
---

# A105F chronological experiment log

> **Scope:** A high-fidelity timeline from stock Samsung through the final /e/OS installation.  
> **Evidence:** field tested. See [Evidence policy](../../00-start-here/evidence-and-accuracy.md).

## Stage 0 — Baseline and recoverability

Samsung Android 11 firmware A105FDDS9CWD1 (PAK, binary 9) established. Unlocked bootloader, ADB available. Stock firmware with AP, BL, CP, CSC/HOME_CSC obtained. Model, architecture, kernel and partitions recorded.

## Stage 1 — First TWRP failure

Plain TWRP Odin AP attempt triggered `recovery: Error validating footer`, `CUSTOM RECOVERY`, `VBMETA A105FDDS9CWD1` and Download Mode. Resolved by reflashing matching stock BL/AP/CP/HOME_CSC. **Lesson:** a verified file may still be rejected by Samsung boot checks.

## Stage 2 — Magisk 31.1 rooted Samsung Android

First patched AP package missing critical payloads because source transfer to phone was not bit-identical. Re-transferred AP; SHA-256 matched. Magisk Recovery Mode produced correct patched AP; Odin flashed. Boot loop resolved via factory reset. Root confirmed `uid=0(root)` on recovery-root boot mode.

## Stage 3 — Runtime and network research

ADB/logcat, kernel config, `tcpdump` and Frida experiments. Some Frida ARM32 Java instrumentation failed; native tracing succeeded. Experiments paused in favor of a ROM decision.

## Stage 4 — Magisk-compatible TWRP

Official TWRP 3.7.0_11-0 image downloaded and published checksum matched. First push to `/sdcard/Download` failed with EOF and missing file. `/data/local/tmp` transfer and SHA-256 succeeded. Image patched by Magisk 31.1; Odin recovery-only TAR and rollback TAR prepared. Patched TWRP installed through Odin, booted and passed ADB/TWRP properties. Samsung Android 11 still booted normally and via rooted Magisk boot.

## Stage 5 — Firmware and EFS backups

BOOT, RECOVERY, VBMETA, SYSTEM, VENDOR, PRODUCT, DTB, DTBO, EFS, SEC_EFS and CPEFS raw images copied to Windows with exact size and SHA-256 checks. TWRP backup folder creation failed; `adb backup --twrp` zero bytes; direct binary streams worked. All critical images verified.

## Stage 6 — LineageOS 23.2 unofficial Android 16

ZIP metadata and updater-script inspected; accepted `a10,a10dd`. TWRP sideload declared successful and LineageOS booted and onboarded. Both Zong SIMs, voice and mobile data worked (mobile data after a reset). Installer replaced recovery with LineageOS Recovery.

## Stage 7 — /e/OS 4.1.1 unofficial Android 14

ZIP downloaded, CRC validated, scripts reviewed. LineageOS Recovery rejected sideload due to signature verification and aborted. TWRP restored via prepared Odin TAR, then /e/OS installed successfully using TWRP sideload (host progress roughly 46%). Booted Android 14; all major device hardware tests passed.

## Stage 8 — Final security/operations

`ro.lineage.version=4.1.1-a14-20260731-UNOFFICIAL-a10`; SELinux Enforcing; declared patch 2026-07-01; development build; reported green verified boot **not trusted as attestation**. Root not installed (`su` unavailable), by deliberate choice. /e/OS App Lounge one Java NPE in crash log; no kernel panic observed.
