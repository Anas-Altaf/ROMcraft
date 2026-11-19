# Complete content index

All Markdown articles are the canonical content source. Individual claims are labeled by evidence status. Links are relative so the archive remains readable independently of Next.js.

## Start Here (4)

- [Evidence and accuracy policy](content/00-start-here/evidence-and-accuracy.md) — field-informed: Distinguish personally verified behavior, quoted artifacts, official guidance, and untested hypotheses.
- [Glossary of Android modding terms](content/00-start-here/glossary.md) — field-informed: Definitions for first-time readers and cross-reference anchors.
- [Knowledge map and learning journeys](content/00-start-here/knowledge-map.md) — field-informed: How to navigate research content by device, difficulty, and task.
- [Safety, ethics, and privacy](content/00-start-here/safety-and-ethics.md) — field-informed: Essential precautions for custom recovery, rooting, ROM installation and publishing research.

## Foundations (5)

- [ADB fundamentals and Windows shell hygiene](content/01-foundations/adb-and-usb-debugging.md) — field-informed: ADB connectivity, authorized device states, safe binary transfers and PowerShell pitfalls.
- [Android boot chain and partition architecture](content/01-foundations/android-boot-and-partitions.md) — field-informed: Understand boot, recovery, kernel, dtb/dtbo, modem and partition images.
- [AVB, VBMETA, SELinux and security properties](content/01-foundations/avb-selinux-security.md) — field-informed: Interpret integrity flags and security reports without false assurances.
- [Root and recovery models: Magisk, KernelSU and TWRP](content/01-foundations/root-and-recovery-models.md) — field-informed: How roots work and why Galaxy A10 uses recovery-based Magisk.
- [Samsung Odin, firmware packages and regional variants](content/01-foundations/samsung-odin-and-firmware.md) — field-informed: Practical guide to Odin, firmware slots, Download Mode and Samsung version constraints.

## Field Guides (9)

- [Android diagnostic command reference](content/02-guides/adb-diagnostics.md) — field-informed: A reference of read-only properties, logcat, telephony, storage and battery queries.
- [A layered Android backup and restoration strategy](content/02-guides/backup-and-restore-strategy.md) — field-informed: Preserve boot chain, firmware, EFS and user data with multiple independent restoration paths.
- [Custom ROM installation decision tree](content/02-guides/custom-rom-installation.md) — field-informed: Inspect OTA packages, choose appropriate recovery, plan clean flash and first boot.
- [Identify an Android device before modifying it](content/02-guides/device-discovery.md) — field-informed: Read-only discovery playbook for model, SoC, firmware, ABI, bootloader and partitions.
- [Verify firmware packages and patched AP images](content/02-guides/firmware-verification.md) — field-informed: Checksum, contents and transfer verification before Odin flashing.
- [Audit a ROM ZIP before flashing](content/02-guides/inspect-rom-zip.md) — field-informed: Static inspection of package metadata, scripts, images, hash and developer trust.
- [Rollback and recovery after a failed flash](content/02-guides/rollback-and-unbrick.md) — field-informed: Decision tree for Download Mode, Odin, stock recovery, and safe partition restoration.
- [Preflash safety gates and recovery-first runbook](content/02-guides/safety-gates-and-runbook.md) — field-informed: A reusable decision checklist to stop unsafe flashing before a device becomes unbootable.
- [Installing TWRP safely on Samsung A-only devices](content/02-guides/twrp-installation-principles.md) — field-informed: Recovery preparation and direct-to-recovery boot, with A10-specific lessons.

## Device Labs (14)

