---
title: "/e/OS Galaxy A10: build status, design, privacy and tests"
description: "Technical profile for unofficial /e/OS 4.1.1 and distinctions from official releases."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["eos", "privacy", "android14"]
---

# /e/OS Galaxy A10: build status, design, privacy and tests

> **Scope:** Technical profile for unofficial /e/OS 4.1.1 and distinctions from official releases.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Identity

/e/OS is a privacy-oriented Android distribution with Bliss Launcher and a suite of `foundation.e.*` apps. This A105F used **unofficial** `4.1.1-a14-20260731-UNOFFICIAL-a10`, Android 14. Presence of App Lounge, Advanced Privacy and Bliss Launcher confirmed the package family.

## Official versus unofficial

The /e/OS project distinguishes officially supported builds, community builds and unofficial outputs. An `UNOFFICIAL` ZIP does **not** imply it receives automatic official OTA/security guarantees. See [/e/OS release types](https://doc.e.foundation/build-status/) and [device selector](https://doc.e.foundation/devices/).

## Installation observed

SourceForge ZIP CRC passed; installer inspected for A10 assertions, partition destinations and Eureka shell script. LineageOS Recovery rejected its signing key with no continuation prompt. TWRP 3.7.0 sideload successfully installed it; booted Android 14.

## Hardware test outcomes

SIM calls, mobile data, Wi-Fi, Bluetooth, camera, GPS, speaker and microphone all passed. `getenforce=Enforcing`, `su` unavailable. One App Lounge Java NPE appeared in logcat; an isolated application crash does not establish overall OS failure.

## Trust considerations

The system's claimed July 2026 patch is not proof that vendor firmware is equally up to date. `ro.boot.verifiedbootstate=green` was not accepted as verified trust status on this unlocked custom ROM. Root left disabled.
