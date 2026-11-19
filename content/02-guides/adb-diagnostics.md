---
title: "Android diagnostic command reference"
description: "A reference of read-only properties, logcat, telephony, storage and battery queries."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["adb", "diagnostics", "reference"]
---

# Android diagnostic command reference

> **Scope:** A reference of read-only properties, logcat, telephony, storage and battery queries.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Identity / boot state

```powershell
.\adb devices
.\adb shell getprop ro.product.device
.\adb shell getprop ro.build.version.release
.\adb shell getprop ro.build.version.security_patch
.\adb shell getprop ro.build.tags
.\adb shell getprop ro.boot.verifiedbootstate
.\adb shell getenforce
```

## Root

```powershell
.\adb shell su -c id
```

## Telephony

```powershell
.\adb shell getprop gsm.network.type
.\adb shell getprop gsm.operator.alpha
.\adb shell getprop gsm.sim.state
.\adb shell settings get global mobile_data
.\adb shell dumpsys isub
```

For multi-SIM Android, `mobile_data=0` is not a definitive indicator of every subscription's data state. Changing data through `svc data enable` may not update this global key; avoid concluding modem failure from one setting.

## Stability

```powershell
.\adb shell dumpsys battery
.\adb shell df -h /data
.\adb logcat -d -b crash -t 100
```

## Recovery

```powershell
.\adb shell getprop ro.twrp.version
.\adb pull /tmp/recovery.log .
ecovery.log
```

Use the exact commands on your target release; some may vary with Android API version, SELinux policy or recovery environment. Never publish unredacted dumpsys telephony, call logs or app account metadata.
