import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SearchClient from "@/components/SearchClient";
import { getAllDocs } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Search the knowledge base", "Find Android recovery guides, device research, errors and ROM profiles.", "/search");
export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const items = getAllDocs().map(({href,title,description,excerpt,section,tags,status,body})=>({href,title,description,excerpt,section,tags,status,searchText:body.replace(/```/g, " ").replace(/[#*|>`]/g, " ").replace(/\s+/g, " ").slice(0, 20000)}));
  return <main id="main-content" className="content-wrap search-page"><div className="breadcrumb"><Link href="/">Home</Link><ChevronRight size={15} aria-hidden="true"/><span>Search</span></div><div className="listing-heading"><p className="kicker">KNOWLEDGE DISCOVERY</p><h1>Find a fieldnote.</h1><p>Search the research archive by command, ROM, device, symptom or topic. Press <kbd>/</kbd> to focus search.</p></div><SearchClient items={items} initialQuery={typeof q === "string" ? q.slice(0, 200) : ""}/></main>;
}
