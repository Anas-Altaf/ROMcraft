---
title: "Migrating from LineageOS Recovery to /e/OS 4.1.1"
description: "Exact installer audit, signature rejection, TWRP recovery and final installation."
contentType: "case-study"
status: "field-tested"
updated: "2026-11-18"
tags: ["eos", "android14", "installation"]
---

# Migrating from LineageOS Recovery to /e/OS 4.1.1

> **Scope:** Exact installer audit, signature rejection, TWRP recovery and final installation.  
> **Evidence:** field tested. See [Evidence policy](../../00-start-here/evidence-and-accuracy.md).

## Package

`e-4.1.1-a14-20260731-UNOFFICIAL-a10.zip` — **1,371,982,796 bytes**, host SHA-256:

`5B4727011E29F6034A61A28F65D4D130201FB9643246A5601D763DBA0DC4C15E`

ZIP CRC integrity: **PASS**. Package metadata: `ota-type=BLOCK`, `post-sdk-level=34` (Android 14), declared `post-security-patch-level=2026-07-01`, `pre-device=a10,a10dd`, Samsung A105N-target fingerprint.

## Script audit

Updater script accepted `a10` or `a10dd`; wrote SYSTEM and VENDOR with block updates and BOOT, Eureka DTB and Eureka DTBO with `package_extract_file`. It extracted and invoked `eureka_install.sh`, which:

```sh
mount /vendor
mount -o rw,remount /vendor
rm -rf /vendor/recovery-from-boot*
umount /vendor
rm -f /tmp/eureka_install.sh
exit 0
```

The script contained no direct `recovery.img` write. The archive **did** contain `recovery.img`, but presence alone does not mean it was flashed. The script inspection ruled out some classes of destructive operation; it did **not** prove source provenance or ROM innocence.

## Recovery mismatch and solution

First attempted `adb sideload` via the installed **LineageOS Recovery**. Host reported `Total xfer: 1.00x`, but recovery displayed **signature verification failed** and **aborted**, with no bypass prompt. Therefore this was **not installed**. The previously prepared Magisk-patched TWRP Odin TAR was flashed again; TWRP booted successfully. With TWRP sideload, the same ZIP reported **Successful** (host ~46% transfer display). The device rebooted and completed /e/OS onboarding.

## First-boot validation

```text
ro.build.version.release = 14
ro.product.device = a10
getenforce = Enforcing
ro.lineage.version = 4.1.1-a14-20260731-UNOFFICIAL-a10
ro.modversion = 4.1.1-a14-20260731-UNOFFICIAL-a10
ro.build.version.security_patch = 2026-07-01
ro.build.tags = dev-keys
```

Functions tested working: SIM calls, cellular data, Wi-Fi, Bluetooth, camera, GPS/location, speaker and microphone. Current root check returned `su: inaccessible or not found`; user elected to remain unrooted. See [Final state](final-state.md).
