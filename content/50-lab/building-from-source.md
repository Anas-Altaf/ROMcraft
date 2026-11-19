---
title: "Building AOSP/LineageOS: feasibility and limitations"
description: "Why official upstream code cannot make an unsupported A10 build official."
contentType: "guide"
status: "planned"
updated: "2026-11-18"
tags: ["build", "linux", "lineageos"]
---

# Building AOSP/LineageOS: feasibility and limitations

> **Scope:** Why official upstream code cannot make an unsupported A10 build official.  
> **Evidence:** planned. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## When building helps

A self-built ROM lets researchers inspect modifications and reproducibly track source revisions. It does **not** automatically become an official project release, nor does it remove proprietary vendor firmware, unreviewed device trees or binary blobs.

## Actual host research

Windows host: ~32 GB RAM, 12 logical processors, >600 GB free C: drive. WSL2 worked; Ubuntu Resolute (26.04) installed, x86_64, ~15 GiB exposed RAM, 4 GiB swap, ~953 GiB free Linux volume. Dependencies command aborted because `liblz4-tool` lacked a candidate. As a result `java` and `repo` were absent. Suggested replacement was package `lz4`, and increasing WSL memory; **the correction was not verified as completed**.

## Correct high-level workflow

1. Choose Android/LineageOS branch and supported host Java/toolchain versions **from that branch's current docs**.
2. Audit compatible A10/a10dd device tree, kernel, vendor extraction recipes and ROM-specific patches.
3. Use Linux filesystem, not a Windows/OneDrive-mounted directory, for Android sources and build outputs.
4. Initialize `repo` manifest, sync revisions, extract blobs legally, compile with limited parallelism and run tests.
5. Record dependencies and checksums; compare reproducible binary results if possible.

## Status

**Not built.** User chose to install existing unofficial ROMs rather than continue a resource-intensive source build. No successful build, signed artifact, source branch or working device tree was established.

## References

- [LineageOS wiki](https://wiki.lineageos.org/)
- [Official LineageOS source](https://github.com/LineageOS/android)
- [/e/OS build documentation](https://doc.e.foundation/support-topics/build-e/)
