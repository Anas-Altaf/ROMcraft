---
title: "Verified Boot trust versus Android properties"
description: "Understand lock-state ambiguity on unofficial firmware."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["avb", "attestation", "bootloader"]
---

# Verified Boot trust versus Android properties

> **Scope:** Understand lock-state ambiguity on unofficial firmware.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Why `green` is not enough

On the final A105F /e/OS build:

```text
ro.boot.verifiedbootstate = green
ro.boot.flash.locked = (empty)
ro.boot.vbmeta.device_state = (empty)
ro.build.tags = dev-keys
```

Earlier stock-based experiments confirmed an unlocked bootloader and `orange` state. A custom ROM can expose inconsistent or inherited properties, so `green` was **not** accepted as evidence of genuine hardware-verified integrity.

## What would improve confidence

Vendor Download Mode confirmation, verifiable chain-of-trust documentation, signing keys under owner control, compatible firmware, and hardware-backed attestation where supported. On an older Samsung research phone, these may not be obtainable in a way comparable to modern supported Pixels.

## Do not relock

Relocking a Samsung bootloader while unofficial recovery/ROM images are installed can prevent boot and recovery. This project does not provide relocking instructions for this A10 installation.
