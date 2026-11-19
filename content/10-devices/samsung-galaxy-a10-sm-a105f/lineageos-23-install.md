---
title: "LineageOS 23.2 Android 16 on Galaxy A10"
description: "Exact unofficial release metadata, script inspection and observed first boot."
contentType: "case-study"
status: "field-tested"
updated: "2026-11-18"
tags: ["lineageos", "android16", "a10"]
---

# LineageOS 23.2 Android 16 on Galaxy A10

> **Scope:** Exact unofficial release metadata, script inspection and observed first boot.  
> **Evidence:** field tested. See [Evidence policy](../../00-start-here/evidence-and-accuracy.md).

## Chosen build

`lineage-23.2-20260626-UNOFFICIAL-a10.zip`, SHA-256 recorded on host:

`85BE4C6EF73E5A7F55EE3E8813B421203DC169B5B3D3D3F9D214338323D60FF7`

Unofficial A10/a10dd, SDK 36 Android 16; `post-security-patch-level=2026-06-01` in package metadata (a **declared** value).

## ZIP installer inspection

`updater-script` accepted `a10` and `a10dd`. It applied block updates to `/system` and `/vendor` and extracted `boot.img`, `dtb.img`, `dtbo.img` and `recovery.img`. This is important: **it deliberately replaced TWRP with LineageOS Recovery**. The script referenced Samsung firmware `A105FNXXS9CWB2`, while the test phone's stock firmware was `A105FDDS9CWD1`; both binary 9, but cross-variant compatibility was initially a risk.

`META-INF/com/android/metadata` declared pre-device `a10,a10dd`. Tested device partition symlinks matched script paths for SYSTEM/VENDOR/BOOT/RECOVERY. ZIP integrity check passed.

## Observed install and behavior

TWRP ADB sideload performed a clean installation and displayed **Successful**. After reboot, LineageOS reached welcome/onboarding and home. On the dual-Zong configuration, both SIMs were `LOADED`, network type `LTE,LTE`, and calls worked. Initially mobile data did not work; a settings reset resolved it. `settings get global mobile_data` had returned `0` and `svc data enable` did not change that key, demonstrating why this key alone was insufficient diagnosis.

## Security and maintenance limitations

The developer announced KernelSU-Next inclusion; do not assume old Magisk is compatible. The build was unofficial and released through community channels; clean installation is **not** the same as independently authenticated supply chain. Performance was unbenchmarked on the test device.
