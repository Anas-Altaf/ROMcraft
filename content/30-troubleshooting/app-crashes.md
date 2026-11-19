---
title: "Read logcat crash reports without overdiagnosing"
description: "How to attribute crashes to specific Android packages."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["logcat", "apps", "debugging"]
---

# Read logcat crash reports without overdiagnosing

> **Scope:** How to attribute crashes to specific Android packages.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Basic command

```powershell
.\adb logcat -d -b crash -t 100
```

## Actual A105F example

On /e/OS 4.1.1, process `foundation.e.apps` crashed with `NullPointerException: null cannot be cast to non-null type androidx.navigation.fragment.NavHostFragment`, pointing into App Lounge `MainActivity.rootNavController`. This supports an application-level navigation initialization error; it does not establish a kernel issue, malicious modification, or recurring system instability.

## Method

Identify timestamp, process/package, exception class, stack entry point, reproducibility, last UI action and version. Test clearing cache **only if it recurs**, and avoid clearing data until app state is backed up if important. Capture logs while avoiding accidental leakage of accounts and tokens.
