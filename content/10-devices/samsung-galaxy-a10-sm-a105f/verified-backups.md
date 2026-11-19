---
title: "A105F verified partition backup campaign"
description: "Precise sizes, SHA-256 checks and failed backup methods."
contentType: "case-study"
status: "field-tested"
updated: "2026-11-18"
tags: ["backups", "hashes", "efs"]
---

# A105F verified partition backup campaign

> **Scope:** Precise sizes, SHA-256 checks and failed backup methods.  
> **Evidence:** field tested. See [Evidence policy](../../00-start-here/evidence-and-accuracy.md).

## Backup inventory

| Partition | Bytes (observed) | Verification |
|---|---:|---|
| BOOT | Obtained from verified raw backup | SHA-256 matched phone baseline |
| RECOVERY (pre-TWRP Magisk) | 55,574,528 | SHA-256 matched phone baseline |
| VBMETA | Obtained from verified raw backup | SHA-256 matched phone baseline |
| SYSTEM | 3,556,769,792 | Full SHA-256 matched |
| VENDOR | 394,264,576 | Full SHA-256 matched |
| PRODUCT | 419,430,400 | Full SHA-256 matched |
| DTB | 8,388,608 | Full SHA-256 matched |
| DTBO | 8,388,608 | Full SHA-256 matched |
| EFS | 20,971,520 | Full SHA-256 matched |
| SEC_EFS | 20,971,520 | Full SHA-256 matched |
| CPEFS | 8,388,608 | Full SHA-256 matched |

## Full hashes from the recorded session

| File | SHA-256 |
|---|---|
| `A10_SYSTEM.img` | `CF2F85F13904B8FC920E641BF0C4556A96BFBDFFE1A59C85D775ACA4F6AB3D95` |
| `A10_VENDOR.img` | `393B1F05B2E8B73EE21A612D288ECA871F47B4CD174E4F7BDBD03EA97799729F` |
| `A10_PRODUCT.img` | `8B5A5E10F5FE3EF9E58E2AB373D3008E9FB9BBEFAC6E9300C1F896BF2E0D74D2` |
| `A10_DTB.img` | `9FFB2DA7D26732050413033023B56DA1878A546C0173E3DEFE36C4C6252CDC3A` |
| `A10_DTBO.img` | `B754E4311A399D7A31DFDB125C40B52E91979833930DB993E3A70D3115653D1B` |
| `a10-boot.img` | `0095DE8ABEE87D5E03D02A1ABC02B79F8BE12ACA679CBB5D965F24BDD65C043F` |
| `a10-recovery-magisk.img` | `7A4D2ECBC0118E008452D8EC2E1CF37CCFFE957D3DF70B400CAF4BE4372FE61D` |
| `a10-vbmeta.img` | `D58C5E9CD799CD6D6780AE72BFD8BD80E0707E3BF456F8AD8C825E8A6B66490F` |

EFS/SEC_EFS/CPEFS hashes were compared and returned **True** on both host/device but their exact hashes were not supplied to the conversation; do not invent them.

## Failed TWRP-native backup

`Failed to make backup folder.` The working directory `/data/media/0` existed and 21 GB was reported free. `mkdir` as recovery root failed with `Operation not permitted`. **Possible** encryption key or mount behavior; not proven conclusively. `adb backup --twrp boot` yielded a zero-byte output and was rejected as a valid backup.

## Recovery by raw streaming

Using PowerShell 5.1 `cmd.exe /d /c` redirection for `adb exec-out dd` yielded correct raw images. First SYSTEM stream truncated to **211,744,256 bytes** after an ADB disruption and had mismatched SHA-256. Retrying produced **3,556,769,792 bytes** and exact full SHA-256 match. All verification results were based on both size and hash, not file existence alone.

## Privacy

EFS images are not in this repository. Originals must remain encrypted and should not be synchronized to a public cloud or Git repository.
