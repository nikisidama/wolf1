import BlogContent from '@/app/components/BlogContent'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Blog",
    description: "wolf blog",
}

export default function Page() {
    return <div className="flex flex-col items-center w-full">
        <h1 className="text-2xl font-extrabold lg:my-24 md:my-12 sm:my-6 sm:text-4xl md:text-6xl lg:text-9xl">
            Blog
        </h1>
        <section className="w-[95%] h-full">
            <BlogContent />
        </section>
    </div>
}
