---
title: "A105F security findings and trust boundaries"
description: "Evidence on SELinux, AVB, old kernel configuration, root, crash log and unofficial ROM risk."
contentType: "case-study"
status: "field-tested"
updated: "2026-11-18"
tags: ["security", "kernel", "avb"]
---

# A105F security findings and trust boundaries

> **Scope:** Evidence on SELinux, AVB, old kernel configuration, root, crash log and unofficial ROM risk.  
> **Evidence:** field tested. See [Evidence policy](../../00-start-here/evidence-and-accuracy.md).

## Security facts that were measured

- Stock rooted Android 11 ran Linux kernel `4.4.177`; `/proc/config.gz` accessible, `CONFIG_IKCONFIG=y`, `CONFIG_KALLSYMS=y`, `CONFIG_KALLSYMS_ALL=y`, `CONFIG_SECCOMP=y`, `CONFIG_SECCOMP_FILTER=y`, `CONFIG_RANDOMIZE_BASE=y`, `CONFIG_DEBUG_FS=y`, `CONFIG_HARDENED_USERCOPY=y`, `CONFIG_SECURITY_SELINUX=y`, `CONFIG_SECURITY_SELINUX_DEVELOP=y`. `kernel.kptr_restrict=4`, `dmesg_restrict=0`, user-space ASLR `randomize_va_space=2`.
- Kernel configuration also reported `CONFIG_ARM64_PAN=y`, and several stack protector option names; compile-time macro presence was not treated as definitive runtime hardening without checking value semantics.
- SELinux **Enforcing** on stock and /e/OS.
- Saved stock-based VBMETA carried `AVB0` and flags `0x00000003` (disable AVB verification/hashtree).
- /e/OS runtime property reported `ro.boot.verifiedbootstate=green`, but the unlocked bootloader history and absent `ro.boot.flash.locked`/`ro.boot.vbmeta.device_state` prevented a trustworthy conclusion.
- /e/OS build tagged `dev-keys`; intended version `4.1.1-a14-20260731-UNOFFICIAL-a10`; declared patch 2026-07-01.
- On /e/OS, `ro.e.version` and `ro.e.build.version` were empty. However, `ro.lineage.version` and `ro.modversion` identified the build and many `foundation.e.*` packages (App Lounge, Bliss Launcher, Advanced Privacy, backups and others) were installed.

## Application crash

An App Lounge process `foundation.e.apps` generated a `java.lang.NullPointerException` relating to `NavHostFragment` in `MainActivity`. One app crash is not proof of kernel instability, compromise or recurring OS-wide failure.

## Trust boundaries

The unofficial ROM could contain privileged components not visible from the updater-script. Source review, repeatable builds and signed artifacts are stronger assurance than a ZIP CRC check. Do not make claims about secure boot state from a single property, or claim manufacturer-level updates from an OS-reported patch date alone.

## Research posture

This A10 is useful as an experimental device. Treat unsupported modem, proprietary firmware and aging kernel branches as independent security issues. Do not store critical secrets solely on a research ROM.
