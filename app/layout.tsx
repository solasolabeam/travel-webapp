import type { Metadata } from "next";
import "./globals.scss";
import Footer from "./_component/Footer";
import { Providers } from "./providers";
import Script from "next/script";
import Header from "./_component/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import AuthProvider from "./authprovider";
import Banner from "./_component/Banner";

export const metadata: Metadata = {
  title: "TripMate",
  description: "여행 동반자",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)
  console.log('session', session)
  const API = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_KAKAORESTKEY}&libraries=services,clusterer&autoload=false`
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Providers>
            <Script
              src={API} // 발급받은 카카오 API 키로 변경
              strategy="beforeInteractive"
            />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <link rel="icon" href="/img/sopung.png" type="image/png" />
            <Header />
            <Banner />
            {children}
            <Footer />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
