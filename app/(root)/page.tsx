import Image from "next/image";
import BlogHightlight from "../components/BlogHightlight";

export const metadata = {
  title: "WOLF1",
  description: "wolfz"
}

export default function Home() {
  return <main className="flex flex-col items-center justify-items-center w-screen min-h-screen font-[family-name:var(--font-geist-sans)]">
    <section className="w-full h-[50rem]">
      <BlogHightlight />
    </section>
    <Image
      className="dark:invert"
      src="/wolfz_alpha.svg"
      alt="wolfz logo"
      width={180}
      height={180}
      priority
    />
    <div className="text-2xl font-bold">W o l f
      <span className="text-4xl font-[family-name:none] text-accent"> I</span>
    </div>
  </main>
}
