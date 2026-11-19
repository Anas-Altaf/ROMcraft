---
title: "A layered Android backup and restoration strategy"
description: "Preserve boot chain, firmware, EFS and user data with multiple independent restoration paths."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["backup", "restore", "efs"]
---

# A layered Android backup and restoration strategy

> **Scope:** Preserve boot chain, firmware, EFS and user data with multiple independent restoration paths.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Backup layers

1. **Factory/Odin firmware:** model-matched BL/AP/CP/CSC archives for full return to stock.
2. **Critical raw images:** BOOT, RECOVERY, VBMETA, DTB, DTBO.
3. **OS partitions:** SYSTEM, VENDOR, PRODUCT.
4. **Sensitive radio partitions:** EFS, SEC_EFS, CPEFS—encrypt and keep private.
5. **User data:** app databases, photos, downloads, keys and MFA recovery codes via separate backups. Note that normal `/sdcard` pulls omit private app data.

## For raw partition backups

Run only in verified recovery or rooted shell; replace partition names as discovered on *your own* device.

```powershell
# Windows PowerShell 5.1: preserve exact binary stdout using cmd.exe.
cmd.exe /d /c '.\adb.exe exec-out "dd if=/dev/block/by-name/boot bs=4096 2>/dev/null" > A10_BOOT.img'

.\adb shell sha256sum /dev/block/by-name/boot
(Get-FileHash '.\A10_BOOT.img' -Algorithm SHA256).Hash
```

Compare **full** SHA-256 and `blockdev --getsize64` against file length. A truncated file can exist despite no visible error.

## TWRP backup pitfalls

TWRP on the A105F correctly enumerated selected partitions and 21 GB free but failed `Failed to make backup folder` under `/data/media/0`. As recovery root, `mkdir` returned `Operation not permitted`. The suspected issue was encryption or mount/key handling; exact cause unproven. A subsequent `adb backup --twrp boot` produced **0 bytes**. Direct raw image streaming succeeded instead.

## Restoring

Full restore involves matching all relevant firmware/recovery/partition requirements, not simply writing images in arbitrary order. Avoid automated 'restore all' scripts without device-specific validation. An EFS restore is a last-resort operation **only to the same phone**. A verified backup does not guarantee data-preserving restore.
