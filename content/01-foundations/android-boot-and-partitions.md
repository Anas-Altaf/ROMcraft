---
title: "Android boot chain and partition architecture"
description: "Understand boot, recovery, kernel, dtb/dtbo, modem and partition images."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["android", "boot", "partitions"]
---

# Android boot chain and partition architecture

> **Scope:** Understand boot, recovery, kernel, dtb/dtbo, modem and partition images.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Boot flow at a high level

`Power on → SoC boot ROM → vendor bootloader stages → boot/recovery decision → Linux kernel → init → Android userspace`.

Hardware design, partition scheme and security configuration differ by model. Samsung A10 is **A-only, system-as-root** with recovery-based Magisk: it must not be treated as a modern A/B Pixel device. [Official TWRP A10 documentation](https://twrp.me/samsung/samsunggalaxya10.html) explains why Magisk and TWRP can share recovery boot logic.

## Partition roles

| Partition | Broad role | Restore caution |
|---|---|---|
| `boot` | Kernel / boot chain components | Must match ROM and device |
| `recovery` | Recovery kernel and ramdisk; also Magisk on some phones | Replacing may remove recovery-based root |
| `system` | Android framework and apps | ROM-specific; can exceed several GiB |
| `vendor` | Device HALs and vendor binaries | Version mismatch can break radio and camera |
| `product` | Device/product-specific apps and resources | May not be overwritten by every ROM installer |
| `dtb`, `dtbo` | Hardware description and overlays | Wrong images can prevent boot |
| `vbmeta` | Verified Boot metadata and flags | Not a substitute for all Samsung checks |
| `userdata` | App data, encryption keys and internal storage | Formatting destroys local data |
| `efs`, `sec_efs`, `cpefs` | Radio identity/configuration | Device unique: keep private |

## Raw image ≠ complete backup

A raw `system.img` is excellent for exact partition comparison, but it does not include userdata, app accounts, photo libraries, encryption state or the entire chain of boot firmware. Vendor Odin packages are compressed and arranged differently from plain raw images.

## Security interpretation

AVB flags are not the same as a physically locked bootloader. Kernel/ROM properties can report stale or synthetic state. Trust decisions should consider hardware key ownership, bootloader state, signed images, SELinux, firmware provenance and update cadence.
