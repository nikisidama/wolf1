import { SessionProvider } from "../context/SessionContext"
import Footer from "../components/Footer"
import Header from "../components/Header"

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <SessionProvider>
        <div className="flex flex-col justify-between min-h-screen">
            <Header />
            <main className="flex flex-1 flex-col items-center mt-20 h-full relative ">
                {children}
            </main>
            <Footer />
        </div>
    </SessionProvider>
}
