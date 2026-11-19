---
title: "Alternate Android distributions and non-Android experiments"
description: "Where official support, custom ROMs, GSIs and Linux experiments fit."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["gsi", "linux", "android"]
---

# Alternate Android distributions and non-Android experiments

> **Scope:** Where official support, custom ROMs, GSIs and Linux experiments fit.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Categories

1. **Official supported ROM:** project builds, tests and signs a particular device model.
2. **Community build:** external maintainer adapts AOSP/LineageOS to a device.
3. **GSI:** generic system layer; may boot but needs compatible vendor and HALs, and telephony can fail.
4. **Full Linux port:** replaces Android userspace more extensively; graphics, modem, power and camera often depend on unavailable drivers.

## Galaxy A10 reality

Official LineageOS A10 availability was not established; unofficial LineageOS and /e/OS were actually tested. A generic or full Linux installation was **not** attempted; do not market it as fully functional on this device.

## Choosing for maximum control

Rooted AOSP custom ROM improves userspace control but not necessarily proprietary modem, TEE, boot ROM, radio firmware or every kernel driver. Separate freedom/control goals from boot chain and sensitive-app security. For daily sensitive use, a supported current phone may be preferable to a much newer unofficial Android build on outdated low-level firmware.
