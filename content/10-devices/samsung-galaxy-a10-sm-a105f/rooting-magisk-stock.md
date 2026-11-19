---
title: "A105F Magisk 31.1 on stock Samsung Android 11"
description: "Exact root model, verified AP patch outcomes and boot-key behavior."
contentType: "case-study"
status: "field-tested"
updated: "2026-11-18"
tags: ["magisk", "root", "a105f"]
---

# A105F Magisk 31.1 on stock Samsung Android 11

> **Scope:** Exact root model, verified AP patch outcomes and boot-key behavior.  
> **Evidence:** field tested. See [Evidence policy](../../00-start-here/evidence-and-accuracy.md).

## Why the recovery path matters

Magisk reported `Ramdisk: No`; the device uses recovery-based injection. The first boot after patch was not equivalent to normal root on a `boot.img`-patched A/B phone. On the A105F, normal boot produced no `su`; proper recovery-root boot produced:

```text
uid=0(root) gid=0(root) groups=0(root) context=u:r:magisk:s0
```

## Patch steps that worked

1. Preserve exact Samsung `AP` TAR and source checksum.
2. Transfer the entire AP to phone; compare device and PC SHA-256.
3. In Magisk 31.1 enable Recovery Mode, patch AP.
4. Pull and checksum patched AP; inspect archive for `recovery.img`, `boot.img`, `vbmeta.img` and appropriate partitions.
5. Flash in Odin with matching BL/CP/CSC per model-specific guides.
6. Resolve any startup failures using documented recovery methods; in this test a factory reset was required.
7. Validate root in the intended boot mode and log SELinux/boot state.

## Known hashes (this session only)

- Verified original AP: `CB33B4D8137B7FA5FC3649286FA04A93BA15CED67097E1B713B18FAD588A8AC4`.
- Working patched AP `magisk_patched-31100_A9FvF.tar`: `95DE18B003C89B6C0984D9081B99C0D5DF6DB433025800C210708FC324B2571A`.

These are inventory evidence, not general-purpose downloads or checksums for other devices.

## No claim of permanent present root

The final /e/OS 4.1.1 system no longer uses this Magisk installation. Re-flashing old Samsung patched recovery into Android 14 is not recommended.
