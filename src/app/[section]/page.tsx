import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { getAllDocs, getSection, sections } from "@/lib/content";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {return sections.map(s=>({section:s.id}));}
export async function generateMetadata({params}:{params:Promise<{section:string}>}):Promise<Metadata>{const {section}=await params;const s=getSection(section);return pageMetadata(s?.label??"Not found",s?.description??"Knowledge collection",`/${section}`);}

export default async function SectionPage({params}:{params:Promise<{section:string}>}){
  const {section}=await params;
  const s=getSection(section);if(!s) notFound();
  const docs=getAllDocs().filter(d=>d.section===section);
  return <main id="main-content" className="content-wrap listing-page"><div className="breadcrumb"><Link href="/">Home</Link><ChevronRight size={15}/><span>{s.label}</span></div><div className="listing-heading"><p className="kicker">KNOWLEDGE COLLECTION</p><h1>{s.label}</h1><p>{s.description}</p><span className="listing-count">{docs.length} fieldnotes</span></div><div className="listing-grid">{docs.map(d=><Link href={d.href} className="listing-card" key={d.href}><span className="result-tag">{d.status} · {d.updated}</span><h2>{d.title}</h2><p>{d.description}</p><span className="listing-link">Read article <ArrowUpRight size={17}/></span></Link>)}</div></main>;
}
