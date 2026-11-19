---
title: "SELinux, kernel configuration, debug surfaces and root"
description: "Assess real controls and limitations on a rooted or custom-ROM device."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["selinux", "kernel", "root"]
---

# SELinux, kernel configuration, debug surfaces and root

> **Scope:** Assess real controls and limitations on a rooted or custom-ROM device.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## SELinux mode is one dimension

`getenforce=Enforcing` is a useful result: policy violations are enforced. A permissive boot parameter in a recovery image and runtime enforcing Android system may coexist because they are different boot paths; interpret logs per boot.

## Stock A105F kernel config excerpts

`IKCONFIG`, `KALLSYMS`, `SECCOMP`, `SECCOMP_FILTER`, `RANDOMIZE_BASE`, `DEBUG_FS`, `HARDENED_USERCOPY`, `SECURITY_SELINUX` and `SELINUX_DEVELOP` were present. `dmesg_restrict=0`, `kptr_restrict=4`, user ASLR=2. Various `CONFIG_CC_STACKPROTECTOR*` names were found, but not enough to conclude effective per-function protector instrumentation without analyzing assignment values and compiler behavior.

## Threat modeling rooted ROMs

Root expands owner control and attack impact. KernelSU and Magisk have different boot/management models. A ROM containing a root framework is a privileged dependency even if no root manager is configured.

## General hardening priorities

- Keep SELinux enforcing.
- Don't enable remote ADB/network debug on untrusted interfaces.
- Minimize privileged apps and modules.
- Verify update cadence and kernel/vendor patch provenance.
- Preserve logs and rollback evidence.
- Use a supported device for critical secrets and sensitive banking if possible.
