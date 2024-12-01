import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <div className="flex flex-col justify-between min-h-screen">
        <Navbar />
        <main className="mt-24">
            {children}
        </main>
        <Footer />
    </div>
}
