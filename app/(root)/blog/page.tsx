import BlogContent from '@/app/components/BlogContent'
import BlogHightlight from '@/app/components/BlogHightlight'
import { Metadata, NextPage } from 'next'

export const metadata: Metadata = {
    title: "WOLF1 - Blog",
    description: "wolf blog",
}

interface Props { }

const Page: NextPage<Props> = ({ }) => {
    return <div className="flex flex-col items-center w-full">
        <h1 className="text-2xl font-extrabold lg:my-24 md:my-12 sm:my-6 sm:text-4xl md:text-6xl lg:text-9xl">
            Blog
        </h1>
        <section className="w-[95%] h-full">
            <BlogContent />
        </section>
    </div>
}

export default Page