import React from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#050505] text-champagne antialiased selection:bg-gold selection:text-black">
      {children}
    </div>
  );
}

