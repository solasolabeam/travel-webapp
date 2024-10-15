import type { Metadata } from "next";
import "./globals.scss";
import Footer from "./Footer";
import { Providers } from "./providers";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export const API = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAORESTKEY}&libraries=services,clusterer&autoload=false`
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Script
            src={API} // 발급받은 카카오 API 키로 변경
            strategy="beforeInteractive"
          />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
