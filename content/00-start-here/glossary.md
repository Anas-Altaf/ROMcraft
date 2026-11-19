---
title: "Glossary of Android modding terms"
description: "Definitions for first-time readers and cross-reference anchors."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["glossary", "basics"]
---

# Glossary of Android modding terms

> **Scope:** Definitions for first-time readers and cross-reference anchors.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](evidence-and-accuracy.md).

| Term | Meaning |
|---|---|
| ADB | Android Debug Bridge; communicates with authorized running Android or recovery |
| AP / BL / CP / CSC | Samsung Odin firmware components (application/bootloader/modem/customization) |
| AVB / VBMETA | Android Verified Boot and metadata governing integrity checks |
| Bootloader binary | Samsung firmware revision gate, often encoded in the build string |
| Custom recovery | Independent boot environment such as TWRP or LineageOS Recovery |
| `a10` / `a10dd` | Device-codename variants referenced by community ROMs; not sufficient proof of hardware compatibility |
| EFS / SEC_EFS / CPEFS | Sensitive, device-specific cellular data partitions |
| Fastboot | Flashing protocol common on many Android phones; Samsung commonly uses Download Mode/Odin instead |
| GSI | Generic System Image; not automatically hardware-complete |
| KernelSU / Magisk | Distinct privileged-access/root mechanisms |
| Odin | Samsung Download Mode flashing utility |
| OTA | Over-the-air software update package |
| Recovery ramdisk | Minimal userspace used to boot recovery; special on Samsung no-boot-ramdisk models |
| SELinux | Mandatory access control in Android; `Enforcing` is generally preferable |
| Sideload | Stream a recovery installation package from PC with `adb sideload` |
| TWRP | Team Win Recovery Project |
| Vendor blobs | Proprietary binaries needed for hardware and radio integration |

For architecture and practical examples, use the Foundations and Device chapters.
