---
title: "Why `su` is missing after a normal reboot"
description: "Understand no-boot-ramdisk Samsung Magisk boot modes."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["magisk", "root", "boot"]
---

# Why `su` is missing after a normal reboot

> **Scope:** Understand no-boot-ramdisk Samsung Magisk boot modes.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

On the A105F stock Samsung Android 11, Magisk resided in recovery. Therefore:

- Plain boot → Android worked, but `su` not available.
- Recovery-root key timing → Android worked and `su -c id` returned `uid=0(root)`.
- Holding recovery key through boot → TWRP appeared.

When `su` is absent, do not immediately flash or factory reset. First inspect current ROM and root implementation, confirm root app/status and recovery-based boot procedure from the appropriate vendor docs.

The final /e/OS 4.1.1 system is **actually unrooted**, after installation of a new boot image; no Magisk root activation was established and user intentionally deferred rooting. Do not reuse old patched Samsung recovery on Android 14.
