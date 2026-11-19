---
title: "Trusting an unofficial ROM: complete supply-chain checklist"
description: "Threat modeling, reproducibility and limits of static ZIP inspection."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["security", "supply-chain", "trust"]
---

# Trusting an unofficial ROM: complete supply-chain checklist

> **Scope:** Threat modeling, reproducibility and limits of static ZIP inspection.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## What a malicious ROM can do

A ROM can install system-privileged apps, change trusted CAs, alter kernel/SELinux policies, read app secrets, modify radio-facing services or introduce persistent remote access. Its authority exceeds that of an ordinary sideloaded APK.

## Evidence levels (weak → strong)

1. Booted successfully on same model.
2. ZIP CRC test passes.
3. Published SHA-256 matches a verified developer publication.
4. Maintainer identity, source history and independent community testing established.
5. Exact device/kernel/vendor sources documented and inspected.
6. Independent build matches signed artifacts **reproducibly**.
7. Long-term signed update channel with incident response exists.

No single item guarantees absence of malware. A clean updater-script does not rule out malicious system binaries or patched framework/priv-app contents.

## Audit areas

- `META-INF` scripts, `run_program` and shell sidecars.
- `system` privileged APK list, certificates, system properties and permissions.
- Kernel changes, KernelSU/su services, debug settings, SELinux defaults.
- Vendor HAL blobs, preinstalled remote control, unexpected network endpoints.
- Update URLs and signing keys; version rollback protections.

## Trust decisions in the case

The LineageOS 23.2 and /e/OS A10 builds were **unofficial**. They were downloaded and used after script and device checks; no reproducible-build attestation was obtained. State this clearly to readers and avoid marketing them as secure substitutes for officially supported devices.
