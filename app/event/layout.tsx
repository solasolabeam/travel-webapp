import { Metadata } from "next";

export const metadata: Metadata = {
    title: "행사/일정 추천 | TripMate",
    description: "여행 목적에 맞춰 최적의 행사/일정을 제시하는 서비스입니다.",
    openGraph: {
      title: "TripMate: 나만의 여행 동반자 | TripMate",
      description: "TripMate는 여행지 정보와 추천 여행지를 한 곳에서 제공하는 플랫폼입니다.",
      url: 'https://travel-webapp-eta.vercel.app/event',
    }
  };

export default function Layout({ children }: { children: React.ReactNode }) {
    return <main>{children}</main>
}