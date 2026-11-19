---
title: "Galaxy A10 SM-A105F: complete 2026 field runbook"
description: "Reconstructed, evidence-labeled journey from Samsung stock Android through Magisk, TWRP, LineageOS and /e/OS."
contentType: "case-study"
status: "field-tested"
updated: "2026-11-18"
tags: ["a10", "odin", "magisk", "twrp", "lineageos", "eos", "rollback"]
---

# Galaxy A10 SM-A105F: complete 2026 field runbook

> **This is a historical field report, not a universal flash script.** Do not apply it to another model, bootloader binary, firmware, or ROM release without checking vendor prerequisites. Several actions below are destructive. See [Safety and ethics](../../00-start-here/safety-and-ethics.md) and the [preflight decision gates](../../02-guides/safety-gates-and-runbook.md).

## 1. Baseline and target

| Attribute | Observed on research device |
|---|---|
| Hardware | Samsung Galaxy A10 **SM-A105F**, Exynos 7884B |
| Codename used by recovery | `a10`; ROM compatibility metadata also mentioned `a10dd` |
| Stock software | Samsung Android 11, build `A105FDDS9CWD1`, CSC PAK, bootloader binary 9 |
| Architecture | 32-bit Android userspace (`armeabi-v7a`), ARMv8 CPU; kernel 4.4.177 |
| Android storage | Approximately 24 GiB `/data`, with 21 GiB available after clean setup |
| Boot and recovery | A-only/system-as-root family; Magisk originally installed using recovery mode |
| Final research result | /e/OS 4.1.1 unofficial Android 14; major hardware functions working; no root |

The bootloader was unlocked at the start of this experiment. We did **not** relock it. Samsung firmware files and all essential raw partitions were backed up on Windows before cross-ROM migration.

## 2. Establish a reliable rollback path **before** experimentation

Retain the exact matching Samsung `BL`, `AP`, `CP` and CSC firmware archive, plus a documented Odin version and USB connection procedure. Do not mix partition images from different bootloader binaries. Preserve offline copies of everything needed if Android no longer starts.

The session first flashed an ordinary TWRP image as Odin AP and received `Error validating footer / CUSTOM RECOVERY / VBMETA` in Download Mode. The matching stock firmware (`BL`, `AP`, `CP`, `HOME_CSC`) restored Android, showing why checksum correctness alone does not establish bootloader compatibility. A later Magisk install required a recovery factory reset to resolve a boot loop.

**Recovery rule:** if Odin reports `FAIL`, if a device asks for an unexpected PIT/repartition, or if the model/binary differs, stop. Do not flash guessed `vbmeta` disablers or someone else's EFS.

## 3. Root Samsung Android 11 with recovery-based Magisk

Magisk reported **Ramdisk: No**. A source Samsung AP archive was initially transferred incompletely before patching, leading to an invalid patched AP. Re-transferring and verifying its full SHA-256 eliminated the problem. The corrected Magisk 31.1 patched archive contained recovery, boot, vbmeta and Samsung system/vendor assets, and was flashed with matching stock BL/CP/CSC components in Odin.

After a required factory reset, the device booted. Normal power-on started Android without `su`. The recovery-key Magisk boot path produced:

```text
uid=0(root) gid=0(root) groups=0(root) context=u:r:magisk:s0
```

