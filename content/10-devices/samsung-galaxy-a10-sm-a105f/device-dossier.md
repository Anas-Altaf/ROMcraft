---
title: "Galaxy A10 A105F: exact hardware and firmware dossier"
description: "All model-specific observations needed to understand the experiment."
contentType: "case-study"
status: "field-tested"
updated: "2026-11-18"
tags: ["a105f", "specs", "partitions"]
---

# Galaxy A10 A105F: exact hardware and firmware dossier

> **Scope:** All model-specific observations needed to understand the experiment.  
> **Evidence:** field tested. See [Evidence policy](../../00-start-here/evidence-and-accuracy.md).

## Identification

| Attribute | Observed value |
|---|---|
| Retail family | Samsung Galaxy A10 |
| Exact model | SM-A105F |
| Stock firmware | `A105FDDS9CWD1` |
| Android / One UI stock | Android 11, Samsung One UI generation 3.x |
| Stock CSC | `PAK` |
| Bootloader binary | 9 |
| SoC | Samsung Exynos 7884B |
| CPU | 8 logical CPUs: 6× Cortex-A53, 2× Cortex-A73 |
| Kernel stock | Linux `4.4.177` |
| ABI | ARMv8 capable CPU, but `armeabi-v7a` (32-bit Android userspace) |
| Recovery style | A-only, system-as-root, no boot ramdisk for Magisk |
| Bootloader | Unlocked in stock experiments |
| Root stock | Magisk 31.1, recovery mode |
| Current final system | /e/OS 4.1.1 Android 14, **unrooted** |

## Important codename distinction

On the actual device, TWRP reported `ro.product.device=a10`. Some firmware and ROM metadata also referenced `a10dd`; userland may carry variant naming. A matching `a10` assertion is necessary but is not a guarantee for a proprietary baseband or exact SM-A105F hardware revision.

## Partition map (A105F observed)

| Name | Block path |
|---|---|
| `efs` | `/dev/block/mmcblk0p3` |
| `sec_efs` | `/dev/block/mmcblk0p4` |
| `cpefs` | `/dev/block/mmcblk0p5` |
| `boot` | `/dev/block/mmcblk0p15` |
| `recovery` | `/dev/block/mmcblk0p16` |
| `dtb` | `/dev/block/mmcblk0p17` |
| `dtbo` | `/dev/block/mmcblk0p18` |
| `radio` | `/dev/block/mmcblk0p19` |
| `vbmeta` | `/dev/block/mmcblk0p22` |
| `system` | `/dev/block/mmcblk0p25` |
| `vendor` | `/dev/block/mmcblk0p26` |
| `product` | `/dev/block/mmcblk0p27` |
| `userdata` | `/dev/block/mmcblk0p32` |

**Never transplant these raw numbers to a different phone without verification.**

## Architecture consequences

32-bit userspace restricts compatible root/instrumentation binaries and device build targets. Android 14 or 16 userland alone cannot modernize proprietary modem firmware, the 4.4-class kernel lineage, or TrustZone components. With approximately 2 GB device RAM, flagship UI ports and newer frameworks may be slow.
