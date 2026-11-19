"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyCode({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch { setCopied(false); }
  }
  return <button type="button" className="code-copy" onClick={copy} title="Copy code" aria-label={copied ? "Code copied" : "Copy code block"}>
    {copied ? <Check size={15} aria-hidden="true"/> : <Copy size={15} aria-hidden="true"/>}
    <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
  </button>;
}
