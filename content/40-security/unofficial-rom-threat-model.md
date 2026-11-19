---
title: "Unofficial ROM trust model: what a ZIP audit can and cannot prove"
description: "Security boundaries for community ROMs, provenance, hidden privilege, OTA channels and reproducibility."
contentType: "security"
status: "field-informed"
updated: "2026-11-18"
tags: ["rom", "supply-chain", "verification", "root", "privacy"]
---

# Unofficial ROM trust model: what a ZIP audit can and cannot prove

> **Audience:** researchers choosing whether to flash third-party ROM binaries. Device recovery access, separate offline backups and a willingness to lose data are assumed.

## Threat actors and trust boundaries

A custom ROM can replace the Android system, vendor services, kernel, recovery and privileged applications. It is thus not comparable to installing an ordinary app with sandbox restrictions. Plausible threats include a compromised download server, malicious maintainer, substituted ZIP, nonmatching published source, pre-installed privileged spyware, weakened SELinux rules, unauthorized root services and untrusted OTA channels.

The standard project name (LineageOS, /e/OS, etc.) **does not grant official device support**. A build compiled by a third party is that third party's binary. The upstream project does not automatically review, sign or maintain it.

## Trust evidence layers

| Evidence layer | What it establishes | What it cannot establish |
|---|---|---|
| ZIP opens and CRC passes | No detected internal archive corruption | Malware absence or origin |
| Local SHA-256 matches transfer | Bit-identical copy of downloaded file | That the original file is good |
| Hash from authenticated maintainer channel | Integrity relative to expected release | Maintainer honesty |
| Cryptographic release signature | Release signed by a particular key | Key-owner trust or code safety |
| Public device/kernel/vendor source | Some code is available for review | Binary is exactly built from that source |
| Reproducible signed builds | Independent rebuild yields equivalent artifact | No vulnerabilities in inputs or toolchain |
| SELinux Enforcing runtime | Kernel reports enforcing state | No permissive domains or malicious policy |
| Standard-looking UI | Cosmetic familiarity | Privileged components are safe |

## Practical examination

1. **Identify owner:** read the release announcement, account history, source repositories and issue tracker, rather than accepting a forwarded mirror link.
2. **Read the updater:** inspect `META-INF/com/google/android/updater-script` or Android payload operations. List every partition touched; unexpected EFS, radio, bootloader, PIT or modem writes are a stop sign.
3. **Inspect privileged packages:** look for `priv-app`, root binaries, unexpected network services or suspicious permissions. Some legitimate utilities also need privilege; context matters.
4. **Verify kernel and SELinux configuration:** check enforcing state and build details only *after* safe boot. Prefer a configuration that does not intentionally disable security controls.
5. **Assess the update story:** identify who signs each update, whether OTA servers are controlled by the project or a maintainer, whether patches are current, and how updates are announced.
6. **Triangulate experience:** seek independent reports from users of the **same model and firmware family**. One successful boot does not verify calling, data, encryption, battery, GPS or long-term maintenance.

## Case study findings

The Galaxy A10 2026 LineageOS 23.2 ZIP and /e/OS 4.1.1 ZIP were inspected for device assertions and updater actions. They installed successfully in this session; the /e/OS build reported SELinux Enforcing and passed core hardware tests. **Those findings do not establish that either unofficial binary was free of malicious changes**. The /e/OS package reported `dev-keys` and a July 2026 patch level; runtime metadata is self-reported.

## Recommended decisions

Use a trusted official build on a supported phone for high-stakes personal use. On unsupported devices, a locally reviewed community build can be an acceptable disposable research environment with controlled accounts, network monitoring, no sensitive credentials and an offline recovery plan. Self-compiling upstream sources increases oversight but still relies on device trees, proprietary blobs and build dependencies.

Do not publish private EFS images, IMEIs, phone serials or personal log captures while documenting the research. See [Privacy](privacy-and-data-retention.md) and [Evidence standards](../00-start-here/evidence-and-accuracy.md).
