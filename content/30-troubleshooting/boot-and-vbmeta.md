---
title: "Boot loops, VBMETA and recovery footer errors"
description: "Handling rejected recovery images and secure rollback."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["vbmeta", "bootloop", "odin"]
---

# Boot loops, VBMETA and recovery footer errors

> **Scope:** Handling rejected recovery images and secure rollback.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Error example

```text
recovery: Error validating footer
CUSTOM RECOVERY
VBMETA A105FDDS9CWD1
```

This was observed after flashing an unmodified TWRP image directly on the A105F. A full compatible stock Odin firmware restored access. A later **Magisk-patched TWRP** image did boot, but no blanket guarantee follows for other firmwares or patch levels.

## What not to assume

- `AVB0` flags `0x00000003` do not disable every Samsung validation stage.
- An unlocked bootloader and OEM unlock setting do not guarantee any recovery image will boot.
- Recovery-only restore archives will not fix arbitrary system/vendor or bootloader incompatibility.

## Recovery process

Document exact error, enter Download Mode deliberately, verify model/binary/firmware hashes and restore known-good stock package as needed. Stop if Odin `FAIL`; do not guess PIT layouts or force repartitioning. Keep all EFS data private and unchanged.
