import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { FaCheckCircle } from "react-icons/fa"
import seed from "@/utils/seed"
import Link from "next/link"

export default async function Seed() {
    await seed();
    return <div className="flex justify-center items-center min-h-screen">
        <Alert className="max-w-lg mb-6 bg-card text-card-foreground p-6 rounded-lg shadow-lg dark:bg-card dark:text-card-foreground">
            <FaCheckCircle className="h-6 w-6 text-primary" />
            <div className="flex flex-col">
                <AlertTitle className="text-primary">Seeding Complete</AlertTitle>
                <AlertDescription className="text-muted-foreground">
                    The database has been successfully seeded. You can now proceed with your development tasks.
                </AlertDescription>
            </div>
            <Link href="/">
                <div className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow hover:bg-primary-foreground transition-all">
                    Return Home
                </div>
            </Link>
        </Alert>
    </div>
}
