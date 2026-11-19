---
title: "Signature verification failed during ROM sideload"
description: "Explain host transfer success versus recovery trust rejection and fallback choice."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["signature", "sideload", "recovery"]
---

# Signature verification failed during ROM sideload

> **Scope:** Explain host transfer success versus recovery trust rejection and fallback choice.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Observed failure

Unofficial /e/OS A10 ZIP sent to **LineageOS Recovery** with `adb sideload`; PC printed `Total xfer: 1.00x`, but phone displayed `signature verification failed` and **aborted**, with no continuation prompt.

## What it means

The host sent the package; recovery refused to install it under its signature trust policy. ZIP CRC checking does not override that policy. Do **not** report successful installation from the transfer statistic.

## Resolution observed

Reinstall previously validated TWRP through a model-specific Odin recovery-only TAR and use the traditional `update-binary` installer via TWRP sideload. TWRP displayed **Successful** and /e/OS booted.

## Safety

Using a recovery that accepts an unsigned or differently signed build changes your supply-chain trust assumptions. Verify source, developer, exact variant, script actions, and backup/rollback before proceeding. Do not mechanically bypass signature failures with an unknown ROM.
