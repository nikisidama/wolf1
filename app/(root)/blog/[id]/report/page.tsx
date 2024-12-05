import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Report Blog",
  description: "report wolf blog"
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  return <div>{(await params).id}</div>
}