"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Search, ChevronRight, Terminal } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const items = [
  ["/guides", "Guides"], ["/devices", "Device Labs"], ["/roms", "ROM Atlas"],
  ["/troubleshooting", "Troubleshooting"], ["/security", "Security"],
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        router.push("/search");
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);
  return <header className="header">
    <div className="header-inner">
      <Link href="/" className="wordmark" aria-label="ROMcraft Fieldnotes — home" onClick={() => setOpen(false)}>
        <span className="wordmark-symbol" aria-hidden="true"><Terminal size={21}/></span>
        <span><strong>ROMcraft</strong><small>FIELDNOTES</small></span>
      </Link>
      <nav className="header-nav" aria-label="Primary navigation">
        {items.map(([href, label]) => <Link key={href} href={href} aria-current={pathname.startsWith(href) ? "page" : undefined}>{label}</Link>)}
      </nav>
      <div className="header-actions">
        <Link href="/search" className="search-trigger" aria-label="Search fieldnotes"><Search size={17}/><span>Search</span><kbd>⌘K</kbd></Link>
        <ThemeToggle />
        <button type="button" className="icon-button menu-trigger" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-controls="mobile-site-navigation" aria-expanded={open} onClick={() => setOpen(v => !v)}>{open ? <X size={22}/> : <Menu size={22}/>}</button>
      </div>
    </div>
    {open && <nav id="mobile-site-navigation" className="mobile-nav" aria-label="Mobile navigation">
      {items.map(([href,label])=><Link key={href} href={href} onClick={()=>setOpen(false)} aria-current={pathname.startsWith(href) ? "page" : undefined}>{label}<ChevronRight size={17}/></Link>)}
      <Link href="/search" onClick={()=>setOpen(false)}>Search knowledge base <Search size={17}/></Link>
    </nav>}
  </header>;
}