This behavior is **specific to this firmware and installation mode**. A modern device with a boot ramdisk or A/B slots requires a different workflow. [Official Magisk installation reference](https://topjohnwu.github.io/Magisk/install.html).

## 4. Make TWRP coexist with Magisk

The [official Team Win A10 page](https://twrp.me/samsung/samsunggalaxya10.html) documents the recovery-related installation caveat. We fetched `twrp-3.7.0_11-0-a10.img`, size **42,385,424 bytes**, and matched its Team Win SHA-256:

```text
2e460d24c016d684ead753e28778e7f5265301d402bcceb7a7af6e7b1862a9cd
```

An initial ADB push into `/sdcard/Download` falsely appeared to transfer all bytes but ended in `EOF` and no file existed. Pushing to `/data/local/tmp/` worked; an on-device SHA-256 verified the exact copy. We then copied the image to Downloads from within Android and used Magisk 31.1 **Recovery Mode → Patch firmware/image**.

The resulting Magisk-patched TWRP image was **42,534,928 bytes**, SHA-256:

```text
602f518dc613fd043fc9c365265ca51c505100b8732c5936df6a139f94ac030a
```

The patched image fit in the 55,574,528-byte recovery partition. We placed it inside a USTAR archive as exactly `recovery.img`, and prepared a second TAR containing the previously backed-up recovery image as a rollback option.

Odin AP flash with **Auto Reboot disabled**, followed by the correct hardware-key transition into recovery, opened TWRP. It reported `3.7.0_11-Samsung Galaxy A10` and `ro.product.device=a10`. After selecting **Keep Read Only**, Samsung Android 11 still booted and the recovery-key root path still returned `uid=0(root)`. **Neither success guarantees the same result on another firmware.**

## 5. Preserve partitions without relying on TWRP Data backup

In TWRP, its Backup function enumerated `/data`, `/boot`, `/product`, `/system_image` and `/vendor_image`, with more than 20 GiB free, but failed at **Failed to make backup folder**. Even recovery root couldn't make `/data/media/0/TWRP`, returning `Operation not permitted`. Encryption/mount issues were suspected but never proven. A TWRP `adb backup --twrp boot` test produced a **zero-byte** `.ab` file, which is unusable.

We switched to read-only streaming. Under **Windows PowerShell 5.1**, the `cmd.exe` wrapper preserved raw binary bytes when redirecting stdout:

```powershell
cmd.exe /d /c '.\adb.exe exec-out "dd if=/dev/block/by-name/system bs=4096 2>/dev/null" > A10_SYSTEM.img'
```

The same pattern backed up BOOT, RECOVERY, VBMETA, SYSTEM, VENDOR, PRODUCT, DTB, DTBO, EFS, SEC_EFS and CPEFS. Every file was checked against **the exact phone partition size and SHA-256**. One SYSTEM transfer disconnected and produced only ~202 MiB. Repeating it yielded the full **3,556,769,792-byte** partition with matching hash. **File size and hash are both required**—a `dd` command that exits is not sufficient proof.

These raw images are **not ready-made Odin packages** and they do not substitute for personal app data backups. EFS-family images contain unique radio identity and should be encrypted, kept private, and restored only to the same device when a qualified recovery procedure justifies it.

## 6. Install unofficial LineageOS 23.2 (Android 16)

The local `lineage-23.2-20260626-UNOFFICIAL-a10.zip` had a matching device assertion (`a10`, `a10dd`) and correct ZIP CRC, and its updater-script wrote SYSTEM, VENDOR, BOOT, DTB, DTBO and RECOVERY. The exact release reported an **included KernelSU-Next**, so we did not install a separate Magisk package. **The community ZIP was not independently audited or proven trustworthy.**

After a clean install through TWRP ADB sideload, recovery reported **Successful**. Android 16 completed onboarding, dual Zong SIM calls worked, and cellular data subsequently worked after a settings reset. The installer **replaced TWRP with LineageOS Recovery**.

See the [LineageOS installation account](lineageos-23-install.md) for the observed metadata and failure boundaries.

## 7. Migrate to unofficial /e/OS 4.1.1 (Android 14)

The /e/OS ZIP for `a10` contained the classic recovery `update-binary`/`updater-script`, a boot image, SYSTEM/VENDOR block updates and Eureka DTB/DTBO assets. Inspection confirmed that it accepted `a10,a10dd`, with the main updater script **not directly flashing recovery**. The associated `eureka_install.sh` mounted vendor, removed matching `recovery-from-boot*` files and unmounted vendor.

The first sideload attempt through LineageOS Recovery transferred fully (`Total xfer: 1.00x`) but **aborted on signature verification**; it was not installed. The previously verified patched-TWRP Odin TAR restored TWRP, and a second sideload reported **Successful**. The device booted, completed /e/OS onboarding and passed Android runtime checks.

Observed runtime values:

```text
ro.build.version.release=14
ro.product.device=a10
ro.lineage.version=4.1.1-a14-20260731-UNOFFICIAL-a10
ro.modversion=4.1.1-a14-20260731-UNOFFICIAL-a10
ro.build.version.security_patch=2026-07-01
getenforce=Enforcing
ro.build.tags=dev-keys
```

Both SIM calls and mobile data, Wi-Fi, Bluetooth, camera, GPS/location, speaker and microphone were manually tested successfully. `su -c id` returned `su: inaccessible or not found`, consistent with an **unrooted** final installation.

The ROM returned `ro.boot.verifiedbootstate=green`, yet the bootloader had been unlocked and lock-state properties were absent. **Do not interpret `green` here as evidence of trustworthy verified boot, and never relock the bootloader with this unofficial ROM.**

## 8. Common misreadings prevented by the session

- **ADB progress ≠ successful recovery install.** A completed sideload transfer may still fail signature checks.
- **`field-tested` ≠ guaranteed compatibility.** Firmware region, binary, partition layout and exact release still matter.
- **`SELinux Enforcing` ≠ ROM integrity proof.** It does not certify the shipped kernel, update server or privileged applications.
- **SHA-256 over two copies ≠ malware scan.** It confirms equality only; publisher signatures and source review are separate.
- **`mobile_data=0` ≠ definitive modem failure.** This global setting was misleading on the multi-SIM Android 16 configuration; data worked after reset.
- **No personal data stored ≠ no device data.** Factory resets and system changes still destroy local app state and may affect encryption.

## 9. Reproduction and recovery decision

This case establishes that **one** bootloader-unlocked SM-A105F with firmware `A105FDDS9CWD1` progressed through these stages. It does not grant a safe download or flash recommendation for future unverified builds. Prioritize authenticity and maintainer verification, use model/binary-matched firmware for rollback, and document the exact outcome of every attempt. The current final device state is captured in [Final operational state](final-state.md).
