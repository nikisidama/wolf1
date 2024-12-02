import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { SessionProvider } from "../context/SessionContext"

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <SessionProvider>
        <div className="flex flex-col justify-between min-h-screen">
            <Header />
            <main className="mt-24">
                {children}
            </main>
            <Footer />
        </div>
    </SessionProvider>
}