- [Samsung Galaxy A10 SM-A105F — field study](content/10-devices/samsung-galaxy-a10-sm-a105f/README.md) — field-tested: End-to-end index for this exact model's 2026 experiments.
- [A105F artifact and checksum manifest](content/10-devices/samsung-galaxy-a10-sm-a105f/artifact-manifest.md) — field-tested: Publishable checksums without exposing firmware binaries, device serials or private partitions.
- [A105F chronological experiment log](content/10-devices/samsung-galaxy-a10-sm-a105f/chronology.md) — field-tested: A high-fidelity timeline from stock Samsung through the final /e/OS installation.
- [Galaxy A10 A105F: exact hardware and firmware dossier](content/10-devices/samsung-galaxy-a10-sm-a105f/device-dossier.md) — field-tested: All model-specific observations needed to understand the experiment.
- [Galaxy A10 SM-A105F: complete 2026 field runbook](content/10-devices/samsung-galaxy-a10-sm-a105f/end-to-end-runbook.md) — field-tested: Reconstructed, evidence-labeled journey from Samsung stock Android through Magisk, TWRP, LineageOS and /e/OS.
- [Migrating from LineageOS Recovery to /e/OS 4.1.1](content/10-devices/samsung-galaxy-a10-sm-a105f/eos-4-install.md) — field-tested: Exact installer audit, signature rejection, TWRP recovery and final installation.
- [Final operating state: /e/OS 4.1.1 (18 Nov 2026)](content/10-devices/samsung-galaxy-a10-sm-a105f/final-state.md) — field-tested: Snapshot of the real working device and remaining unknowns.
- [A105F stock firmware, Odin and first recovery failure](content/10-devices/samsung-galaxy-a10-sm-a105f/firmware-and-odin.md) — field-tested: Model-specific restore baseline, bootloader binary and failed plain-TWRP attempt.
- [Incident ledger and failed paths](content/10-devices/samsung-galaxy-a10-sm-a105f/incident-ledger.md) — field-tested: What broke, the diagnostic evidence, fixes, and the wrong conclusions avoided.
- [LineageOS 23.2 Android 16 on Galaxy A10](content/10-devices/samsung-galaxy-a10-sm-a105f/lineageos-23-install.md) — field-tested: Exact unofficial release metadata, script inspection and observed first boot.
- [A105F Magisk 31.1 on stock Samsung Android 11](content/10-devices/samsung-galaxy-a10-sm-a105f/rooting-magisk-stock.md) — field-tested: Exact root model, verified AP patch outcomes and boot-key behavior.
- [A105F security findings and trust boundaries](content/10-devices/samsung-galaxy-a10-sm-a105f/security-findings.md) — field-tested: Evidence on SELinux, AVB, old kernel configuration, root, crash log and unofficial ROM risk.
- [How TWRP 3.7 and Magisk coexisted on the A105F](content/10-devices/samsung-galaxy-a10-sm-a105f/twrp-and-magisk.md) — field-tested: Detailed, validated Magisk-patched TWRP approach with checksums and Odin package structure.
- [A105F verified partition backup campaign](content/10-devices/samsung-galaxy-a10-sm-a105f/verified-backups.md) — field-tested: Precise sizes, SHA-256 checks and failed backup methods.

## ROM Atlas (6)

- [Alternate Android distributions and non-Android experiments](content/20-roms/alternate-systems.md) — field-informed: Where official support, custom ROMs, GSIs and Linux experiments fit.
- [crDroid on the Galaxy A10](content/20-roms/crdroid.md) — community-report: Candidate assessment: customization versus outdated A10 maintenance.
- [/e/OS Galaxy A10: build status, design, privacy and tests](content/20-roms/eos.md) — field-informed: Technical profile for unofficial /e/OS 4.1.1 and distinctions from official releases.
- [LineageOS on Galaxy A10: unofficial options](content/20-roms/lineageos.md) — field-informed: What was researched, what was tested and why official A10 support matters.
- [Samsung One UI ports and the limits of official upgrades](content/20-roms/oneui-ports.md) — community-report: Research leads for community One UI 5/6/7 A10 ports without implying official Samsung support.
- [Choosing a ROM: UI, speed, security, maintenance](content/20-roms/rom-selection-framework.md) — field-informed: A multi-dimensional decision framework beyond version numbers.

## Recovery Desk (8)

