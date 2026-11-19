---
title: "AVB, VBMETA, SELinux and security properties"
description: "Interpret integrity flags and security reports without false assurances."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["avb", "selinux", "security"]
---

# AVB, VBMETA, SELinux and security properties

> **Scope:** Interpret integrity flags and security reports without false assurances.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Android Verified Boot

The VBMETA header begins `AVB0`. In this device's saved `vbmeta` image, header bytes **120–123** contained `00 00 00 03`, interpreted as AVB disable-verification and disable-hashtree flags (bit `0x2` and `0x1`). That observation was **specific to the image backed up in the field test**; never generalize it to all A10 units.

Even with those flags, an earlier direct TWRP flash produced a Samsung `Error validating footer` failure. AVB metadata flags do **not** preclude every vendor bootloader or recovery check.

## SELinux

`adb shell getenforce` returned `Enforcing` on the initial Samsung system and again on final /e/OS Android 14. This is a positive baseline. It does not establish policy quality, patch freshness or binary provenance.

## Reported 'green' on a custom ROM

On /e/OS, `ro.boot.verifiedbootstate` returned `green` while other lock-state properties were empty and the device was known to have an unlocked bootloader. Treat this as **unverified reporting**, not proof of a locked chain of trust. Never relock with unofficial firmware installed.

## Dev keys

`ro.build.tags=dev-keys` was observed on /e/OS. This supports a development/unofficial build assessment; it is not proof of malware.

## Effective security model

Security depends on trusted origin, maintainer transparency, patch integration, kernel/vendor firmware age, bootloader and partition policy, encryption, SELinux, root status and update delivery—not Android version alone.
