"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const EVENT_NAME = "romcraft-theme-change";
function subscribe(callback: () => void) {
  window.addEventListener(EVENT_NAME, callback);
  return () => window.removeEventListener(EVENT_NAME, callback);
}
function themeSnapshot() { return document.documentElement.dataset.theme === "dark"; }

export default function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, themeSnapshot, () => false);
  function toggle() {
    const next = !dark;
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try { window.localStorage.setItem("romcraft-theme", next ? "dark" : "light"); } catch { /* Private mode */ }
    window.dispatchEvent(new Event(EVENT_NAME));
  }
  return <button type="button" className="icon-button" onClick={toggle} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} aria-pressed={dark} title="Toggle light/dark theme">
    {dark ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
  </button>;
}
