---
title: "Custom ROM installation decision tree"
description: "Inspect OTA packages, choose appropriate recovery, plan clean flash and first boot."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["rom", "install", "recovery"]
---

# Custom ROM installation decision tree

> **Scope:** Inspect OTA packages, choose appropriate recovery, plan clean flash and first boot.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Before flashing

1. Identify **official** versus **community**/unofficial build and its maintainers.
2. Confirm model/codename/firmware prerequisites, partition sizes, special kernel and encryption requirements.
3. Verify ZIP CRC, published signature/checksum if available, `META-INF/com/android/metadata` and installer scripts.
4. Identify changes to BOOT/SYSTEM/VENDOR/DTB/DTBO/RECOVERY and whether `userdata` needs formatting.
5. Preserve rollback assets and any personal data; verify recovery mode still works.

## Traditional recovery ZIP

Files such as `META-INF/com/google/android/update-binary`, `updater-script`, `system.transfer.list` and `system.new.dat.br` usually indicate a block-based recovery update package. `ota-type=BLOCK` and `pre-device=` in metadata help determine compatibility. However, **LineageOS Recovery may reject a differently signed unofficial ZIP**, even when archive CRC is valid.

## Safest execution order

- Check the correct installation method in the specific release notes.
- Clean flash/format only if required by the documented upgrade path; protect non-target partitions.
- Install ZIP; read **recovery-side** success/failure, not merely the PC's `Total xfer` or 47% transfer progress.
- Stop on errors and inspect logs before retrying.
- First boot: validate Android version, build identity, SELinux, calls/data, Wi-Fi and camera.

## Case study

A105F LineageOS 23.2 flashed successfully through TWRP and **replaced TWRP with LineageOS Recovery**. Later, an unofficial /e/OS ZIP was rejected by LineageOS Recovery with signature verification failure. Restoring TWRP via Odin allowed /e/OS to install successfully. See [LineageOS](../10-devices/samsung-galaxy-a10-sm-a105f/lineageos-23-install.md) and [/e/OS migration](../10-devices/samsung-galaxy-a10-sm-a105f/eos-4-install.md).
