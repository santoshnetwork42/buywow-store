import { GOKWIK_SCRIPT } from "@/config";
import "@/styles/index.css";
import "@/styles/tailwind.css";

import { Outfit } from "next/font/google";
import Script from "next/script";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata = {
  title: {
    default: "Buy Wow",
    template: "%s | Buy Wow",
  },
  metadataBase: new URL("https://buywow.in"),
};

async function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        {!!GOKWIK_SCRIPT && (
          <Script strategy="lazyOnload" defer src={GOKWIK_SCRIPT} />
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
export default RootLayout;
