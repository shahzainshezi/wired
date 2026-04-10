import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mspwired.com"),
  title: "MSPWired | MSP Sales Automation & Revenue Forecasting",
  description: "Stop guessing and start selling. MSPWired is the only complete sales automation and forecasting system purpose-built for Managed Service Providers (MSPs).",
  keywords: ["MSP sales automation", "revenue forecasting for MSPs", "MSP CRM", "sales pipeline visibility", "MSPWired", "managed services sales process", "sales follow-up automation"],
  authors: [{ name: "MSPWired Team" }],
  creator: "MSPWired",
  publisher: "MSPWired",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mspwired.com",
    siteName: "MSPWired",
    title: "MSPWired | MSP Sales Automation & Revenue Forecasting",
    description: "Build a Sales Engine That Just Works Even When You're Busy. MSPWired gives MSPs one system that keeps everything moving.",
    images: [
      {
        url: "/opengraph.jpg",
        width: 1200,
        height: 630,
        alt: "MSPWired - MSP Sales Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MSPWired | MSP Sales Automation & Revenue Forecasting",
    description: "Stop guessing and start selling. Your MSP sales process, automated.",
    images: ["/opengraph.jpg"],
    creator: "@mspwired",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logowired-D9tohZN6.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="icon" href="/logowired-D9tohZN6.png" type="image/png" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
