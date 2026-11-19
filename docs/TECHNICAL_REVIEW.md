# Technical and safety review — November 18, 2026

This review classifies the available evidence, corrects misleading assertions from exploratory dialogue and identifies issues that still require an independent reviewer. It is **not a formal third-party security audit** or code review of the community ROMs.

## Verified from first-hand research transcript

- Galaxy A10 SM-A105F had stock Samsung Android 11 `A105FDDS9CWD1`, bootloader binary 9, root via Magisk 31.1 in recovery, and TWRP 3.7.0_11-Samsung Galaxy A10 working together after image patching.
- Ordinary TWRP image previously triggered Samsung `Error validating footer` / VBMETA; stock matching firmware restored boot.
- The exact official TWRP image matched Team Win's SHA-256, and patched recovery passed host/device checksum checks.
- Raw BOOT, RECOVERY, VBMETA, SYSTEM, VENDOR, PRODUCT, DTB, DTBO and EFS-family backups were transferred and SHA-256 compared; the EFS hashes themselves are not published.
- TWRP's native data backup could not create a folder, while raw read-only partition streaming worked; precise cause of `Operation not permitted` remains unproven.
- Unofficial LineageOS 23.2 Android 16 booted and supported calling plus mobile data after reset.
- /e/OS 4.1.1 ZIP installer declared `a10,a10dd` and manipulated SYSTEM/VENDOR/BOOT/DTB/DTBO. LineageOS Recovery aborted signature verification; TWRP sideload later succeeded.
- /e/OS ran Android 14 with SELinux Enforcing; calling, data, Wi-Fi, Bluetooth, camera, GPS, speaker and microphone worked. `su` was unavailable; user chose to remain unrooted.

## Important limitations and corrections

| Topic | Safe interpretation |
|---|---|
| `ro.boot.verifiedbootstate=green` | Not proof of secure boot or locked bootloader on an unofficial ROM; prior bootloader unlock known |
| July 2026 patch string | Runtime claim, not independently verified all-CVE patch completeness |
| `dev-keys` | Development-signed build, not proof of malicious code |
| One successful ROM install | Does not establish compatibility for every A105F firmware/region/revision |
| CRC and local SHA-256 | Integrity of files checked; not proof of malware absence or maintainer authenticity |
| TWRP encrypted Data failure | Permission/mount/key problem suspected; exact root cause not confirmed |
| Successful sideload transfer | Not proof of successful recovery-side signature and install |
| A10 device assertion | Necessary format check, not guarantee of modem, camera or encryption support |
| Official LineageOS | As researched in the session, Galaxy A10 had no official device build; custom releases are unofficial |
| Root after /e/OS | `su` unavailable in current boot; doesn't prove absence of all privileged components in ROM |

## Safety-critical editorial actions completed

- Ensured generic documentation is marked **field-informed**, with device-specific outcomes marked **field-tested**.
- Fixed **52 corrupted backslash/control characters** in generated Windows `adb` examples.
- Added preflash decision gates, explicit backup and rollback warnings, supply-chain cautions and instructions never to relock modified devices.
- Scrubbed public source of unique phone serial, Windows account path, IMEI and EFS binary artifacts.
- Added automated checks that fail on broken local Markdown links, missing frontmatter, unwanted control characters or known device serial strings.

## External source spot-check (November 18, 2026)

The following references were reopened during preparation of the website source:

- [Official TWRP Galaxy A10](https://twrp.me/samsung/samsunggalaxya10.html) remains available and describes **A-only system-as-root, recovery-based Magisk** and the dangers of directly flashing TWRP on stock AVB firmware.
- [Official Magisk installation](https://topjohnwu.github.io/Magisk/install.html) documents using a recovery image when there is no boot ramdisk and checking **Recovery Mode** when patching.
- [/e/OS device selector](https://doc.e.foundation/devices/) clearly distinguishes official, community, unofficial and custom builds; the A10 ROM discussed here is third-party/unofficial.
- [/e/OS A10 developer thread](https://community.e.foundation/t/unofficial-builds-samsung-galaxy-a10-a20-a30-a40-a10-a10dd-a20-a20e-a30-a30s-a40-series-with-exynos-7885-chipset-for-e-os-a14-3-x/81378) lists **4.1.1 for a10/a10dd**, posted August 1, 2026.
- [crDroid 10 for a10](https://crdroid.net/a10/10) explicitly warns that the A10 build is outdated or no longer supported.
- [Eureka A10 LineageOS archive](https://sourceforge.net/projects/eurekaroms/files/Samsung/A10/T/arm/lineage/) contains the 2023 unofficial `lineage-20.0-20231123-UNOFFICIAL-a10dd.zip`.

A browseable LineageOS wiki page and Telegram release message could not be independently fetched in the web research tool. The repo does **not** claim every external URL or archived binary has been audited.

## Still needs external revalidation before public publication

- Check exact external links and project release status as of the publication date; URLs may have changed.
- Have a qualified second reviewer confirm bootloader/recovery key timing and Odin risks on this device.
- Verify no private identifiers in any new screenshots or uploaded logs.
- Run a live app build, accessibility scan and mobile browser QA.
- Decide a license and complete a public security disclosure contact mechanism.

## Risk assessment

ROM modding, root and PIT/partition operations can erase data and disable a device. The site intentionally avoids distributing firmware or binaries and does not provide one-click write scripts. For researchers, an offline backup and model-specific verification remain mandatory. The device case report is not an endorsement of unofficial build security or long-term maintenance.
