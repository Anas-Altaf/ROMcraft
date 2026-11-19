import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight, Clock3, ShieldCheck, ListTree } from "lucide-react";
import MarkdownArticle from "@/components/MarkdownArticle";
import { getAllDocs, getDoc, getSection } from "@/lib/content";
import { absoluteUrl, pageMetadata, siteName, structuredDataJson } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return getAllDocs().map(d => ({ section: d.section, slug: d.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ section: string; slug: string[] }> }): Promise<Metadata> {
  const p = await params;
  const d = getDoc(p.section, p.slug);
  return d ? pageMetadata(d.title, d.description, d.href) : { title: "Not found" };
}

export default async function ArticlePage({ params }: { params: Promise<{ section: string; slug: string[] }> }) {
  const p = await params;
  const doc = getDoc(p.section, p.slug);
  if (!doc) notFound();
  const section = getSection(doc.section)!;
  const inSection = getAllDocs().filter(d => d.section === doc.section).sort((a,b) => a.title.localeCompare(b.title));
  const index = inSection.findIndex(d=>d.href===doc.href);
  const previous = inSection[index-1];
  const next = inSection[index+1];
  const related = [...getAllDocs()].filter(d=>d.href!==doc.href).map(d=>({doc:d,score:d.tags.filter(tag=>doc.tags.includes(tag)).length+(d.section===doc.section?1:0)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,4).map(x=>x.doc);
  const parentDoc = doc.slug.length>1 ? getAllDocs().find(d=>d.section===doc.section&&d.slug[0]===doc.slug[0]&&d.slug.at(-1)==="README") : undefined;
  const breadcrumb = [
    { name:"Home", item:absoluteUrl("/") },
    { name:section.label, item:absoluteUrl(`/${section.id}`) },
    ...(parentDoc ? [{ name:parentDoc.title, item:absoluteUrl(parentDoc.href) }] : []),
    { name:doc.title, item:absoluteUrl(doc.href) },
  ];
  const articleSchema = {
    "@context":"https://schema.org", "@type":"TechArticle", headline:doc.title,
    description:doc.description, dateModified:doc.updated, inLanguage:"en",
    mainEntityOfPage:absoluteUrl(doc.href), publisher:{"@type":"Organization",name:siteName,url:absoluteUrl("/")},
    about:doc.tags, isAccessibleForFree:true,
  };
  const breadcrumbSchema = { "@context":"https://schema.org", "@type":"BreadcrumbList", itemListElement:breadcrumb.map((crumb,i)=>({"@type":"ListItem",position:i+1,name:crumb.name,item:crumb.item})) };
  return <main id="main-content" className="content-wrap article-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:structuredDataJson(articleSchema)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:structuredDataJson(breadcrumbSchema)}}/>
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><ChevronRight size={15} aria-hidden="true"/><Link href={`/${section.id}`}>{section.label}</Link>{parentDoc && <><ChevronRight size={15} aria-hidden="true"/><Link href={parentDoc.href}>Galaxy A10 lab</Link></>}<ChevronRight size={15} aria-hidden="true"/><span aria-current="page">{doc.title}</span></nav>
    <div className="article-grid">
      <aside className="article-sidebar"><div className="sidebar-inner"><Link className="sidebar-back" href={`/${section.id}`}><ArrowLeft size={16}/> All {section.label}</Link><p className="sidebar-label">IN THIS COLLECTION</p><nav aria-label="More from this section">{inSection.map(d=><Link className={d.href===doc.href?"sidebar-link current":"sidebar-link"} aria-current={d.href===doc.href?"page":undefined} key={d.href} href={d.href}>{d.title}</Link>)}</nav></div></aside>
      <article className="article-main">
        <div className="article-topline"><span className="article-status"><ShieldCheck size={15} aria-hidden="true"/>{doc.status.replaceAll("-"," ")}</span><span><Clock3 size={15} aria-hidden="true"/>Reviewed {doc.updated}</span></div>
        <h1>{doc.title}</h1><p className="article-deck">{doc.description}</p>
        <div className="article-tags" aria-label="Article tags">{doc.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
        <div className="article-evidence"><ShieldCheck size={19} aria-hidden="true"/><p><strong>Scope and evidence matter.</strong> Evidence label: <b>{doc.status.replaceAll("-"," ")}</b>. Confirm your exact device, build, and recovery path before following any flash steps. <Link href="/start/evidence-and-accuracy">How to interpret evidence</Link>.</p></div>
        <details className="article-mobile-contents"><summary><ListTree size={17} aria-hidden="true"/> Article navigation</summary><nav aria-label="Article headings">{doc.headings.map(h=><a href={`#${h.id}`} key={h.id}>{h.text}</a>)}</nav></details>
        <MarkdownArticle body={doc.body} sourceFile={doc.relativeFile}/>
        <div className="article-end"><BookOpen size={21} aria-hidden="true"/><div><strong>Continue researching</strong><p>Documentation is model- and version-specific. Check links and security claims against maintainer sources before making changes.</p></div></div>
        <nav className="article-pagination" aria-label="Previous and next fieldnote">
          {previous ? <Link href={previous.href}><ChevronLeft size={17} aria-hidden="true"/><span><small>Previous fieldnote</small><strong>{previous.title}</strong></span></Link> : <span/>}
          {next && <Link href={next.href}><span><small>Next fieldnote</small><strong>{next.title}</strong></span><ChevronRight size={17} aria-hidden="true"/></Link>}
        </nav>
        {related.length>0&&<div className="related"><h2>Related fieldnotes</h2>{related.map(d=><Link key={d.href} href={d.href}>{d.title}<ChevronRight size={17} aria-hidden="true"/></Link>)}</div>}
      </article>
      <aside className="toc"><div className="toc-inner"><p className="toc-label">ON THIS PAGE</p><nav aria-label="On this page">{doc.headings.length?doc.headings.map((h,i)=><a key={`${h.id}-${i}`} href={`#${h.id}`} className={h.depth===3?"toc-link nested":"toc-link"}>{h.text}</a>):<span className="toc-empty">Short fieldnote</span>}</nav><Link href="/start/safety-and-ethics" className="toc-safety"><ShieldCheck size={17} aria-hidden="true"/> Safety and ethics</Link></div></aside>
    </div>
  </main>;
}
