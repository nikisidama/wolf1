import { Metadata } from "next"
import BlogPage from "@/app/components/BlogPage"

export const metadata: Metadata = {
  title: "Blog",
  description: "wolf blog",
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  return <BlogPage id={id} />
}