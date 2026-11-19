---
title: "Publishing Android research without leaking sensitive data"
description: "Redaction, backup encryption and provenance-safe publishing."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["privacy", "redaction", "security"]
---

# Publishing Android research without leaking sensitive data

> **Scope:** Redaction, backup encryption and provenance-safe publishing.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Common secrets in raw artifacts

- EFS/SEC_EFS/CPEFS: radio identity and device-specific calibration data.
- `dumpsys`/logcat: call records, network details, app package history, notifications and user identifiers.
- Firmware/workspace paths: Windows usernames, cloud tenant names and organization metadata.
- Camera screenshots: phone numbers, photos, location, account names.
- Root logs: privileged command arguments or tokens.

## Public repository policy

Never commit raw EFS images, `userdata.img`, full recovery logs without scrub, downloaded proprietary firmware, APKs containing personal licenses, or files revealing serials/IMEIs. `.gitignore` should cover `*.img`, `*.tar`, `*.md5`, `*.zip`, `*.ab`, `*.pcap`, `*.log`, `*.keystore` and `.env*` by default, with documented exceptions for sanitized example fixtures.

## Private archive

Keep hashes, encrypted offsite copy and a trustworthy inventory. Hashes of **device-specific** raw images may act as fingerprints; their publication is optional. Private EFS SHA values are intentionally omitted from this public bundle.

## Consent and ethics

Only capture your own traffic or authorized targets, avoid distributing secrets or third-party copyrighted firmware and clearly identify external credits.
