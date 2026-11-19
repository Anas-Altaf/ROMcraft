import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ROMcraft Fieldnotes",
    short_name: "ROMcraft",
    description: "Android recovery, firmware and device research.",
    start_url: absoluteUrl("/"),
    display: "standalone",
    background_color: "#f5f7f9",
    theme_color: "#087d79",
    icons: [{ src: absoluteUrl("/favicon.svg"), sizes: "any", type: "image/svg+xml" }],
  };
}
