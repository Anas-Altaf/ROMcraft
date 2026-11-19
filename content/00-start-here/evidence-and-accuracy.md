---
title: "Evidence and accuracy policy"
description: "Distinguish personally verified behavior, quoted artifacts, official guidance, and untested hypotheses."
contentType: "guide"
status: "field-informed"
updated: "2026-11-18"
tags: ["methodology", "reproducibility", "security"]
---

# Evidence and accuracy policy

> **Scope:** Distinguish personally verified behavior, quoted artifacts, official guidance, and untested hypotheses.  
> **Evidence:** field informed; cross-check the cited case study and maintainer sources. See [Evidence policy](evidence-and-accuracy.md).

## Evidence labels

| Label | Meaning | Example |
|---|---|---|
| `field-tested` | Observed in actual A105F session | TWRP booted and `ro.twrp.version` returned 3.7.0 |
| `field-informed` | Reference guidance distilled from the A105F experiments and external sources; not independently tested on every device | Device discovery workflow |
| `artifact-inspected` | Derived from script/log/metadata text, not executed outcome | /e/OS updater-script lists `/system` writes |
| `official-doc` | Instructions issued by the project's official maintainers | TWRP's A10 recovery-based Magisk caveat |
| `community-report` | Developer or community claim, independently unverified here | ROM release claims certain features |
| `planned` | Design/procedure not implemented | Next.js site generation |
| `hypothesis` | Possible explanation without enough evidence | Data backup failure caused by encryption |

## Confidence boundaries

- `zipfile.testzip() == None` confirms internal archive CRC consistency, **not** malware-free contents or supply-chain authenticity.
- SHA-256 comparing files copied from a phone to PC proves bit-for-bit equivalence of those files. If compared to a developer-published checksum over a secure channel, it can also support integrity relative to that publication. It **never** proves benign source code.
- `ro.boot.verifiedbootstate=green` from an unofficial unlocked ROM is not independent proof that the bootloader is relocked or the boot chain is secure.
- `getenforce=Enforcing` establishes current SELinux mode, not the strength of every loaded policy rule.
- A ZIP having `update-binary` and `updater-script` suggests traditional recovery installation; it does **not** guarantee that every recovery accepts its signature or API.

## Corrections to preserve from the session

The project records earlier exploratory statements only when corroborated. For example, the TWRP backup error `Operation not permitted` was **consistent with** an encrypted-storage or mount problem, but root-cause decryption failure was not proven. Similarly, the earlier `svc data enable` failing to change `settings get global mobile_data` did not establish a modem fault; mobile data worked after a reset.

Some conversation references were links or claims not independently reproduced in this repository. They are tagged for follow-up rather than silently elevated to facts. Changes to releases and OS support are time-sensitive; pages should show a **last checked** date.

## Publishable evidence standard

1. Preserve the exact model and firmware context without revealing unique identifiers.
2. Attach clear command, expected result, observed result, outcome and date.
3. Track source URL and its authority. Prefer official docs for generic instructions.
4. Describe failures and attempted recovery, not just successful happy paths.
5. Avoid vendor claims that cannot be independently established.
