import BlogFrom from "@/app/components/BlogForm"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "New Blog",
    description: "new wolf blog"
}

export default function Page() {
    return <div className="flex flex-col items-center h-auto">
       <BlogFrom />
    </div>
}
