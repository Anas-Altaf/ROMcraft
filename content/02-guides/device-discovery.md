---
title: "Identify an Android device before modifying it"
description: "Read-only discovery playbook for model, SoC, firmware, ABI, bootloader and partitions."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["android", "custom-rom"]
---

# Identify an Android device before modifying it

> **Scope:** Read-only discovery playbook for model, SoC, firmware, ABI, bootloader and partitions.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Read-only inspection

```powershell
.\adb devices
.\adb shell getprop ro.product.model
.\adb shell getprop ro.product.device
.\adb shell getprop ro.product.name
.\adb shell getprop ro.build.fingerprint
.\adb shell getprop ro.build.version.release
.\adb shell getprop ro.product.cpu.abilist
.\adb shell uname -a
.\adb shell getenforce
```

Record output with timestamps, but redact serial numbers and accounts before publishing. A ROM ZIP may accept `a10` and `a10dd` while still having a device-specific vendor/firmware mismatch. Codename acceptance is a **necessary filter, not complete compatibility proof**.

## Storage and partition map

On compatible Android recovery, use:

```powershell
.\adb shell ls -l /dev/block/by-name
.\adb shell blockdev --getsize64 /dev/block/by-name/boot
```

Note that some commands require root. Do not assume partition numbers from a similar Galaxy model; always resolve the symlink on the target device.

## Record table

Use `model`, `board`, `bootloader binary`, `CSC`, `Android`, `kernel`, `ABIs`, `recovery`, `root mode`, `encryption state`, `SELinux`, `radio carriers`, `backup status` and `last tested`.
