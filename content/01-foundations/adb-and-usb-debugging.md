---
title: "ADB fundamentals and Windows shell hygiene"
description: "ADB connectivity, authorized device states, safe binary transfers and PowerShell pitfalls."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["adb", "powershell", "windows"]
---

# ADB fundamentals and Windows shell hygiene

> **Scope:** ADB connectivity, authorized device states, safe binary transfers and PowerShell pitfalls.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Device visibility

```powershell
.\adb devices
.\adb shell getprop ro.product.device
.\adb shell getprop ro.build.version.release
```

Possible states include `device`, `recovery`, `unauthorized`, `offline`, or no device. Recovery ADB can be rooted while normal Android ADB is unprivileged; do not confuse them.

## Transfer and verify

```powershell
.\adb push '.\example.img' /data/local/tmp/example.img
.\adb shell sha256sum /data/local/tmp/example.img
(Get-FileHash '.\example.img' -Algorithm SHA256).Hash
```

In the A105F case, `adb push ... /sdcard/Download/` returned `failed to read copy response: EOF` and the file did not exist afterwards. Pushing to `/data/local/tmp` succeeded; only after verification was the file copied to shared storage from the device. A transfer-progress message is not evidence of a file's final existence.

## Binary-stream hazard on Windows

Windows PowerShell 5.1 may transform stdout when redirecting binary streams. Use `cmd.exe` for an exact raw image pipeline, then compare SHA-256 with device's block device. Example **read-only** command (device and partition must be correct):

```powershell
cmd.exe /d /c '.\adb.exe exec-out "dd if=/dev/block/by-name/boot bs=4096 2>/dev/null" > boot-backup.img'
```

**Never** pipe binary images through PowerShell 5.1 text redirection. PowerShell 7 behavior differs; do not infer safety without a hash comparison.

## Failure checklist

Check cable/port, recovery screen, Android USB debugging authorization, `adb kill-server`, device state, available storage and writable mount. Prefer one change at a time, then verify file sizes and hashes.
