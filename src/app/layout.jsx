import {
  MEDIA_BASE_URL,
  WORDPRESS_MEDIA_URL,
  GOOGLE_VERIFICATION_TAG,
  STORE_ENV,
  GOKWIK_MID,
} from "@/config";
import "@/styles/index.css";
import "@/styles/tailwind.css";

import { Outfit } from "next/font/google";

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
  const environment = STORE_ENV === "production" ? "production" : "sandbox";
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.merchantInfo = {
              environment: '${environment}',
              mid: '${GOKWIK_MID}',
              type: "merchantInfo"
            };
          `,
          }}
        />
        {!!GOOGLE_VERIFICATION_TAG && (
          <meta
            name="google-site-verification"
            content={GOOGLE_VERIFICATION_TAG}
          />
        )}

        <link rel="preconnect" href={`https://${MEDIA_BASE_URL}`} />
        <link rel="preconnect" href={`https://${WORDPRESS_MEDIA_URL}`} />
      </head>
      <body>{children}</body>
    </html>
  );
}
export default RootLayout;
