import BlogFrom from "@/app/components/BlogForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Edit Blog",
  description: "edit wolf blog"
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  return <div className="flex flex-col items-center h-auto">
    <BlogFrom id={parseInt((await params).id)} />
  </div>
}
