import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
  const protocol = h.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const image = `${protocol}://${host}/og.png`;
  return {
    title: "Bravo MÃ©moire â€” FranÃ§ais A1 & A2",
    description: "Retrouvez votre franÃ§ais chaque jour avec la rÃ©pÃ©tition espacÃ©e et la pratique de prononciation.",
    manifest: "/manifest.webmanifest",
    openGraph: { title: "Bravo MÃ©moire", description: "Retrouvez votre franÃ§ais, chaque jour.", images: [image] },
    twitter: { card: "summary_large_image", title: "Bravo MÃ©moire", description: "Retrouvez votre franÃ§ais, chaque jour.", images: [image] },
  };
}
export const viewport: Viewport = { themeColor: "#132842", width: "device-width", initialScale: 1 };

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="fr"><body>{children}</body></html>;
}

