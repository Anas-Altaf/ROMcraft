---
title: "How TWRP 3.7 and Magisk coexisted on the A105F"
description: "Detailed, validated Magisk-patched TWRP approach with checksums and Odin package structure."
contentType: "case-study"
status: "field-tested"
updated: "2026-11-18"
tags: ["twrp", "magisk", "odin"]
---

# How TWRP 3.7 and Magisk coexisted on the A105F

> **Scope:** Detailed, validated Magisk-patched TWRP approach with checksums and Odin package structure.  
> **Evidence:** field tested. See [Evidence policy](../../00-start-here/evidence-and-accuracy.md).

## Verified original recovery image

`twrp-3.7.0_11-0-a10.img`, **42,385,424 bytes**; official SHA-256:

`2E460D24C016D684EAD753E28778E7F5265301D402BCCEB7A7AF6E7B1862A9CD`

The `dl.twrp.me` `.sha256` file matched exactly.

## Phone transfer and patch

`adb push` to `/sdcard/Download` gave `failed to read copy response: EOF` despite a 'pushed' line. Subsequent `ls` found no file. Transferring to `/data/local/tmp/twrp-a10.img` succeeded, and `sha256sum` matched; then an on-device copy to Downloads allowed Magisk to select it.

Magisk 31.1 patched raw recovery image (Recovery Mode). Log confirmed image repack and output file `magisk_patched-31100_VJwR8.img`. The log also contained non-fatal intermediate patch warnings, so success was assessed using final status and artifact verification, **not** every patch substep.

Patched image: **42,534,928 bytes**, SHA-256 `602F518DC613FD043FC9C365265CA51C505100B8732C5936DF6A139F94AC030A`.

## Odin TAR preparation

A single file named `recovery.img` inside a ustar archive was used; separate TAR created for restoring original Magisk recovery. Extraction round-trips proved the TAR payloads matched the respective source images. Recovery partition measured **55,574,528 bytes**, so patched image fit (about 13 MB spare).

Odin: AP recovery-only TAR, Auto Reboot disabled, no repartition. After `PASS`, entered recovery directly. `adb devices` reported `recovery`; `ro.twrp.version` reported `3.7.0_11-Samsung Galaxy A10`; `ro.product.device` reported `a10`.

## Three boot outcomes verified

| Boot path | Result |
|---|---|
| Normal power-on | Samsung Android 11, no `su` |
| Magisk recovery-root boot-key path | Samsung Android 11, `su -c id` returned root |
| Hold recovery combination | TWRP 3.7.0 and recovery ADB |

**Important:** These were observed on the stock-based rooted system. Later LineageOS installation overwrote recovery and removed this coexistence configuration.
