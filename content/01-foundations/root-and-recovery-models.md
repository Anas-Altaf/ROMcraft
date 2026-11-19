---
title: "Root and recovery models: Magisk, KernelSU and TWRP"
description: "How roots work and why Galaxy A10 uses recovery-based Magisk."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["magisk", "kernelsu", "twrp"]
---

# Root and recovery models: Magisk, KernelSU and TWRP

> **Scope:** How roots work and why Galaxy A10 uses recovery-based Magisk.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Root is not recovery

TWRP is a **recovery environment**. Magisk and KernelSU are distinct **root implementations**. Flashing a custom OS often replaces both the kernel and recovery, removing earlier root even if the system boots normally.

## Galaxy A10 peculiarity

The A105F has `Ramdisk: No` in the Magisk install context. On this system-as-root, A-only model, root may be embedded in **recovery** instead of `boot`. In the field test, the combination worked: normal Android boot lacked `su`; entering the Magisk boot path produced `uid=0(root)`; holding the hardware recovery combination entered TWRP.

This is described in [TWRP's official A10 instructions](https://twrp.me/samsung/samsunggalaxya10.html) and [Magisk's installation guide](https://topjohnwu.github.io/Magisk/install.html).

## Root verification

```powershell
.\adb shell su -c id
```

`uid=0(root)` proves elevated shell access on **that running boot**. `su: inaccessible or not found` means this shell currently has no usable `su` path; it does not alone prove Magisk is absent on another boot mode.

## Common mistakes

- Reusing Magisk-patched recovery from Samsung Android 11 after switching to Android 14.
- Flashing a separate Magisk ZIP on a community ROM already containing KernelSU-Next.
- Changing SELinux to permissive as a generic fix.
- Reinstalling root before checking whether the task actually needs it.

## Current A105F choice

On /e/OS 4.1.1, `adb shell su -c id` returned `su: inaccessible or not found`. The owner elected **not** to root /e/OS unless a future need arises.
