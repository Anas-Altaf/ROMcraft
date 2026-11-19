---
title: "SIM calls work but mobile data does not"
description: "Dual-SIM Android debugging without premature modem or APN changes."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["mobile-data", "dual-sim", "telephony"]
---

# SIM calls work but mobile data does not

> **Scope:** Dual-SIM Android debugging without premature modem or APN changes.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## A105F episode

LineageOS 23.2 recognized two Zong SIMs. `gsm.network.type=LTE,LTE`, `gsm.operator.alpha=Zong,Zong`, `gsm.sim.state=LOADED,LOADED`. Calls worked; data initially did not. `settings get global mobile_data` returned `0`. Running `svc data enable` did not change that global key. **A reset resolved the problem.**

## Diagnostic sequence

1. Select a preferred default data SIM explicitly in Network & Internet settings.
2. Confirm active carrier data plan, LTE/auto preferred network mode and Mobile data toggles.
3. Reset or verify carrier APN from official carrier documentation if still needed; APN profiles vary by SIM and region.
4. Toggle airplane mode, restart, or reset network settings if appropriate.
5. Gather `dumpsys isub`, telephony state and radio logs with personally identifying information redacted.
6. Only then investigate carrier/vendor HAL or ROM RIL bug. Do **not** touch EFS or modem partitions as a 'quick fix'.

## Android API caveat

`multi_sim_data_call=null` and `mobile_data=0` may not reflect the effective per-subscription switch on newer Android releases. Prefer UI state and subscription-specific telephony information rather than one global setting.
