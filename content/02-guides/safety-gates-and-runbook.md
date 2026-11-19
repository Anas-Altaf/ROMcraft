---
title: "Preflash safety gates and recovery-first runbook"
description: "A reusable decision checklist to stop unsafe flashing before a device becomes unbootable."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["safety", "recovery", "checklist", "rollback", "rom"]
---

# Preflash safety gates and recovery-first runbook

> **Never apply commands across models without revalidating the partition map.** This document synthesizes actual Galaxy A10 incidents and recommended defenses; it is not a manufacturer's service procedure.

## Gate A — Device identity

Check the exact printed model, device codename, bootloader binary, regional firmware and platform. Verify that ADB is authorized and recovery is reachable. For Samsung phones, do not assume standard `fastboot flash` support just because it is documented for Pixels.

```powershell
.\adb devices
.\adb shell getprop ro.product.device
.\adb shell getprop ro.build.version.release
.\adb shell getprop ro.build.fingerprint
```

If Android is not booted, gather identity from recovery and Download Mode. **Stop** if release notes target a different model or require firmware you do not have.

## Gate B — Source authenticity and integrity

1. Prefer official manufacturer, recovery-project or ROM-project downloads.
2. Identify whether the **device** is officially supported, not just whether the umbrella project is active.
3. Compare SHA-256 against a maintainer-published checksum over a trusted channel; keep your own local fingerprint as a secondary check.
4. Inspect the ZIP for suspicious install scripts, unexpected privileged APKs and writes to radio, bootloader, PIT or userdata partitions.
5. A valid signature from an unfamiliar key is evidence of signer consistency, not necessarily signer trust; a ZIP CRC is not a security audit.

## Gate C — Matching recovery and writable destinations

- Confirm recovery is explicitly compatible with the firmware/kernel and encryption scheme.
- A-only / recovery-rooted devices may place Magisk and TWRP in the same recovery partition. Boot-key behavior changes by installation mode.
- Before any flash, find the intended block device and **read** its partition size and content hash.
- Do not turn off AVB, SELinux or encryption simply because a forum recommends it. Treat each security downgrade as a separate decision.

## Gate D — Rollback assets

Create checksummed offline copies of the full stock firmware, boot-critical partition images, recovery images and any unique EFS-family partitions. Confirm that your PC can access Download/Recovery Mode and that you understand the matching Odin or vendor recovery route. A system-partition backup alone cannot restore EFS, bootloader, or private app data. Do not confuse `.tar` packaging with a complete restore plan.

## Gate E — Irreversible operations

The following require explicit awareness and a verified rollback plan:

| Operation | Primary risk | Stop condition |
|---|---|---|
| Factory reset / format data | Erases local data and encryption keys | No verified backup or unclear migration instructions |
| Flash BOOT / RECOVERY | Bootloop or loss of root/recovery | No tested recovery boot path |
| Replace SYSTEM / VENDOR | Hardware incompatibility and app loss | Unmatched firmware requirements |
| Write VBMETA / DTB / DTBO | Boot-chain validation errors | No exact image and rollback |
| Repartition / PIT change | Severe device-storage risk | Any unvalidated PIT or user-supplied partition layout |
| Restore EFS | Cellular identity/calibration damage | Not the original same device or no justified need |
| Relock bootloader | Hard failure with modified boot chain | Any unofficial image present |

## Gate F — Install, observe, verify

Follow the ROM's **own** installer instructions. Do not guess an install command solely from the presence of `updater-script`; recovery can still reject it. Read **on-screen recovery success** in addition to the host-side ADB result. If sideload fails at signature verification, do not automatically bypass trust checks or assume the ZIP was installed.

After boot, confirm Android release, codename, SELinux, calling/data, Wi-Fi, Bluetooth, camera, GPS and root state. Record exactly which tests passed. Do not claim verified boot from a `green` property on an unlocked unofficial ROM.

## Gate G — Failure response

1. **Stop writing partitions.** Preserve current error screen and logs.
2. Check whether Download/Recovery Mode is available without changing other settings.
3. Identify the last partition changed and its exact source hash.
4. Restore through the matching, documented stock firmware path as necessary; warn that user data may be lost.
5. File an incident note, including what did *not* work. Avoid repeated guessing with `vbmeta`, PIT or encryption flags.

See [Rollback and unbrick](rollback-and-unbrick.md), [TWRP backup pitfalls](../30-troubleshooting/twrp-storage-and-encryption.md), and the [Galaxy A10 end-to-end report](../10-devices/samsung-galaxy-a10-sm-a105f/end-to-end-runbook.md).
