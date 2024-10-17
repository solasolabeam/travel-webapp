import type { Metadata } from "next";
import "./globals.scss";
import Footer from "./_component/Footer";
import { Providers } from "./providers";
import Script from "next/script";
import Header from "./_component/Header";

export const metadata: Metadata = {
  title: "TripMate",
  description: "여행 동반자",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const API = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_KAKAORESTKEY}&libraries=services,clusterer&autoload=false`
  return (
    <html lang="en">
      <body>
        <Providers>
          <Script
            src={API} // 발급받은 카카오 API 키로 변경
            strategy="beforeInteractive"
          />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
          <link rel="icon" href="/img/sopung.png" type="image/png" />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
