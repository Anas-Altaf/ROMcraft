---
title: "Research tooling: ADB, tcpdump, Frida and APK inspection"
description: "Practical capabilities, concrete A105F findings and failure boundaries."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["frida", "tcpdump", "adb"]
---

# Research tooling: ADB, tcpdump, Frida and APK inspection

> **Scope:** Practical capabilities, concrete A105F findings and failure boundaries.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Network capture

A105F stock rooted system had `/system/bin/tcpdump` available. A rooted capture to `/data/local/tmp/a10-test.pcap` acquired **50 packets**, reported **zero dropped**, and created an **11,235-byte** capture copied to PC. The user postponed Wireshark. Captures can contain tokens and private network details; never publish raw PCAP without sanitization.

Example authorized capture (not guaranteed on unrooted /e/OS):

```powershell
.\adb shell su -c "tcpdump -i any -s 0 -c 50 -w /data/local/tmp/test.pcap"
.\adb pull /data/local/tmp/test.pcap .
```

## Frida runtime instrumentation

Host Frida Python **17.26.3** and frida-tools **14.13.2** were installed. ARM32 `frida-server` ran as root and native `frida-ps -U` plus `frida-trace` `open` tracing worked. Java-layer instrumentation via `Java.perform()` failed with `Error: invalid instruction` on this old 32-bit Android 11 setup. Attempting server 16.7.19 with an older client yielded `cannot read properties of undefined (reading 'getRunningAppProcesses')`. Experiment was paused, not 'solved'.

## Static APK tools

JADX and APKTool were discussed but not actually installed/tested during this session. Treat future how-tos as unverified until run. This repository includes no APK disassemblies.

## Scope / safety

Instrument only apps and networks with explicit permission. Record ABI, Android version, SELinux, root state and exact tool versions; a modern Frida build may work for native APIs but fail for a specific Java bridge or ABI combination.
