import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export const sections = [
  { id: "start", folder: "00-start-here", label: "Start Here", short: "Orientation", description: "Safety, evidence and a map of the research." },
  { id: "foundations", folder: "01-foundations", label: "Foundations", short: "Understand", description: "Android boot, firmware, root and recovery fundamentals." },
  { id: "guides", folder: "02-guides", label: "Field Guides", short: "Learn", description: "Reproducible, recovery-aware procedures." },
  { id: "devices", folder: "10-devices", label: "Device Labs", short: "Investigate", description: "Detailed hardware-specific field investigations." },
  { id: "roms", folder: "20-roms", label: "ROM Atlas", short: "Compare", description: "Source-backed ROM research and alternatives." },
  { id: "troubleshooting", folder: "30-troubleshooting", label: "Recovery Desk", short: "Fix", description: "Failed flashes, storage, data and ADB errors." },
  { id: "security", folder: "40-security", label: "Trust Notes", short: "Verify", description: "Security checks, supply-chain risk and threat models." },
  { id: "lab", folder: "50-lab", label: "Build Journal", short: "Explore", description: "Kernel introspection, runtime tools and source builds." },
  { id: "blueprint", folder: "90-site-blueprint", label: "Site Blueprint", short: "Behind the scenes", description: "Design and editorial architecture of this hub." },
] as const;

export type SectionId = (typeof sections)[number]["id"];
export type Doc = {
  title: string;
  description: string;
  contentType: string;
  status: string;
  updated: string;
  tags: string[];
  body: string;
  section: SectionId;
  relativeFile: string;
  slug: string[];
  href: string;
  excerpt: string;
  headings: { depth: number; text: string; id: string }[];
};

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : entry.isFile() && entry.name.endsWith(".md") ? [full] : [];
  });
}

function slugger(value: string): string {
  return value.toLowerCase().replace(/<[^>]*>/g, "").replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s+/g, "-");
}

function getHeadings(markdown: string): Doc["headings"] {
  const seen = new Map<string, number>();
  const result: Doc["headings"] = [];
  for (const match of markdown.matchAll(/^#{2,3}\s+(.+)$/gm)) {
    const text = match[1].trim();
    const base = slugger(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    result.push({ depth: match[0].startsWith("###") ? 3 : 2, text, id: count ? `${base}-${count}` : base });
  }
  return result;
}

let cachedDocs: Doc[] | null = null;
export function getAllDocs(): Doc[] {
  if (cachedDocs) return cachedDocs;
  const docs: Doc[] = [];
  for (const section of sections) {
    for (const file of walk(path.join(CONTENT_ROOT, section.folder))) {
      const relativeFile = path.relative(CONTENT_ROOT, file).split(path.sep).join("/");
      const relativeInSection = path.relative(path.join(CONTENT_ROOT, section.folder), file).split(path.sep).join("/");
      const slug = relativeInSection.replace(/\.md$/, "").split("/");
      const content = fs.readFileSync(file, "utf8");
      const parsed = matter(content);
      const meta = parsed.data;
      const body = parsed.content;
      const excerpt = body.replace(/```[\s\S]*?```/g, "").replace(/[#*|>`]/g, " ").replace(/\s+/g, " ").trim().slice(0, 260);
      docs.push({
        title: typeof meta.title === "string" ? meta.title : slug.join(" "),
        description: typeof meta.description === "string" ? meta.description : "",
        contentType: typeof meta.contentType === "string" ? meta.contentType : "guide",
        status: typeof meta.status === "string" ? meta.status : "unverified",
        updated: meta.updated instanceof Date ? meta.updated.toISOString().slice(0, 10) : String(meta.updated ?? ""),
        tags: Array.isArray(meta.tags) ? meta.tags.map(String) : [],
        body,
        section: section.id,
        relativeFile,
        slug,
        href: `/${section.id}/${slug.map(encodeURIComponent).join("/")}`,
        excerpt,
        headings: getHeadings(body),
      });
    }
  }
  cachedDocs = docs;
  return docs;
}

export function getDoc(section: string, slug: string[]): Doc | undefined {
  return getAllDocs().find((d) => d.section === section && d.slug.join("/") === slug.join("/"));
}

export function getSection(id: string) { return sections.find((s) => s.id === id); }

export function resolveDocHref(currentRelativeFile: string, rawHref: string): string {
  if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("mailto:") || /^https?:\/\//.test(rawHref)) return rawHref;
  const [rawPath, fragment] = rawHref.split("#", 2);
  if (!rawPath?.endsWith(".md")) return rawHref;
  const target = path.posix.normalize(path.posix.join(path.posix.dirname(currentRelativeFile), rawPath));
  const targetDoc = getAllDocs().find((doc) => doc.relativeFile === target);
  return targetDoc ? targetDoc.href + (fragment ? `#${fragment}` : "") : rawHref;
}
