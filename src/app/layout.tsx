import "./globals.css";

import type { Metadata } from "next";

import Header from "@/components/header/Header";
import ReactQueryProvier from "@/react-query/ReactQueryProvider";
import { appleSDGothicNeo, pretendard } from "@/utils/fonts";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} ${appleSDGothicNeo.variable}`}>
        <ReactQueryProvier>
          <Header />
          {children}
        </ReactQueryProvier>
      </body>
    </html>
  );
}
