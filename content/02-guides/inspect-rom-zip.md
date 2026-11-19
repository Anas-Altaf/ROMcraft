---
title: "Audit a ROM ZIP before flashing"
description: "Static inspection of package metadata, scripts, images, hash and developer trust."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["zip", "audit", "supply-chain"]
---

# Audit a ROM ZIP before flashing

> **Scope:** Static inspection of package metadata, scripts, images, hash and developer trust.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Windows commands

```powershell
python -c "import zipfile; p='ROM.zip'; z=zipfile.ZipFile(p); print('PASS' if z.testzip() is None else 'FAIL')"
(Get-FileHash '.\ROM.zip' -Algorithm SHA256).Hash
tar.exe -tf '.\ROM.zip' | Select-Object -First 40
tar.exe -xOf '.\ROM.zip' 'META-INF/com/android/metadata'
tar.exe -xOf '.\ROM.zip' 'META-INF/com/google/android/updater-script'
```

## Audit the updater-script

- Device assertions (`ro.product.device`, alternate names).
- `block_image_update` destinations; ensure each symlink resolves on target device.
- Boot, recovery, DTB/DTBO writes.
- `run_program` shell scripts; inspect every extracted script, including files under `install`.
- `delete_recursive`, `format`, unguarded `dd`, `mount -o rw` and reboot behavior.

## Root and privileged code

Inspect included `su`, KernelSU, preinstalled APKs, priv-app grants, unknown services, kernels, ADB defaults and SELinux property settings. A script with no suspicious lines cannot guarantee safety; malicious code can be inside system images or binaries.

## A105F /e/OS examples

The /e/OS 4.1.1 A10 package used `a10,a10dd` assertions, system/vendor block updates, BOOT, Eureka DTB/DTBO, and a custom `eureka_install.sh` removing `/vendor/recovery-from-boot*`. No direct recovery.img write appeared in that script. That established intended operations, **not** source-binary equivalence or trust.

## Authenticity and provenance

Use publisher's official archive, immutable release link, published digest/signatures where available, public device/kernel source and independently tested reports. Maintain an artifact manifest containing URL, acquisition date, hashes, title, maintainer, confidence label and known constraints.