- [Fix unreliable ADB pushes and raw-stream backups](content/30-troubleshooting/adb-and-transfers.md) — field-informed: Diagnose EOF, reconnects, missing files and truncated images.
- [Read logcat crash reports without overdiagnosing](content/30-troubleshooting/app-crashes.md) — field-informed: How to attribute crashes to specific Android packages.
- [Boot loops, VBMETA and recovery footer errors](content/30-troubleshooting/boot-and-vbmeta.md) — field-informed: Handling rejected recovery images and secure rollback.
- [Android recovery troubleshooting index](content/30-troubleshooting/index.md) — field-informed: Symptom-oriented routing to safe read-only diagnosis before destructive repair.
- [Why `su` is missing after a normal reboot](content/30-troubleshooting/root-mode.md) — field-informed: Understand no-boot-ramdisk Samsung Magisk boot modes.
- [Signature verification failed during ROM sideload](content/30-troubleshooting/signature-and-recovery.md) — field-informed: Explain host transfer success versus recovery trust rejection and fallback choice.
- [SIM calls work but mobile data does not](content/30-troubleshooting/telephony-and-data.md) — field-informed: Dual-SIM Android debugging without premature modem or APN changes.
- [TWRP backup fails to create directory](content/30-troubleshooting/twrp-storage-and-encryption.md) — field-informed: Differentiate read-only system selection, encryption, storage and mount failures.

## Trust Notes (5)

- [Publishing Android research without leaking sensitive data](content/40-security/privacy-and-data-retention.md) — field-informed: Redaction, backup encryption and provenance-safe publishing.
- [Trusting an unofficial ROM: complete supply-chain checklist](content/40-security/rom-supply-chain.md) — field-informed: Threat modeling, reproducibility and limits of static ZIP inspection.
- [SELinux, kernel configuration, debug surfaces and root](content/40-security/selinux-kernel-and-root.md) — field-informed: Assess real controls and limitations on a rooted or custom-ROM device.
- [Unofficial ROM trust model: what a ZIP audit can and cannot prove](content/40-security/unofficial-rom-threat-model.md) — field-informed: Security boundaries for community ROMs, provenance, hidden privilege, OTA channels and reproducibility.
- [Verified Boot trust versus Android properties](content/40-security/verified-boot-and-lock-state.md) — field-informed: Understand lock-state ambiguity on unofficial firmware.

## Build Journal (3)

- [Building AOSP/LineageOS: feasibility and limitations](content/50-lab/building-from-source.md) — planned: Why official upstream code cannot make an unsupported A10 build official.
- [Kernel configuration capture and baseline analysis](content/50-lab/kernel-introspection.md) — field-informed: How /proc/config.gz and sysctls informed A105F security research.
- [Research tooling: ADB, tcpdump, Frida and APK inspection](content/50-lab/network-and-runtime-tools.md) — field-informed: Practical capabilities, concrete A105F findings and failure boundaries.

## Site Blueprint (13)

- [Website blueprint overview](content/90-site-blueprint/README.md) — planned: Product goal, quality bar, principles and phased handoff to Next.js.
- [Accessibility, performance and quality acceptance criteria](content/90-site-blueprint/accessibility-performance.md) — planned: WCAG-aligned UX and reliable performance on low-end research devices.
- [Next.js implementation architecture](content/90-site-blueprint/architecture.md) — planned: Official scaffolding path and design for a content-first App Router knowledge hub.
- [Brand: ROMcraft Fieldnotes](content/90-site-blueprint/brand-and-positioning.md) — planned: Naming, tagline, visual personality and content positioning.
- [Documentation content model and frontmatter schema](content/90-site-blueprint/content-model.md) — planned: The editorial contract for Markdown/MDX, provenance, versions and search.
- [Modern visual and responsive design system](content/90-site-blueprint/design-system.md) — planned: Typography, tokens, color, spacing, content blocks and mobile behavior.
- [Editorial governance and maintenance](content/90-site-blueprint/editorial-operations.md) — planned: How to keep pages current, reproducible and safe to publish.
- [Article page layout specification](content/90-site-blueprint/example-page-wireframe.md) — planned: A textual wireframe for desktop and mobile pages.
- [From Markdown archive to production knowledge hub](content/90-site-blueprint/implementation-roadmap.md) — planned: Sequential build phases, milestones, dependencies and acceptance criteria.
- [Navigation, routes and reader journeys](content/90-site-blueprint/information-architecture.md) — planned: How the website should organize hundreds of future articles.
- [Website release and GitHub handoff checklist](content/90-site-blueprint/release-handoff.md) — planned: How to install, validate, publish and maintain the documentation site with no secrets in Git.
- [Search, SEO, reference discovery and cross-linking](content/90-site-blueprint/search-seo-and-discovery.md) — planned: Make deeply technical documentation fast to find and easy to verify.
- [Authoritative references and research leads](content/90-site-blueprint/source-registry.md) — official-doc: Link registry with authority levels and why each source matters.

