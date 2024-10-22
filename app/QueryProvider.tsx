'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    const queyClient = new QueryClient()
    return <QueryClientProvider client={queyClient}>{children}</QueryClientProvider>
}