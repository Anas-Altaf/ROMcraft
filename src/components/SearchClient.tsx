"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";

type Item = { href: string; title: string; description: string; excerpt: string; section: string; tags: string[]; status: string; searchText: string };
const label = (s: string) => s === "all" ? "All topics" : s.replaceAll("-", " ");

export default function SearchClient({ items, initialQuery = "" }: { items: Item[]; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [section, setSection] = useState("all");
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    function shortcut(e: KeyboardEvent) {
      if (e.key === "/" && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement) && !(e.target instanceof HTMLElement && e.target.isContentEditable)) {
        e.preventDefault(); input.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === input.current) input.current?.blur();
    }
    document.addEventListener("keydown", shortcut);
    return () => document.removeEventListener("keydown", shortcut);
  }, []);
  const sections = useMemo(() => ["all", ...new Set(items.map(i => i.section))], [items]);
  const results = useMemo(() => {
    const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
    return items.map(i => {
      const title = i.title.toLocaleLowerCase();
      const tags = i.tags.join(" ").toLocaleLowerCase();
      const text = `${title} ${i.description} ${i.excerpt} ${i.searchText} ${tags}`.toLocaleLowerCase();
      const valid = (section === "all" || i.section === section) && terms.every(t => text.includes(t));
      const score = terms.reduce((n, term) => n + (title.includes(term) ? 8 : 0) + (i.description.toLocaleLowerCase().includes(term) ? 3 : 0) + (tags.includes(term) ? 2 : 0), 0);
      const hit = terms.length ? i.searchText.toLocaleLowerCase().indexOf(terms[0]) : -1;
      const searchSnippet = hit >= 0 ? `${hit > 35 ? "…" : ""}${i.searchText.slice(Math.max(0,hit - 35), hit + 135)}…` : i.description || i.excerpt;
      return { ...i, valid, score, searchSnippet };
    }).filter(i => i.valid).sort((a,b) => b.score - a.score || a.title.localeCompare(b.title));
  }, [query, section, items]);
  function setSearch(next: string) {
    setQuery(next);
    const url = new URL(window.location.href);
    if (next.trim()) url.searchParams.set("q", next.trim());
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  }
  return <>
    <form role="search" onSubmit={e=>e.preventDefault()}>
      <label className="sr-only" htmlFor="knowledge-search">Search all fieldnotes</label>
      <div className="search-box-big"><Search size={22} aria-hidden="true"/><input id="knowledge-search" ref={input} value={query} onChange={e=>setSearch(e.target.value)} placeholder="Search commands, errors, devices, ROMs…" autoFocus autoComplete="off"/>{query && <button type="button" onClick={()=>{setSearch("");input.current?.focus();}} aria-label="Clear search"><X size={18}/></button>}</div>
    </form>
    <div className="search-filters" role="group" aria-label="Filter by section">{sections.map(s=><button type="button" key={s} className={s===section?"filter-chip active":"filter-chip"} aria-pressed={s===section} onClick={()=>setSection(s)}>{label(s)}</button>)}</div>
    <p className="result-count" role="status" aria-live="polite">{results.length} {results.length === 1 ? "article" : "articles"} found</p>
    <div className="search-results">{results.map(i=><Link href={i.href} className="search-result" key={i.href}><span className="result-tag">{label(i.section)} · {i.status.replaceAll("-", " ")}</span><h2>{i.title}</h2><p>{query.trim() ? i.searchSnippet : i.description || i.excerpt}</p><ArrowUpRight size={18} aria-hidden="true"/></Link>)}</div>
    {!results.length && <div className="empty-state"><h2>No matching fieldnotes</h2><p>Try a shorter error message, device codename or different category.</p><button type="button" className="button secondary" onClick={()=>{setSearch("");setSection("all")}}>Clear filters</button></div>}
  </>;
}
