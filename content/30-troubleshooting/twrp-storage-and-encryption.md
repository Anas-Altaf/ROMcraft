---
title: "TWRP backup fails to create directory"
description: "Differentiate read-only system selection, encryption, storage and mount failures."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["twrp", "encryption", "backup"]
---

# TWRP backup fails to create directory

> **Scope:** Differentiate read-only system selection, encryption, storage and mount failures.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Observed A105F failure

TWRP Backup selected `/data`, `/boot`, `/product`, `/system_image`, `/vendor_image` and reported 21 GB available but `Failed to make backup folder.` `/data/media/0` existed and was owned by `media_rw`; root `mkdir -p /data/media/0/TWRP/...` gave `Operation not permitted`.

## Interpret carefully

Selecting **Keep Read Only** generally protects System from mounting writable; it need not block reading partitions or writing a separate valid backup destination. Root-cause encryption/mount key failure was suspected, **not proven**. Force-remounting `/data`, changing recursive permissions or formatting user data can worsen the situation.

## Safer alternatives

- Save `/tmp/recovery.log` to the PC and inspect exact errors.
- If a writable microSD is available, verify it is genuinely mounted before writing there.
- Test with a tiny backup; ensure output is nonzero and valid.
- In this case, `adb backup --twrp boot` produced a 0-byte `.ab` file and was discarded.
- Use read-only raw partition streams to PC and compare full hashes/sizes.

## Limitations

Raw SYSTEM/VENDOR/PRODUCT images do not preserve encrypted app data. Root or recovery access does not guarantee transparent decryptability of userdata.
