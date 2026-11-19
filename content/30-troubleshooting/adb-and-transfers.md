---
title: "Fix unreliable ADB pushes and raw-stream backups"
description: "Diagnose EOF, reconnects, missing files and truncated images."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["adb", "transfers"]
---

# Fix unreliable ADB pushes and raw-stream backups

> **Scope:** Diagnose EOF, reconnects, missing files and truncated images.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Symptom

`adb push ... /sdcard/Download` reports full byte transfer but ends `failed to read copy response: EOF`; subsequent `ls` says file missing. Or `adb exec-out` produces partial raw image due to disconnect.

## Diagnosis and safe repair

```powershell
.\adb devices
.\adb shell df -h /data/local/tmp /sdcard/Download
.\adb shell ls -ld /sdcard/Download
.\adb push '.\image.img' /data/local/tmp/image.img
.\adb shell ls -l /data/local/tmp/image.img
.\adb shell sha256sum /data/local/tmp/image.img
```

If direct local storage transfer works, compare checksum before moving to shared storage. For raw streams, match both partition size and host SHA-256. If a large transfer fails, smaller chunks are an option, but make each chunk's offsets and checksums explicit. Avoid relying on transfer percentages or terminal exit alone.

## Actual A105F result

`/data/local/tmp` allowed the 42,385,424-byte TWRP image to transfer correctly at full SHA-256. A first SYSTEM image was only 211,744,256 bytes; retry yielded a complete 3,556,769,792-byte file with correct hash.
