import type { Metadata, Viewport } from "next";
import SiteHeader from "@/components/SiteHeader";
import Link from "next/link";
import { siteDescription, siteName, siteOrigin } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: { default: `${siteName} — Android Research Hub`, template: `%s | ${siteName}` },
  description: siteDescription,
  applicationName: siteName,
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
  openGraph: {
    type: "website", locale: "en_US", siteName, url: siteOrigin,
    title: siteName, description: siteDescription,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "ROMcraft Fieldnotes" }],
  },
  twitter: { card: "summary_large_image", title: siteName, description: siteDescription, images: ["/opengraph-image"] },
  robots: { index: siteOrigin.startsWith("https://") && !siteOrigin.includes(".example"), follow: true },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: [
  { media: "(prefers-color-scheme: light)", color: "#f5f7f9" },
  { media: "(prefers-color-scheme: dark)", color: "#0d171b" },
] };

// Applied before hydration to prevent visible incorrect-theme flash.
const initTheme = `(function(){try{var t=localStorage.getItem('romcraft-theme');if(t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.dataset.theme='dark'}else{document.documentElement.dataset.theme='light'}}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{ __html: initTheme }} /></head>
    <body>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <SiteHeader />
      {children}
      <footer className="footer"><div className="footer-inner"><div><strong>ROMcraft Fieldnotes</strong><p>Research-first Android field guides. Never flash without a device-specific rollback plan.</p><p className="footer-footnote">Independent community documentation; not affiliated with Samsung, LineageOS, Team Win, or /e/OS.</p></div><nav aria-label="Footer navigation"><Link href="/start/evidence-and-accuracy">Evidence policy</Link><Link href="/start/safety-and-ethics">Safety</Link><Link href="/blueprint/architecture">About this site</Link><Link href="/feed.xml">RSS</Link></nav></div></footer>
    </body>
  </html>;
}
