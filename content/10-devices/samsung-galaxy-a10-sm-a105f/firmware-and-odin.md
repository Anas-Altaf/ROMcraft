---
title: "A105F stock firmware, Odin and first recovery failure"
description: "Model-specific restore baseline, bootloader binary and failed plain-TWRP attempt."
contentType: "case-study"
status: "field-tested"
updated: "2026-11-18"
tags: ["firmware", "odin", "incident"]
---

# A105F stock firmware, Odin and first recovery failure

> **Scope:** Model-specific restore baseline, bootloader binary and failed plain-TWRP attempt.  
> **Evidence:** field tested. See [Evidence policy](../../00-start-here/evidence-and-accuracy.md).

## Factory recovery baseline

Stock package: `A105FDDS9CWD1`, CSC `PAK`, Samsung Android 11, bootloader binary 9. The original host-held AP package was preserved and subsequently used for Magisk. Full Odin slots available for BL/AP/CP/HOME_CSC restore. Sensitive absolute storage paths are deliberately omitted from the publication.

## First custom recovery failure

Installing TWRP without the later working Magisk-compatible preparation produced:

```text
recovery: Error validating footer
CUSTOM RECOVERY
VBMETA A105FDDS9CWD1
```

The phone entered Download Mode and could not boot recovery normally. Restoring exact original Samsung firmware through Odin brought it back. This failure is a central teaching case: OEM unlocking and image authenticity checks are not sufficient to guarantee acceptance of a given modified recovery.

## Source AP transfer problem

Source AP was not initially transferred intact to the phone for patching; patched output lacked important images. After exact source hash match, a complete patched AP archive was generated containing `boot.img`, `recovery.img`, `vbmeta.img` and compressed system/vendor assets. Magisk root then worked after a recovery factory reset.

## Reproducibility notes

Do not publish full stock firmware or AP. Re-validate current Odin utility, USB driver, model and download source before any new flashing. `HOME_CSC` was used successfully during one stock recovery attempt, but cannot be promised to preserve data in all failure states.
