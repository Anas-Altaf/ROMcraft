"use client";
import { useEffect } from "react";
import Link from "next/link";
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error("ROMcraft page error", error); }, [error]);
  return <main id="main-content" className="content-wrap missing"><p className="kicker">PAGE ERROR</p><h1>We hit a problem.</h1><p>The page could not be displayed. Try again, or return to the knowledge hub.</p><div className="hero-buttons"><button className="button primary" onClick={reset}>Try again</button><Link className="button secondary" href="/">Home</Link></div></main>;
}
