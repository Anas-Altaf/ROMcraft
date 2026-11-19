---
title: "A105F artifact and checksum manifest"
description: "Publishable checksums without exposing firmware binaries, device serials or private partitions."
contentType: "case-study"
status: "field-tested"
updated: "2026-11-18"
tags: ["artifacts", "checksums", "inventory"]
---

# A105F artifact and checksum manifest

> **Scope:** Publishable checksums without exposing firmware binaries, device serials or private partitions.  
> **Evidence:** field tested. See [Evidence policy](../../00-start-here/evidence-and-accuracy.md).

## Identity and inventory rules

Records below apply only to the original research device and specific outputs; a visitor **must not** use them as checksums for another build or hardware unit. No raw files are included.

| Artifact | Known facts |
|---|---|
| Stock Samsung AP | SHA-256 `CB33B4D8137B7FA5FC3649286FA04A93BA15CED67097E1B713B18FAD588A8AC4` |
| Magisk patched Samsung AP | `magisk_patched-31100_A9FvF.tar`; SHA-256 `95DE18B003C89B6C0984D9081B99C0D5DF6DB433025800C210708FC324B2571A` |
| Official TWRP | `twrp-3.7.0_11-0-a10.img`; 42,385,424 B; SHA-256 `2E460D24C016D684EAD753E28778E7F5265301D402BCCEB7A7AF6E7B1862A9CD` |
| Magisk patched TWRP | `magisk_patched-31100_VJwR8.img`; 42,534,928 B; SHA-256 `602F518DC613FD043FC9C365265CA51C505100B8732C5936DF6A139F94AC030A` |
| LineageOS 23.2 unofficial | `lineage-23.2-20260626-UNOFFICIAL-a10.zip`; SHA-256 `85BE4C6EF73E5A7F55EE3E8813B421203DC169B5B3D3D3F9D214338323D60FF7` |
| /e/OS 4.1.1 unofficial | `e-4.1.1-a14-20260731-UNOFFICIAL-a10.zip`; 1,371,982,796 B; SHA-256 `5B4727011E29F6034A61A28F65D4D130201FB9643246A5601D763DBA0DC4C15E` |

## Raw partition digests

Refer to [Verified backups](verified-backups.md). Device-unique EFS image bytes and checksums are intentionally excluded.

## Restoration material held privately

Original matching Odin BL/AP/CP/CSC/HOME_CSC; known-good patched AP; pre-TWRP Magisk recovery; recovery-only rollback Odin TAR; current partition images; read-only manifest. Retention details should be private.
