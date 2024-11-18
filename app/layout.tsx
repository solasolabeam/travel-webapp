import type { Metadata } from "next";
import "./globals.scss";
import "./mobile.scss";
import "./tablet.scss";
import Footer from "./_component/Footer";
import { Providers } from "./providers";
import Script from "next/script";
import Header from "./_component/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import AuthProvider from "./authprovider";
import Banner from "./_component/Banner";
import QueryProvider from "./QueryProvider";

export const metadata: Metadata = {
  title: "TripMate: 나만의 여행 동반자 | TripMate",
  description: "TripMate는 여행지 정보와 추천 여행지를 한 곳에서 제공하는 플랫폼입니다.",
  openGraph: {
    title: "TripMate: 나만의 여행 동반자 | TripMate",
    description: "TripMate는 여행지 정보와 추천 여행지를 한 곳에서 제공하는 플랫폼입니다.",
    url: 'https://travel-webapp-eta.vercel.app',
  },
  verification: {
    google: 'KvU3qBv3ITMNr0j6HjSXtnuQ8GUIU0narVvjfSU0ZH0',
  },
  keywords: "여행, 여행지 추천, 관광지 추천, 이벤트 추천, 문화 추천, 호텔 추천, 주변 관광지 추천, TripMate, 여행 웹사이트",
  robots: {
    index: true,
    follow: true
  }
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)
  console.log('session', session)
  const API = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_KAKAORESTKEY}&libraries=services,clusterer&autoload=false`
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <QueryProvider>
            <Providers>
              <Script
                src={API} // 발급받은 카카오 API 키로 변경
                strategy="beforeInteractive"
              />
              <Header />
              <Banner />
              {children}
              <Footer />
            </Providers>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
