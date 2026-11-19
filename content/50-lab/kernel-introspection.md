---
title: "Kernel configuration capture and baseline analysis"
description: "How /proc/config.gz and sysctls informed A105F security research."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["kernel", "config", "security"]
---

# Kernel configuration capture and baseline analysis

> **Scope:** How /proc/config.gz and sysctls informed A105F security research.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## A105F observation

`/proc/config.gz` was present because `CONFIG_IKCONFIG_PROC=y`. The file was pulled to Windows and decompressed into a kernel configuration text file. Despite an unsuccessful chmod attempt, the actual data transfer succeeded.

## Read-only capture example

```powershell
.\adb pull /proc/config.gz .\kernel-config.gz
.\adb shell uname -a
.\adb shell cat /proc/sys/kernel/kptr_restrict
.\adb shell cat /proc/sys/kernel/dmesg_restrict
.\adb shell cat /proc/sys/kernel/randomize_va_space
```

Some reads may require root. Use the values measured on the current boot; kernel config names may reflect a vendor build rather than modern upstream Linux semantics. For hardened kernel claims, inspect option assignments, active LSMs, cmdline and actual runtime behavior.

## Recorded concerns

The old 4.4.177 kernel branch and enabled debug-related options motivated further review. No exploitability was established, and the user deliberately deferred deeper kernel exploitation research in favor of ROM installation.
