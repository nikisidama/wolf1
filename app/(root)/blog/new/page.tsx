import NewBlog from '@/app/components/NewBlogForm'
import { Metadata, NextPage } from 'next'

export const metadata: Metadata = {
    title: "WOLF1 - New Blog",
    description: "new wolf blog",
}

const Page: NextPage = () => {
    return <div className="flex flex-col items-center h-auto">
       <NewBlog/>
    </div>
}

export default Page


