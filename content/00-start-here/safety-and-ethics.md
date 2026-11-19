---
title: "Safety, ethics, and privacy"
description: "Essential precautions for custom recovery, rooting, ROM installation and publishing research."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["safety", "privacy", "ethics"]
---

# Safety, ethics, and privacy

> **Scope:** Essential precautions for custom recovery, rooting, ROM installation and publishing research.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](evidence-and-accuracy.md).

## Non-negotiable rules

- Flash **only** packages meant for the exact device model, regional variant, current bootloader revision, and partition layout.
- Preserve known-good Odin firmware plus EFS-related partitions before experimentation. **Never share or copy EFS images between devices.** They can contain IMEI-related and radio calibration data.
- Do not relock a bootloader when unofficial firmware is installed.
- Preserve the OEM firmware rollback process; a recovery-only TAR cannot repair all partition problems.
- Treat developer signing keys, unofficial ROM binaries, recovery modules and rooted shells as full-device trust decisions.
- Prefer `dd if=... of=/safe/path` read-only backups; reversing `if` and `of` can destroy partitions.
- When uncertain, stop **before** `Format Data`, `Re-Partition`, `dd of=/dev/block/...`, or accepting untrusted signature warnings.

## Security trade-offs

Unlocked bootloader and custom ROMs expand the owner’s control but often weaken the chain of verified trust. Root access also expands the impact of compromised applications and scripts. A modern Android version and an impressive UI do not automatically imply recent firmware patches, working hardware security or regular updates.

## Personal privacy

This publishable repository excludes device serial numbers, IMEIs, absolute user home paths, corporate workspace names and EFS contents. Raw logs can contain phone numbers, access tokens, e-mail addresses, physical locations or network metadata; sanitize before committing. Keep sensitive backups encrypted and offline where possible.

## Ethical research

Use instrumentation and traffic capture only on devices, applications and networks you own or are authorized to test. Follow laws and third-party terms. Do not present security-bypass experiments as universally safe methods.
