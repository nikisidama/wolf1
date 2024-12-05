import { Metadata } from "next"
import BlogPage from "@/app/components/BlogPage"

export const metadata: Metadata = {
  title: "Blog",
  description: "wolf blog"
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  return <div className="flex flex-col items-center w-full">
    <BlogPage id={(await params).id} />
  </div>
}
