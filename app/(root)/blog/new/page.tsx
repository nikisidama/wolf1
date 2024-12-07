import BlogFrom from "@/app/components/BlogForm"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"
import Link from "next/link"
import { MdArrowBack } from "react-icons/md"

export const metadata: Metadata = {
    title: "New Blog",
    description: "new wolf blog"
}

export default function Page() {
    return <div className="flex flex-col items-center h-auto">
        <BlogFrom />
        <div className="absolute top-4 left-0 right-0 flex justify-between gap-4 p-4">
            <Link href="/blog" className="flex justify-center items-center group">
                <Button variant="link" className="px-6 py-2 text-lg flex items-center gap-2">
                    <MdArrowBack className="h-5 w-5 group-hover:text-accent transition-colors" /> Back
                </Button>
            </Link>
        </div>
    </div>
}
