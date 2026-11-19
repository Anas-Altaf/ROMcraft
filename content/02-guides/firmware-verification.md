---
title: "Verify firmware packages and patched AP images"
description: "Checksum, contents and transfer verification before Odin flashing."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["firmware", "hashing", "magisk"]
---

# Verify firmware packages and patched AP images

> **Scope:** Checksum, contents and transfer verification before Odin flashing.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Source integrity

Prefer official or vendor-authorized downloads, signed packages when available, and independent checksums. A Samsung `.tar.md5` extension can indicate an appended MD5 footer but does not establish trusted provenance. Check the file and its contents before flashing.

## A105F lesson: incomplete patched AP

The initial Magisk patched AP package was incomplete (missing several expected partitions). The source AP copied to phone was not the same as the Windows original. After matching the exact source AP SHA-256 between PC and phone, Magisk produced a complete AP TAR; Odin flashing then worked after a factory reset from recovery.

## Checklist

1. Record precise firmware identification and bootloader binary.
2. Calculate SHA-256 on PC before transfer.
3. Transfer; verify destination size and SHA-256.
4. Patch with correct Magisk recovery mode if applicable.
5. Inspect archive names and sizes, not just completion status.
6. Record output hash; verify round-trip copy.
7. Keep complete stock firmware separately for rollback.

## Example read-only inspection

```powershell
Get-FileHash '.\AP_...tar.md5' -Algorithm SHA256
# tar may or may not read the Samsung .md5 footer on your host:
tar.exe -tf '.\AP_...tar.md5' | Select-Object -First 30
```

Avoid pasting misleading example filenames into flash utilities. The documented SHA-256 values in the A10 case apply **only** to its preserved artifacts.
